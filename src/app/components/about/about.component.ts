import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  // Propiedades para la información de misión, visión, políticas y mapa
  company = {
    name: 'Trading Academy',
    slogan: 'Formando traders exitosos desde 2020',
    year: new Date().getFullYear()
  };
  
  // Array de políticas para facilitar las actualizaciones futuras
  policies = [
    {
      title: 'Excelencia Educativa',
      description: 'Nos comprometemos a ofrecer contenido educativo de la más alta calidad, actualizado con las últimas tendencias del mercado financiero.'
    },
    {
      title: 'Ética Profesional',
      description: 'Todos nuestros formadores siguen un estricto código ético que prioriza la transparencia y la honestidad en la enseñanza del trading.'
    },
    {
      title: 'Aprendizaje Continuo',
      description: 'Fomentamos una cultura de aprendizaje permanente, donde tanto estudiantes como profesores están en constante evolución y crecimiento.'
    },
    {
      title: 'Responsabilidad Financiera',
      description: 'Promovemos la gestión responsable del riesgo y la toma de decisiones informadas en los mercados financieros.'
    },
    {
      title: 'Comunidad Colaborativa',
      description: 'Creemos en el poder de la comunidad para impulsar el crecimiento personal y profesional de cada trader.'
    }
  ];
}
