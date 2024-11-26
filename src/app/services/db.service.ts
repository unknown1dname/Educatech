import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular'; // Importa Platform
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private dbInstance: SQLiteObject | null = null;

  constructor(
    private sqlite: SQLite,  // Asegúrate de que SQLite esté inyectado correctamente
    private platform: Platform // Inyectamos Platform
  ) {
    this.platform.ready().then(() => {
      // Una vez la plataforma está lista, creamos la base de datos
      this.createDatabase();
    });
  }

  // Método para crear la base de datos
  private createDatabase() {
    this.sqlite.create({
      name: 'mydb.db',
      location: 'default' // Puede ser 'default' o 'data'
    }).then((db: SQLiteObject) => {
      this.dbInstance = db;
      console.log('Base de datos creada o abierta correctamente');
      // Llamamos a la función que crea las tablas después de que la base de datos esté lista
      this.createTables();
    }).catch((error) => {
      console.error('Error al crear la base de datos:', error);
    });
  }

  // Método para crear las tablas
  private createTables() {
    if (this.dbInstance) {
      this.dbInstance.executeSql(`
        CREATE TABLE IF NOT EXISTS USUARIO (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          tipo TEXT,
          email TEXT
        );
      `, [])
      .then(() => {
        console.log('Tabla USUARIO creada correctamente');
      })
      .catch((error) => {
        console.error('Error al crear la tabla USUARIO:', error);
      });

      this.dbInstance.executeSql(`
        CREATE TABLE IF NOT EXISTS PROFESOR (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_id INTEGER,
          nombre TEXT,
          apellido TEXT,
          departamento TEXT,
          FOREIGN KEY(usuario_id) REFERENCES USUARIO(id)
        );
      `, [])
      .then(() => {
        console.log('Tabla PROFESOR creada correctamente');
      })
      .catch((error) => {
        console.error('Error al crear la tabla PROFESOR:', error);
      });

      this.dbInstance.executeSql(`
        CREATE TABLE IF NOT EXISTS ESTUDIANTE (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_id INTEGER,
          nombre TEXT,
          apellido TEXT,
          carrera TEXT,
          FOREIGN KEY(usuario_id) REFERENCES USUARIO(id)
        );
      `, [])
      .then(() => {
        console.log('Tabla ESTUDIANTE creada correctamente');
      })
      .catch((error) => {
        console.error('Error al crear la tabla ESTUDIANTE:', error);
      });

      this.dbInstance.executeSql(`
        CREATE TABLE IF NOT EXISTS CURSO (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          profesor_id INTEGER,
          FOREIGN KEY(profesor_id) REFERENCES PROFESOR(id)
        );
      `, [])
      .then(() => {
        console.log('Tabla CURSO creada correctamente');
      })
      .catch((error) => {
        console.error('Error al crear la tabla CURSO:', error);
      });

      this.dbInstance.executeSql(`
        CREATE TABLE IF NOT EXISTS NOTA (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          estudiante_id INTEGER,
          curso_id INTEGER,
          valor REAL,
          fecha DATE,
          FOREIGN KEY(estudiante_id) REFERENCES ESTUDIANTE(id),
          FOREIGN KEY(curso_id) REFERENCES CURSO(id)
        );
      `, [])
      .then(() => {
        console.log('Tabla NOTA creada correctamente');
      })
      .catch((error) => {
        console.error('Error al crear la tabla NOTA:', error);
      });

      this.dbInstance.executeSql(`
        CREATE TABLE IF NOT EXISTS ASISTENCIA (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          estudiante_id INTEGER,
          curso_id INTEGER,
          fecha DATE,
          presente BOOLEAN,
          FOREIGN KEY(estudiante_id) REFERENCES ESTUDIANTE(id),
          FOREIGN KEY(curso_id) REFERENCES CURSO(id)
        );
      `, [])
      .then(() => {
        console.log('Tabla ASISTENCIA creada correctamente');
      })
      .catch((error) => {
        console.error('Error al crear la tabla ASISTENCIA:', error);
      });
    }
  }

  // Registrar un nuevo usuario
  async registrarUsuario(username: string, password: string, tipo: string, email: string): Promise<boolean> {
    if (!this.dbInstance) {
      console.error('La base de datos no está abierta.');
      return false;
    }

    try {
      // Verificar si el usuario ya existe
      const checkUserResult = await this.dbInstance.executeSql(`
        SELECT id FROM USUARIO WHERE username = ?;
      `, [username]);

      // Si el usuario ya existe, retornamos false
      if (checkUserResult.rows.length > 0) {
        console.log('El usuario ya existe.');
        return false;
      }

      // Insertar el usuario en la tabla USUARIO
      const result = await this.dbInstance.executeSql(`
        INSERT INTO USUARIO (username, password, tipo, email) 
        VALUES (?, ?, ?, ?);
      `, [username, password, tipo, email]);

      // Obtenemos el ID del usuario recién insertado
      const usuarioId = result.insertId;

      // Dependiendo del tipo de usuario, lo insertamos en la tabla correspondiente
      if (tipo === 'estudiante') {
        await this.dbInstance.executeSql(`
          INSERT INTO ESTUDIANTE (usuario_id, nombre) 
          VALUES (?, ?);`, [usuarioId, username]); // Aquí puedes agregar más campos si es necesario
      } else if (tipo === 'profesor') {
        await this.dbInstance.executeSql(`
          INSERT INTO PROFESOR (usuario_id, nombre) 
          VALUES (?, ?);`, [usuarioId, username]); // Aquí puedes agregar más campos si es necesario
      }

      return true;  // El registro fue exitoso
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;  // Ocurrió un error en el registro
    }
  }

 // Validar formato de usuario
validarFormatoUsuario(username: string): boolean {
  // Verificamos si el parámetro username no es null o undefined
  if (typeof username !== 'string') return false;
  return username.length >= 4 && /^[a-zA-Z0-9]+$/.test(username);
}

// Validación de formato de contraseña
validarFormatoContrasena(password: string): boolean {
  // Verificamos si el parámetro password no es null o undefined
  if (typeof password !== 'string') return false;
  return password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

  // Obtener un usuario por su nombre de usuario
  async getUsuario(username: string): Promise<any> {
    if (!this.dbInstance) {
      console.error('La base de datos no está abierta.');
      return null;
    }

    try {
      const result = await this.dbInstance.executeSql(`
        SELECT * FROM USUARIO WHERE username = ?;
      `, [username]);

      if (result.rows.length > 0) {
        return result.rows.item(0);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  }
  
  async saveAssistance(estudianteId: number, cursoId: number, presente: boolean): Promise<boolean> {
    if (!this.dbInstance) {
      console.error('La base de datos no está abierta.');
      return false;
    }
  
    try {
      // Insertar la asistencia en la tabla ASISTENCIA
      const result = await this.dbInstance.executeSql(`
        INSERT INTO ASISTENCIA (estudiante_id, curso_id, fecha, presente)
        VALUES (?, ?, DATE('now'), ?);
      `, [estudianteId, cursoId, presente]);
  
      return result.rowsAffected > 0;
    } catch (error) {
      console.error('Error al guardar la asistencia:', error);
      return false;
    }
  }
}
