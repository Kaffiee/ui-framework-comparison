import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

type View = 'dashboard' | 'employees' | 'form' | 'detail' | 'style';
type DetailTab = 'profile' | 'projects' | 'documents';
type SortKey = 'name' | 'department' | 'hireDate';
type EmployeeStatus = 'Active' | 'Pending' | 'Inactive';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  hireDate: string;
  status: EmployeeStatus;
  notes: string;
  location: string;
  workload: number;
  projects: string[];
  documents: string[];
}

interface EmployeeFormModel {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  hireDate: string;
  status: EmployeeStatus;
  notes: string;
  location: string;
  workload: number;
}

interface ActivityItem {
  title: string;
  description: string;
  time: string;
}

interface TaskItem {
  title: string;
  owner: string;
  due: string;
}

interface StandardizationArea {
  area: string;
  reason: string;
}

interface SelectOption {
  label: string;
  value: string;
}

const SEED_EMPLOYEES: Employee[] = [
  {
    id: 101,
    firstName: 'Anna',
    lastName: 'Meyer',
    email: 'anna.meyer@corp.example',
    department: 'HR',
    role: 'HR Manager',
    hireDate: '2021-03-14',
    status: 'Active',
    notes: 'Owns onboarding standardization for all regions.',
    location: 'Vienna',
    workload: 74,
    projects: ['Onboarding Refresh', 'Policy Portal'],
    documents: ['Employment contract', 'Annual review 2025']
  },
  {
    id: 102,
    firstName: 'Lukas',
    lastName: 'Huber',
    email: 'lukas.huber@corp.example',
    department: 'IT',
    role: 'Frontend Developer',
    hireDate: '2022-06-01',
    status: 'Active',
    notes: 'Maintains Angular component governance.',
    location: 'Graz',
    workload: 82,
    projects: ['Customer Portal', 'UI Framework Audit'],
    documents: ['Security training', 'Equipment checklist']
  },
  {
    id: 103,
    firstName: 'Nina',
    lastName: 'Bauer',
    email: 'nina.bauer@corp.example',
    department: 'Sales',
    role: 'Business Analyst',
    hireDate: '2023-01-09',
    status: 'Pending',
    notes: 'Waiting for final approval on CRM access.',
    location: 'Linz',
    workload: 58,
    projects: ['Sales Dashboard Pilot'],
    documents: ['NDA', 'Role approval request']
  },
  {
    id: 104,
    firstName: 'David',
    lastName: 'Fischer',
    email: 'david.fischer@corp.example',
    department: 'Finance',
    role: 'Controller',
    hireDate: '2020-11-23',
    status: 'Active',
    notes: 'Needs table exports and approval dialogs frequently.',
    location: 'Munich',
    workload: 67,
    projects: ['Expense Standardization', 'Forecast Cockpit'],
    documents: ['Budget policy', 'Quarterly compliance report']
  },
  {
    id: 105,
    firstName: 'Sara',
    lastName: 'Novak',
    email: 'sara.novak@corp.example',
    department: 'Operations',
    role: 'Operations Lead',
    hireDate: '2019-09-16',
    status: 'Active',
    notes: 'Coordinates process templates across three teams.',
    location: 'Prague',
    workload: 88,
    projects: ['Service Desk Rollout', 'Internal Workflow Kit'],
    documents: ['Process handbook', 'Escalation matrix']
  },
  {
    id: 106,
    firstName: 'Mehmet',
    lastName: 'Kaya',
    email: 'mehmet.kaya@corp.example',
    department: 'IT',
    role: 'QA Specialist',
    hireDate: '2021-08-02',
    status: 'Inactive',
    notes: 'Historical record kept for audit trail examples.',
    location: 'Berlin',
    workload: 0,
    projects: ['Regression Toolkit'],
    documents: ['Offboarding checklist']
  }
];

const ACTIVITIES: ActivityItem[] = [
  {
    title: 'Component catalog refreshed',
    description: 'PrimeNG covers more enterprise widgets out of the box, which reduces assembly work.',
    time: 'Today, 09:15'
  },
  {
    title: 'Dialog pattern reviewed',
    description: 'The team aligned confirm flows for approval and deactivation actions.',
    time: 'Yesterday, 16:40'
  },
  {
    title: 'Form validation validated',
    description: 'Field grouping, helper text, and error messages were checked against the mock workflow.',
    time: 'Yesterday, 11:05'
  }
];

const TASKS: TaskItem[] = [
  { title: 'Measure wrapper count', owner: 'Frontend Chapter', due: '2026-04-22' },
  { title: 'Compare theme override effort', owner: 'UX Governance', due: '2026-04-24' },
  { title: 'Review built-in data table features', owner: 'HR Portal Team', due: '2026-04-26' }
];

const STANDARDIZATION_AREAS: StandardizationArea[] = [
  {
    area: 'Navigation and page shell',
    reason: 'Header, sidebar, and page actions recur throughout enterprise products.'
  },
  {
    area: 'Forms and validation states',
    reason: 'Shared field behavior and consistent validation reduce implementation variance.'
  },
  {
    area: 'Tables and status indicators',
    reason: 'Corporate modules revolve around filtered lists, approvals, and status communication.'
  },
  {
    area: 'Feedback patterns',
    reason: 'Dialogs, toasts, and empty states are central to trustworthy workflows.'
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    SkeletonModule,
    TableModule,
    TagModule,
    TextareaModule,
    ToastModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly views: { id: View; label: string; description: string }[] = [
    { id: 'dashboard', label: 'Dashboard', description: 'KPIs, activity, quick actions' },
    { id: 'employees', label: 'Employees', description: 'Table, filters, pagination' },
    { id: 'form', label: 'Create/Edit', description: 'Validation and grouped fields' },
    { id: 'detail', label: 'Detail', description: 'Structured employee record' },
    { id: 'style', label: 'Style Guide', description: 'Reusable UI standards' }
  ];

  protected readonly departments = ['All', 'Finance', 'HR', 'IT', 'Operations', 'Sales'];
  protected readonly departmentChoices = this.departments.filter((item) => item !== 'All');
  protected readonly statuses = ['All', 'Active', 'Pending', 'Inactive'] as const;
  protected readonly employeeStatuses = this.statuses.filter((item) => item !== 'All') as EmployeeStatus[];
  protected readonly departmentOptions: SelectOption[] = this.departments.map((item) => ({ label: item, value: item }));
  protected readonly statusOptions: SelectOption[] = this.statuses.map((item) => ({ label: item, value: item }));
  protected readonly formStatusOptions: SelectOption[] = this.employeeStatuses.map((item) => ({ label: item, value: item }));
  protected readonly departmentChoiceOptions: SelectOption[] = this.departmentChoices.map((item) => ({ label: item, value: item }));
  protected readonly sortOptions: SelectOption[] = [
    { label: 'Name', value: 'name' },
    { label: 'Department', value: 'department' },
    { label: 'Hire date', value: 'hireDate' }
  ];
  protected readonly standardizationAreas = STANDARDIZATION_AREAS;
  protected readonly activities = ACTIVITIES;
  protected readonly tasks = TASKS;
  protected readonly pageSize = 4;

  protected readonly activeView = signal<View>('dashboard');
  protected readonly detailTab = signal<DetailTab>('profile');
  protected readonly searchTerm = signal('');
  protected readonly departmentFilter = signal('All');
  protected readonly statusFilter = signal('All');
  protected readonly sortKey = signal<SortKey>('name');
  protected readonly currentPage = signal(1);
  protected readonly dashboardLoading = signal(true);
  protected readonly tableLoading = signal(true);
  protected readonly employees = signal<Employee[]>(SEED_EMPLOYEES);
  protected readonly selectedEmployeeId = signal<number>(SEED_EMPLOYEES[0].id);
  protected readonly formMode = signal<'create' | 'edit'>('create');

  protected employeeForm: EmployeeFormModel = this.createEmptyForm();
  protected confirmDialogVisible = false;
  protected confirmEmployeeId: number | null = null;

  protected readonly selectedEmployee = computed(() =>
    this.employees().find((employee) => employee.id === this.selectedEmployeeId())
  );

  protected readonly filteredEmployees = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const department = this.departmentFilter();
    const status = this.statusFilter();

    return [...this.employees()]
      .filter((employee) => {
        const matchesTerm =
          term.length === 0 ||
          `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(term) ||
          employee.email.toLowerCase().includes(term) ||
          employee.role.toLowerCase().includes(term);
        const matchesDepartment = department === 'All' || employee.department === department;
        const matchesStatus = status === 'All' || employee.status === status;

        return matchesTerm && matchesDepartment && matchesStatus;
      })
      .sort((left, right) => {
        switch (this.sortKey()) {
          case 'department':
            return left.department.localeCompare(right.department) || this.employeeName(left).localeCompare(this.employeeName(right));
          case 'hireDate':
            return right.hireDate.localeCompare(left.hireDate);
          case 'name':
          default:
            return this.employeeName(left).localeCompare(this.employeeName(right));
        }
      });
  });

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredEmployees().length / this.pageSize))
  );

  protected readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1)
  );

  protected readonly pagedEmployees = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredEmployees().slice(start, start + this.pageSize);
  });

  protected readonly kpis = computed(() => {
    const employees = this.employees();

    return [
      { label: 'Employees', value: employees.length, note: 'Same mock dataset across frameworks' },
      {
        label: 'Active',
        value: employees.filter((employee) => employee.status === 'Active').length,
        note: 'Built-in tags make status communication quick'
      },
      {
        label: 'Pending',
        value: employees.filter((employee) => employee.status === 'Pending').length,
        note: 'Good trigger for dialog and toast workflows'
      },
      {
        label: 'Avg. Workload',
        value: `${Math.round(
          employees.reduce((sum, employee) => sum + employee.workload, 0) / employees.length
        )}%`,
        note: 'Useful KPI card pattern for dashboards'
      }
    ];
  });

  private readonly messageService = inject(MessageService);

  constructor() {
    effect(() => {
      const currentPage = this.currentPage();
      const totalPages = this.totalPages();

      if (currentPage > totalPages) {
        this.currentPage.set(totalPages);
      }
    });
  }

  ngOnInit(): void {
    window.setTimeout(() => this.dashboardLoading.set(false), 700);
    window.setTimeout(() => this.tableLoading.set(false), 1000);
  }

  protected setView(view: View): void {
    this.activeView.set(view);

    if (view === 'detail' && !this.selectedEmployee()) {
      this.selectedEmployeeId.set(this.employees()[0]?.id ?? 0);
    }
  }

  protected setDetailTab(tab: DetailTab): void {
    this.detailTab.set(tab);
  }

  protected updateSearchTerm(term: string): void {
    this.searchTerm.set(term);
    this.currentPage.set(1);
  }

  protected updateDepartmentFilter(department: string): void {
    this.departmentFilter.set(department);
    this.currentPage.set(1);
  }

  protected updateStatusFilter(status: string): void {
    this.statusFilter.set(status);
    this.currentPage.set(1);
  }

  protected updateSort(sortKey: string): void {
    this.sortKey.set(sortKey as SortKey);
    this.currentPage.set(1);
  }

  protected resetFilters(): void {
    this.searchTerm.set('');
    this.departmentFilter.set('All');
    this.statusFilter.set('All');
    this.sortKey.set('name');
    this.currentPage.set(1);
  }

  protected goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  protected previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  protected nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  protected viewEmployee(employee: Employee): void {
    this.selectedEmployeeId.set(employee.id);
    this.detailTab.set('profile');
    this.activeView.set('detail');
  }

  protected openCreateForm(): void {
    this.formMode.set('create');
    this.employeeForm = this.createEmptyForm();
    this.activeView.set('form');
  }

  protected openEditForm(employee: Employee): void {
    this.formMode.set('edit');
    this.selectedEmployeeId.set(employee.id);
    this.employeeForm = {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.department,
      role: employee.role,
      hireDate: employee.hireDate,
      status: employee.status,
      notes: employee.notes,
      location: employee.location,
      workload: employee.workload
    };
    this.activeView.set('form');
  }

  protected saveEmployee(form: NgForm): void {
    if (form.invalid) {
      this.showToast('warn', 'Validation', 'Please complete the required fields before saving.');
      return;
    }

    const payload = this.formToEmployee();

    if (this.formMode() === 'edit' && payload.id !== null) {
      this.employees.update((employees) =>
        employees.map((employee) => (employee.id === payload.id ? payload : employee))
      );
      this.selectedEmployeeId.set(payload.id);
      this.showToast('success', 'Saved', 'Employee record updated.');
    } else {
      const nextId = Math.max(...this.employees().map((employee) => employee.id)) + 1;
      payload.id = nextId;
      this.employees.update((employees) => [payload as Employee, ...employees]);
      this.selectedEmployeeId.set(nextId);
      this.formMode.set('edit');
      this.showToast('success', 'Created', 'Employee added to the mock dataset.');
    }

    this.activeView.set('detail');
  }

  protected resetForm(form: NgForm): void {
    this.employeeForm = this.createEmptyForm();
    form.resetForm(this.employeeForm);
    this.formMode.set('create');
  }

  protected refreshDashboard(): void {
    this.dashboardLoading.set(true);
    window.setTimeout(() => this.dashboardLoading.set(false), 600);
    this.showToast('info', 'Refreshed', 'Dashboard widgets refreshed.');
  }

  protected openDeactivateDialog(employee: Employee): void {
    this.confirmEmployeeId = employee.id;
    this.confirmDialogVisible = true;
  }

  protected closeDeactivateDialog(): void {
    this.confirmDialogVisible = false;
    this.confirmEmployeeId = null;
  }

  protected confirmDeactivation(): void {
    if (this.confirmEmployeeId === null) {
      return;
    }

    this.employees.update((employees) =>
      employees.map((employee) =>
        employee.id === this.confirmEmployeeId ? { ...employee, status: 'Inactive' } : employee
      )
    );
    this.closeDeactivateDialog();
    this.showToast('info', 'Status updated', 'Employee status changed to inactive.');
  }

  protected showDemoToast(): void {
    this.showToast('info', 'Style guide', 'PrimeNG toast triggered from the style guide.');
  }

  protected employeeName(employee: Employee): string {
    return `${employee.firstName} ${employee.lastName}`;
  }

  protected statusSeverity(status: EmployeeStatus): 'success' | 'warn' | 'secondary' {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Pending':
        return 'warn';
      case 'Inactive':
      default:
        return 'secondary';
    }
  }

  protected currentViewTitle(): string {
    return this.views.find((view) => view.id === this.activeView())?.label ?? 'Dashboard';
  }

  private showToast(severity: 'success' | 'info' | 'warn', summary: string, detail: string): void {
    this.messageService.add({
      severity,
      summary,
      detail
    });
  }

  private createEmptyForm(): EmployeeFormModel {
    return {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      department: 'IT',
      role: 'Developer',
      hireDate: '2026-04-18',
      status: 'Active',
      notes: '',
      location: 'Vienna',
      workload: 65
    };
  }

  private formToEmployee(): Employee {
    const fallbackProjects =
      this.formMode() === 'edit'
        ? this.selectedEmployee()?.projects ?? ['UI Framework Comparison']
        : ['New onboarding bundle'];
    const fallbackDocuments =
      this.formMode() === 'edit'
        ? this.selectedEmployee()?.documents ?? ['Profile summary']
        : ['Profile summary'];

    return {
      id: this.employeeForm.id ?? 0,
      firstName: this.employeeForm.firstName.trim(),
      lastName: this.employeeForm.lastName.trim(),
      email: this.employeeForm.email.trim().toLowerCase(),
      department: this.employeeForm.department,
      role: this.employeeForm.role.trim(),
      hireDate: this.employeeForm.hireDate,
      status: this.employeeForm.status,
      notes: this.employeeForm.notes.trim(),
      location: this.employeeForm.location.trim(),
      workload: this.employeeForm.workload,
      projects: fallbackProjects,
      documents: fallbackDocuments
    };
  }
}
