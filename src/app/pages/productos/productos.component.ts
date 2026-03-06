import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  
  sidebarAbierto = false;

  toggleSidebar() {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

}
