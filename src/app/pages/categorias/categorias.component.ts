import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { CategoriaService } from '../../modules/categoria/categoria.service';
import { Categoria } from '../../modules/categoria/categoria.interface';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})

export class CategoriasComponent {
  sidebarAbierto      = true;
  modalAbierto        = false;
  editando            = false;
  categorias: Categoria[] = [];
  form!: FormGroup;

  constructor
  (
    private fb:               FormBuilder,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() 
  {
    this.cargarCategorias();
    this.iniciarForm();
  }

  iniciarForm() 
  {
    this.form = this.fb.group
    ({
      id_categoria:     [null],
      nombre_categoria: ['', Validators.required]
    });
  }

  cargarCategorias() 
  {
    this.categorias = this.categoriaService.getCategorias();
  }

  abrirModal()
  {
    this.editando = false;
    this.form.reset();
    this.modalAbierto = true;
  }

  cerrarModal() 
  {
    this.modalAbierto = false;
    this.form.reset();
  }

   guardar() 
   {
    if (this.form.invalid) return;
    const categoria: Categoria = 
    {
      id_categoria:     this.editando ? this.form.value.id_categoria : this.categoriaService.generarId(),
      nombre_categoria: this.form.value.nombre_categoria
    };

    if (this.editando) 
      { this.categoriaService.editarCategoria(categoria);}
    else 
      {
        this.categoriaService.guardarCategoria(categoria);
      }

    this.cargarCategorias();
    this.cerrarModal();

    }

    editar(categoria: Categoria) 
    {
      this.editando = true;
      this.form.setValue({
        id_categoria:     categoria.id_categoria,
        nombre_categoria: categoria.nombre_categoria
      });
      
      this.modalAbierto = true;
    }

    eliminar(id_categoria: number) 
    {
      this.categoriaService.eliminarCategoria(id_categoria);
      this.cargarCategorias();
    }

    toggleSidebar() 
    {
      this.sidebarAbierto = !this.sidebarAbierto;
    }

  
}

