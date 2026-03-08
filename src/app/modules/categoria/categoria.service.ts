import { Injectable } from '@angular/core';
import { Categoria } from './categoria.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    // CLAVE CON LA QUE SE GUARDA EN LOCALSTORAGE
    private readonly KEY = 'categorias';

    // OBTENER TODAS LAS CATEGORÍAS DEL LOCALSTORAGE
    getCategorias(): Categoria[]
    {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : [];
    }

    // AGREGAR UNA NUEVA CATEGORÍA
    guardarCategoria(categoria: Categoria): void 
    {
        const categorias = this.getCategorias();
        categorias.push(categoria);
        localStorage.setItem(this.KEY, JSON.stringify(categorias));
    }

    // ELIMINAR UNA CATEGORÍA POR SU ID
    eliminarCategoria(id: number): void 
    {
        const categorias = this.getCategorias().filter(c => c.id_categoria !== id);
        localStorage.setItem(this.KEY, JSON.stringify(categorias));
    }

    // ACTUALIZAR UNA CATEGORÍA EXISTENTE
    editarCategoria(categoriaEditada: Categoria): void 
    {
        const categorias = this.getCategorias().map(c =>
            c.id_categoria === categoriaEditada.id_categoria? categoriaEditada : c
        );
        localStorage.setItem(this.KEY, JSON.stringify(categorias));
    }

    // GENERAR UN ID ÚNICO PARA UNA NUEVA CATEGORÍA
    generarId(): number 
    {
        const categorias = this.getCategorias();
        return categorias.length > 0 ? Math.max(...categorias.map(c => c.id_categoria)) + 1 : 1;
    }

}