import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { CategoriaService } from '../../modules/categoria/categoria.service';
import { Categoria } from '../../modules/categoria/categoria.interface';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SidebarComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})

export class CategoriasComponent {
  sidebarAbierto      = true;
  modalAbierto        = false;
  editando            = false;
  modalEliminarAbierto  = false; //MODAL PARA LA VALIDACIÓN DE ELIMINAR
  id_Eliminar:          number | null = null;
  categorias: Categoria[] = [];
  form!: FormGroup;
  filtro = '';

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

  // INICIAR EL FORMULARIO CON SUS CAMPOS Y VALIDACIONES
  iniciarForm() 
  {
    this.form = this.fb.group
    ({
      id_categoria:     [null],
      nombre_categoria: ['', Validators.required]
    });
  }
  // OBTENER TODOS LAS CATEGORÍAS DEL LOCALSTORAGE
  cargarCategorias() 
  {
    this.categorias = this.categoriaService.getCategorias();
  }

  // ABRIR MODAL EN MODO CREAR
  abrirModal()
  {
    this.editando = false;
    this.form.reset();
    this.modalAbierto = true;
  }

  // CERRAR MODAL Y LIMPIAR FORMULARIO
  cerrarModal() 
  {
    this.modalAbierto = false;
    this.form.reset();
  }

  // GUARDAR O EDITAR UNA CATEGORÍA
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

  // ABRIR MODAL EN MODO EDITAR CON LOS DATOS DE LA CATEGORÍA
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
    this.abrirModalEliminar(id_categoria);
  }
  
  // ABRIR MODAL DE CONFIRMACIÓN DE ELIMINACIÓN
  abrirModalEliminar(id_categoria: number)
  {
    this.id_Eliminar = id_categoria;
    this.modalEliminarAbierto = true;
  }

  // CERRAR MODAL DE ELIMINACIÓN
  cerrarModalEliminar()
  {
    this.id_Eliminar = null;
    this.modalEliminarAbierto = false;
  }

  // CONFIRMAR Y EJECUTAR LA ELIMINACIÓN DE LA CATEGORÍA
  confirmarEliminar()
  {
    if(this.id_Eliminar !== null )
    {
      this.categoriaService.eliminarCategoria(this.id_Eliminar);
      this.cargarCategorias();
      this.cerrarModalEliminar();
    }
  }
  
  // FILTRAR CATEGORÍAS POR NOMBRE O ID
    get categoriaFiltradas(): Categoria[]
    {
      if (!this.categorias || this.categorias.length === 0) return [];
      const filtroLower = this.filtro.toLowerCase();
      return this.categorias.filter(
        c => c.nombre_categoria.toLowerCase().includes(filtroLower) ||
        c.id_categoria.toString().includes(filtroLower)
      );
    }

  toggleSidebar() 
  {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

  
}

