import { Routes } from '@angular/router';
import { InicioComponent } from './layout/inicio/inicio.component';
import { CategoriaComponent } from './modules/categoria/categoria.component';
import { ProductoComponent } from './modules/producto/producto.component';

export const routes: Routes = [
    {
        path:'',
        component:InicioComponent,
        children:[
            {path: 'categorias', component:CategoriaComponent},
            {path: 'productos', component:ProductoComponent},
            {path: '', redirectTo:'categorias', pathMatch:'full'}
        ]
    }
];
