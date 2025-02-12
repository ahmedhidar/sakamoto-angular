import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
{
path:'',
component: HomeComponent,
title: 'Home'
},
{
path:'register',
component:RegisterComponent,
 title: 'Register'
},
{
path:'login',
component:LoginComponent,
 title: 'Login'
},
{
path:'product-page/:id',
component:ProductPageComponent,
 title: 'Product Page'
},
{
  path:'cart',
  component:CartComponent,
   title: 'cart Page'
  },
{
path:'**',
component:NotFoundComponent,
 title: 'Not Found'
}
];
