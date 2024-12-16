import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import * as QRCode from 'qrcode';
import { ClasesVisualizacionPage } from './pages/Alumno/clases-visualizacion/clases-visualizacion.page';
import { SupabaseService } from './services/supabase.service';  // Asegúrate de que el servicio esté importado


 // Asegúrate de importar el DbService

@NgModule({
  declarations: [AppComponent], 
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    FormsModule // Agregamos FormsModule también
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,SupabaseService, // Agregamos SQLite a los providers
      // Agregamos DbService a los providers
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}