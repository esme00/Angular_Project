import { Routes } from '@angular/router';
import { InicioComponent } from './layout/inicio/inicio.component';
import { CategoriasComponent } from  './pages/categorias/categorias.component';
import { ProductosComponent } from  './pages/productos/productos.component';

export const routes: Routes = [
    { path: '',           component: InicioComponent },
    { path: 'categorias', component: CategoriasComponent },
    { path: 'productos',  component: ProductosComponent },
];