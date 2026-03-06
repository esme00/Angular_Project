import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'app-inicio',
    standalone: true,
    imports: [CommonModule, RouterModule, SidebarComponent],
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.css'
})
export class InicioComponent {

  sidebarAbierto = true; //sidebar inicia abierto
  
  toggleSidebar() 
  {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

}