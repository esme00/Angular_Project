import { Injectable } from '@angular/core';
import { Producto } from './producto.interface';

@Injectable({
    providedIn: 'root'
})

export class ProductoService {
    private readonly KEY = 'productos';

    getProductos(): Producto[] 
    {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : [];
    }

    guardarProducto(producto: Producto): void 
    {
        const productos = this.getProductos();
        productos.push(producto);
        localStorage.setItem(this.KEY, JSON.stringify(productos));
    }

    eliminarProducto(id_producto: number): void 
    {
        const productos = this.getProductos().filter(p => p.id_producto !== id_producto);
        localStorage.setItem(this.KEY, JSON.stringify(productos));
    }


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

