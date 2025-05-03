// En components/api-test/api-test.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ApiTestComponent implements OnInit {
  responseData: any;
  connectionStatus: string = 'No probado';
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  testApiConnection(): void {
    this.isLoading = true;
    this.connectionStatus = 'Probando...';
    this.error = null;
    
    this.apiService.testConnection().subscribe({
      next: (response) => {
        this.responseData = response;
        this.connectionStatus = 'Conexión exitosa';
        this.isLoading = false;
      },
      error: (err) => {
        this.error = `Error: ${err.message}`;
        this.connectionStatus = 'Error en la conexión';
        this.isLoading = false;
      }
    });
  }
}