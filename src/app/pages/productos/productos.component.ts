import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { ProductoService } from '../../modules/producto/producto.service';
import { CategoriaService } from '../../modules/categoria/categoria.service';
import { Producto } from '../../modules/producto/producto.interface';
import { Categoria } from '../../modules/categoria/categoria.interface';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  
  sidebarAbierto = false;
  modalAbierto          = false;
  editando              = false;
  productos: Producto[]   = [];
  categorias: Categoria[] = [];
  form!: FormGroup;

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

  iniciarForm() 
  {
    this.form = this.fb.group({

      id_producto:     [null],
      nombre_producto: ['', Validators.required],
      precio_producto: [null, [Validators.required, Validators.min(0)]],
      id_categoria:    [null, Validators.required]

    });
  }

  cargarProductos()
  {
    this.productos = this.productoService.getProductos();
  }

  cargarCategorias() 
  {
    this.categorias = this.categoriaService.getCategorias();
  }

  getNombreCategoria(id_categoria: number): string {
    const categoria = this.categorias.find(c => c.id_categoria === id_categoria);
    return categoria ? categoria.nombre_categoria : 'Sin categoría';
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

  eliminar(id_producto: number) {
    
      this.productoService.eliminarProducto(id_producto);
      this.cargarProductos();
    
   
  }
  
  toggleSidebar() 
  {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

}
