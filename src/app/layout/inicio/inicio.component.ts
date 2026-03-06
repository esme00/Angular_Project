import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './inicio.component.html',
  //styleUrl: './inicio.component.css'
})
export class InicioComponent {


  //Sliderbar desplegable
  sidebarAbierto = true;

  toggleSidebar() {

    this.sidebarAbierto = !this.sidebarAbierto;

  }

}