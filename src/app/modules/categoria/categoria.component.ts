import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}


@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {

  categorias: Categoria[] = [];

  nuevaCategoria: Categoria = {
    id: 0,
    nombre: '',
    descripcion: ''
  };

  agregarCategoria() {

    this.nuevaCategoria.id = Date.now();

    this.categorias.push({ ...this.nuevaCategoria });

    localStorage.setItem('categorias', JSON.stringify(this.categorias));

    this.nuevaCategoria = {
      id: 0,
      nombre: '',
      descripcion: ''
    };

  }

  cargarCategorias() {

    const data = localStorage.getItem('categorias');

    if (data) {

      this.categorias = JSON.parse(data);

    }

  }

  eliminarCategoria(id: number) {

    this.categorias = this.categorias.filter(c => c.id !== id);

    localStorage.setItem('categorias', JSON.stringify(this.categorias));

  }

  ngOnInit() {

    this.cargarCategorias();

  }

}
