import { Injectable } from '@angular/core';
import { Categoria } from './categoria.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    private readonly KEY = 'categorias';

    getCategorias(): Categoria[] {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : [];
    }

    guardarCategoria(categoria: Categoria): void {
        const categorias = this.getCategorias();
        categorias.push(categoria);
        localStorage.setItem(this.KEY, JSON.stringify(categorias));
    }

    eliminarCategoria(id: number): void {
        const categorias = this.getCategorias().filter(c => c.id_categoria !== id);
        localStorage.setItem(this.KEY, JSON.stringify(categorias));
    }

    editarCategoria(categoriaEditada: Categoria): void {
        const categorias = this.getCategorias().map(c =>
            c.id_categoria === categoriaEditada.id_categoria? categoriaEditada : c
        );
        localStorage.setItem(this.KEY, JSON.stringify(categorias));
    }

    generarId(): number {
        const categorias = this.getCategorias();
        return categorias.length > 0 ? Math.max(...categorias.map(c => c.id_categoria)) + 1 : 1;
    }

}