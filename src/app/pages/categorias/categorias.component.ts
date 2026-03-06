import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  sidebarAbierto = false;
  toggleSidebar() {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

}