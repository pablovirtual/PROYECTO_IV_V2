import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
  category: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  
  activeCategory: string = 'all';
  searchTerm: string = '';
  
  faqItems: FaqItem[] = [
    {
      question: '¿Qué es Trading Academy?',
      answer: 'Trading Academy es una plataforma educativa diseñada para ayudar a principiantes y traders experimentados a desarrollar habilidades de trading en los mercados financieros. Ofrecemos cursos estructurados, recursos educativos y una comunidad de apoyo.',
      isOpen: false,
      category: 'general'
    },
    {
      question: '¿Necesito experiencia previa para unirme a Trading Academy?',
      answer: 'No, nuestros cursos están diseñados para todos los niveles. Tenemos material introductorio para principiantes absolutos y contenido avanzado para traders con experiencia que desean perfeccionar sus estrategias.',
      isOpen: false,
      category: 'cursos'
    },
    {
      question: '¿Cómo funcionan los cursos en Trading Academy?',
      answer: 'Nuestros cursos están estructurados en módulos progresivos. Cada módulo incluye lecciones en video, material de lectura, cuestionarios y ejercicios prácticos. Puedes avanzar a tu propio ritmo y acceder al contenido las 24 horas del día.',
      isOpen: false,
      category: 'cursos'
    },
    {
      question: '¿Ofrecen certificaciones al completar los cursos?',
      answer: 'Sí, al completar cada curso recibirás un certificado digital que puedes compartir en redes profesionales y añadir a tu currículum. Estas certificaciones validan tus conocimientos y habilidades en trading.',
      isOpen: false,
      category: 'cursos'
    },
    {
      question: '¿Cuánto cuesta suscribirse a Trading Academy?',
      answer: 'Ofrecemos diferentes planes de suscripción adaptados a distintas necesidades. Tenemos planes mensuales, trimestrales y anuales con diferentes beneficios. También ofrecemos un periodo de prueba gratuito para que puedas explorar nuestra plataforma antes de comprometerte.',
      isOpen: false,
      category: 'membresía'
    },
    {
      question: '¿Puedo cancelar mi suscripción en cualquier momento?',
      answer: 'Sí, puedes cancelar tu suscripción en cualquier momento desde tu perfil. No hay penalizaciones por cancelación anticipada. Si cancelas, mantendrás el acceso hasta el final del periodo facturado.',
      isOpen: false,
      category: 'membresía'
    },
    {
      question: '¿Trading Academy ofrece asesoramiento financiero personalizado?',
      answer: 'Trading Academy es principalmente una plataforma educativa. No ofrecemos asesoramiento financiero personalizado ni recomendaciones específicas de inversión. Nuestro objetivo es educarte para que puedas tomar tus propias decisiones informadas.',
      isOpen: false,
      category: 'legal'
    },
    {
      question: '¿Cómo puedo contactar con el soporte técnico?',
      answer: 'Puedes contactar con nuestro equipo de soporte a través del formulario de contacto en nuestra web, por correo electrónico a soporte@tradingacademy.com o mediante el chat en vivo disponible en horario laboral.',
      isOpen: false,
      category: 'soporte'
    },
    {
      question: '¿Ofrecen alguna garantía de resultados?',
      answer: 'El trading implica riesgos y los resultados varían según el individuo. No garantizamos beneficios específicos. Nuestro compromiso es proporcionarte educación de calidad y herramientas para que desarrolles tus propias estrategias.',
      isOpen: false,
      category: 'legal'
    },
    {
      question: '¿Tienen una aplicación móvil?',
      answer: 'Sí, disponemos de aplicaciones para iOS y Android que te permiten acceder a todo el contenido de la plataforma, ver lecciones y participar en la comunidad desde cualquier lugar.',
      isOpen: false,
      category: 'plataforma'
    }
  ];

  // Categorías únicas extraídas de los items de FAQ
  get categories(): string[] {
    const uniqueCategories = new Set(this.faqItems.map(item => item.category));
    return ['all', ...Array.from(uniqueCategories)];
  }

  // Items filtrados según categoría activa y término de búsqueda
  get filteredItems(): FaqItem[] {
    return this.faqItems.filter(item => {
      // Filtro por categoría
      const categoryMatch = this.activeCategory === 'all' || item.category === this.activeCategory;
      
      // Filtro por término de búsqueda
      const searchMatch = !this.searchTerm || 
        item.question.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        item.answer.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return categoryMatch && searchMatch;
    });
  }

  // Cambiar categoría activa
  setCategory(category: string): void {
    this.activeCategory = category;
  }

  // Filtrar por búsqueda
  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  // Alternar visibilidad de respuesta
  toggleItem(item: FaqItem): void {
    item.isOpen = !item.isOpen;
  }
}
