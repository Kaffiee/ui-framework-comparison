import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    ToastModule,
    SelectModule,
    TableModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  firstName = '';
  lastName = '';
  email = '';
  department: string | null = null;
  role: string | null = null;

  departments = [
    { name: 'HR' },
    { name: 'IT' },
    { name: 'Sales' }
  ];

  roles = [
    { name: 'Manager' },
    { name: 'Developer' },
    { name: 'Analyst' }
  ];

  employees = [
    { name: 'Anna Meyer', department: 'HR', role: 'Manager', status: 'Active' },
    { name: 'Lukas Huber', department: 'IT', role: 'Developer', status: 'Active' },
    { name: 'Nina Bauer', department: 'Sales', role: 'Analyst', status: 'Pending' }
  ];

  constructor(private messageService: MessageService) {}

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Saved',
      detail: 'Employee saved successfully'
    });
  }
}
