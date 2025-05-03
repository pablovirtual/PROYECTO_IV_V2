import { Routes } from '@angular/router';
import { ApiTestComponent } from './components/api-test/api-test.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatTestComponent } from './components/chat/chat-test.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FaqComponent } from './components/faq/faq.component';
import { SliderDemoComponent } from './components/slider/slider-demo.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { MultimediaDemoComponent } from './components/multimedia-demo/multimedia-demo.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'api-test', component: ApiTestComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'chat-test', component: ChatTestComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'slider-demo', component: SliderDemoComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'multimedia', component: MultimediaDemoComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
