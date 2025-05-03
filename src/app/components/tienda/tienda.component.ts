import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  descuento?: number;
  imagenUrl: string;
  categoria: string;
  destacado: boolean;
  stock: number;
}

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, FormsModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias: string[] = [];
  categoriaSeleccionada: string = 'todas';
  ordenSeleccionado: string = 'nombre-asc';
  terminoBusqueda: string = '';
  
  carrito: {producto: Producto, cantidad: number}[] = [];
  mostrarCarrito: boolean = false;
  
  // Producto que se muestra en el modal
  productoDetalle: Producto | null = null;
  
  constructor() {
    // Inicializamos los productos de la tienda
    this.productos = [
      {
        id: 1,
        nombre: 'Curso Básico de Trading',
        descripcion: 'Aprende los fundamentos del trading desde cero. Este curso incluye conceptos básicos, terminología, y estrategias iniciales.',
        precio: 49.99,
        imagenUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=500',
        categoria: 'cursos',
        destacado: true,
        stock: 100
      },
      {
        id: 2,
        nombre: 'Análisis Técnico Avanzado',
        descripcion: 'Domina las técnicas de análisis técnico para identificar tendencias y patrones en los mercados financieros.',
        precio: 79.99,
        descuento: 10,
        imagenUrl: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=500',
        categoria: 'cursos',
        destacado: false,
        stock: 75
      },
      {
        id: 3,
        nombre: 'Psicología del Trading',
        descripcion: 'Aprende a controlar tus emociones y desarrollar la mentalidad correcta para el trading exitoso.',
        precio: 59.99,
        imagenUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=500',
        categoria: 'cursos',
        destacado: false,
        stock: 85
      },
      {
        id: 4,
        nombre: 'Libro: Estrategias de Trading',
        descripcion: 'Compilación de estrategias probadas para diferentes mercados y condiciones.',
        precio: 29.99,
        imagenUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=500',
        categoria: 'libros',
        destacado: true,
        stock: 50
      },
      {
        id: 5,
        nombre: 'Acceso Premium a Señales',
        descripcion: 'Recibe señales de trading en tiempo real directamente en tu dispositivo.',
        precio: 99.99,
        descuento: 15,
        imagenUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=500',
        categoria: 'servicios',
        destacado: true,
        stock: 100
      },
      {
        id: 6,
        nombre: 'Mentoría Personalizada',
        descripcion: 'Sesiones de mentoría uno a uno con traders profesionales.',
        precio: 199.99,
        imagenUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=500',
        categoria: 'servicios',
        destacado: false,
        stock: 20
      },
      {
        id: 7,
        nombre: 'Herramientas de Análisis',
        descripcion: 'Software especializado para análisis técnico y fundamental.',
        precio: 89.99,
        descuento: 5,
        imagenUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500',
        categoria: 'herramientas',
        destacado: true,
        stock: 30
      },
      {
        id: 8,
        nombre: 'Trading Journal Premium',
        descripcion: 'Aplicación para registrar y analizar tus operaciones de trading.',
        precio: 39.99,
        imagenUrl: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=500',
        categoria: 'herramientas',
        destacado: false,
        stock: 60
      }
    ];
    
    this.productosFiltrados = [...this.productos];
    
    // Extraemos las categorías únicas
    const categoriasSet = new Set<string>(this.productos.map(p => p.categoria));
    this.categorias = Array.from(categoriasSet);
  }
  
  ngOnInit(): void {
    // Podríamos cargar productos desde un servicio aquí
    // Por ahora usamos los datos hardcoded
  }
  
  // Métodos para filtrado
  filtrarProductos(): void {
    this.productosFiltrados = this.productos.filter(producto => {
      // Filtrar por categoría
      const categoriaMatch = this.categoriaSeleccionada === 'todas' || 
                              producto.categoria === this.categoriaSeleccionada;
      
      // Filtrar por término de búsqueda
      const searchMatch = this.terminoBusqueda === '' || 
                          producto.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
                          producto.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
      
      return categoriaMatch && searchMatch;
    });
    
    // Aplicar ordenamiento
    this.ordenarProductos();
  }
  
  ordenarProductos(): void {
    switch (this.ordenSeleccionado) {
      case 'nombre-asc':
        this.productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'nombre-desc':
        this.productosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case 'precio-asc':
        this.productosFiltrados.sort((a, b) => this.getPrecioFinal(a) - this.getPrecioFinal(b));
        break;
      case 'precio-desc':
        this.productosFiltrados.sort((a, b) => this.getPrecioFinal(b) - this.getPrecioFinal(a));
        break;
      case 'destacados':
        this.productosFiltrados.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
        break;
    }
  }
  
  // Métodos para el carrito
  agregarAlCarrito(producto: Producto, cantidad: number = 1): void {
    const itemExistente = this.carrito.find(item => item.producto.id === producto.id);
    
    if (itemExistente) {
      if (itemExistente.cantidad + cantidad <= producto.stock) {
        itemExistente.cantidad += cantidad;
      }
    } else {
      if (cantidad <= producto.stock) {
        this.carrito.push({ producto, cantidad });
      }
    }
    
    // Mostrar el carrito brevemente
    this.mostrarCarrito = true;
    setTimeout(() => {
      this.mostrarCarrito = false;
    }, 3000);
  }
  
  eliminarDelCarrito(productoId: number): void {
    this.carrito = this.carrito.filter(item => item.producto.id !== productoId);
  }
  
  calcularTotal(): number {
    return this.carrito.reduce((total, item) => {
      return total + (this.getPrecioFinal(item.producto) * item.cantidad);
    }, 0);
  }
  
  toggleCarrito(): void {
    this.mostrarCarrito = !this.mostrarCarrito;
  }
  
  // Métodos para el modal de detalle
  abrirDetalle(producto: Producto): void {
    this.productoDetalle = producto;
  }
  
  cerrarDetalle(): void {
    this.productoDetalle = null;
  }
  
  // Utilidades
  getPrecioFinal(producto: Producto): number {
    if (producto.descuento) {
      return producto.precio * (1 - producto.descuento / 100);
    }
    return producto.precio;
  }
}
