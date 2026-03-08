import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { ProductoService } from '../../modules/producto/producto.service';
import { CategoriaService } from '../../modules/categoria/categoria.service';
import { Producto } from '../../modules/producto/producto.interface';
import { Categoria } from '../../modules/categoria/categoria.interface';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SidebarComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  
  sidebarAbierto = false;
  modalAbierto          = false;
  editando              = false;
  modalEliminarAbierto  = false; //MODAL PARA LA VALIDACIÓN DE ELIMINAR
  id_Eliminar:          number | null = null;
  productos: Producto[]   = [];
  categorias: Categoria[] = [];
  form!: FormGroup;
  filtro = '';

  constructor(
    private fb:               FormBuilder,
    private productoService:  ProductoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() 
  {
    this.cargarProductos();
    this.cargarCategorias();
    this.iniciarForm();
  }

  // INICIAR EL FORMULARIO CON SUS CAMPOS Y VALIDACIONES
  iniciarForm() 
  {
    this.form = this.fb.group({

      id_producto:     [null],
      nombre_producto: ['', Validators.required],
      precio_producto: [null, [Validators.required, Validators.min(0.01)]],
      id_categoria:    [null, Validators.required]

    });
  }

  // OBTENER TODOS LOS PRODUCTOS DEL LOCALSTORAGE
  cargarProductos()
  {
    this.productos = this.productoService.getProductos();
  }

  // OBTENER TODAS LAS CATEGORÍAS DEL LOCALSTORAGE
  cargarCategorias() 
  {
    this.categorias = this.categoriaService.getCategorias();
  }

  // OBTENER EL NOMBRE DE LA CATEGORÍA POR SU ID
  getNombreCategoria(id_categoria: number): string {
    const categoria = this.categorias.find(c => c.id_categoria === id_categoria);
    return this.categorias?.find(c => c.id_categoria === id_categoria)?.nombre_categoria ?? 'Sin categoría';
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

  // GUARDAR O EDITAR UN PRODUCTO S
  guardar() 
  {
    if (this.form.invalid) return;
    const producto: Producto = 
    {
      id_producto:     this.editando ? this.form.value.id_producto : this.productoService.generarId(),
      nombre_producto: this.form.value.nombre_producto,
      precio_producto: this.form.value.precio_producto,
      id_categoria:    this.form.value.id_categoria 
    };
    
    if (this.editando) 
    {
      this.productoService.editarProducto(producto);
    } else {
      this.productoService.guardarProducto(producto);
    }
    
    this.cargarProductos();
    this.cerrarModal();
  }

  // ABRIR MODAL EN MODO EDITAR CON LOS DATOS DEL PRODUCTO
  editar(producto: Producto) 
  {
    this.editando = true;
    this.form.setValue({
      id_producto:     producto.id_producto,
      nombre_producto: producto.nombre_producto,
      precio_producto: producto.precio_producto,
      id_categoria:    producto.id_categoria
    });
    
    this.modalAbierto = true;
  }

  eliminar(id_producto: number) 
  {
    this.abrirModalEliminar(id_producto);
  }

  // ABRIR MODAL DE CONFIRMACIÓN DE ELIMINACIÓN
  abrirModalEliminar(id_producto: number)
  {
    this.id_Eliminar = id_producto;
    this.modalEliminarAbierto = true;
  }

  // CERRAR MODAL DE ELIMINACIÓN
  cerrarModalEliminar()
  {
    this.id_Eliminar = null;
    this.modalEliminarAbierto = false;
  }

  // CONFIRMAR Y EJECUTAR LA ELIMINACIÓN DEL PRODUCTO
  confirmarEliminar()
  {
    if(this.id_Eliminar !== null )
    {
      this.productoService.eliminarProducto(this.id_Eliminar);
      this.cargarProductos();
      this.cerrarModalEliminar();
    }
  }

  //FILTRAR PRODUCTOS
  get productosFiltrados(): Producto[]{
    if (!this.productos || this.productos.length === 0) return [];
    const filtroLower = this.filtro.toLowerCase();
    return this.productos.filter(
      p => p.nombre_producto.toLowerCase().includes(filtroLower) ||
      this.getNombreCategoria(p.id_categoria).toLowerCase().includes(filtroLower)
    );
  }

  toggleSidebar() 
  {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

}
