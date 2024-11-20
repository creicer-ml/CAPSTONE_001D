import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  itemsHome = [
    { icon: 'qr-code-outline', link:'/scanner', titulo: 'Escanear Código de Barras', descripcion: 'Escanea el código de barras para añadir un producto al carrito' },
    { icon: 'card-outline', link:'/', titulo: 'Gestionar Pago', descripcion: 'Gestiona el método de pago a utilizar para tus compras' },
    { icon: 'cube-outline', link:'/', titulo: 'Historial de compras', descripcion: 'Observa tu historial de compras realizadas usando la aplicación' },
    { icon: 'qr-code-outline', link:'/scanner-qr', titulo: 'Escanear QR', descripcion: 'Esta funcion cambiarla luego al rol de administrador.' },

  ];

  localUserData: any; 
  user: any; // Variable para almacenar los datos del usuario
  user_id : any
  isLoading = true; 
  usuario : any = ''

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    await this.obtenerDatos()
  }
  

  async obtenerDatos() {
    this.authService.getCurrentUser().subscribe(async (user: any) => {
      if (user) {
        this.user_id = user.id; // Acceder al ID del usuario
        try {
          this.usuario = await this.authService.getUserDetails(this.user_id); // Esperar a que la promesa se resuelva
          console.log("Usuario obtenido: ", this.usuario);
        } catch (error) {
          console.error("Error al obtener detalles del usuario: ", error);
        }
      } else {
        console.error("No se pudo obtener el usuario");
      }
    });
  }
  
  goToScanner() {
    this.router.navigate(['/scanner']); // Cambia '/scanner' por la ruta de tu página Scanner
  }

}
