const express = require("express");
const oracledb = require("oracledb");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const PORT = 3000;

//CONFIGURACION DE CONEXION:
const dbConfig = {
    user: "C##SKELETONAPP",
    password: "AB123456",
    connectString: "//localhost:1521/xe"
}

app.get("/vehiculo", async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute("SELECT * FROM VEHICULO")
        res.json(result.rows);
    } catch (err) {
        console.error("Error al conectar", err);
        res.status(500).json({ error: "Error al obtener datos"})
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error al cerrar la conexion: ", err)
            }
        }
    }
});

app.post("/vehiculo", async (req, res) => {
    let connection;
    const {ppu, marca, modelo, tipo} = req.body;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `INSERT INTO VEHICULO (PATENTE, MARCA, MODELO, TIPO) VALUES(:PATENTE, :MARCA, :MODELO, :TIPO)`,
            [ppu, marca, modelo, tipo],
            { autoCommit: true}
        );
    } catch (err) {
        console.error("Error al insertar datos en vehiculo:", err);
        res.status(500).json({ error: "Error al insertar datos en vehiculo" });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
            console.error("Error al cerrar la conexión:", err);
            }
        }
    }
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})