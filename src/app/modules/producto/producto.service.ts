import { Injectable } from '@angular/core';
import { Producto } from './producto.interface';

@Injectable({
    providedIn: 'root'
})

export class ProductoService {

    // CLAVE CON LA QUE SE GUARDA EN LOCALSTORAGE
    private readonly KEY = 'productos';

    // OBTENER TODAS LOS PRODUCTOS DEL LOCALSTORAGE
    getProductos(): Producto[] 
    {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : [];
    }

    // AGREGAR UN NUEVO PRODUCTO
    guardarProducto(producto: Producto): void 
    {
        const productos = this.getProductos();
        productos.push(producto);
        localStorage.setItem(this.KEY, JSON.stringify(productos));
    }

    // ELIMINAR UN PRODUCTO POR SU ID
    eliminarProducto(id_producto: number): void 
    {
        const productos = this.getProductos().filter(p => p.id_producto !== id_producto);
        localStorage.setItem(this.KEY, JSON.stringify(productos));
    }

    // ACTUALIZAR UN PRODUCTO EXISTENTE
    editarProducto(productoEditado: Producto): void 
    {
        const productos = this.getProductos().map(p => p.id_producto === productoEditado.id_producto ? productoEditado : p );
        localStorage.setItem(this.KEY, JSON.stringify(productos));
    }

    //GENERAR LOS IDS AUTOMATICAMENTE 
    generarId(): number {
        const productos = this.getProductos();
        return productos.length > 0 ? Math.max(...productos.map(p => p.id_producto)) + 1 : 1;
    }

}

