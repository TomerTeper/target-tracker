import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent {
  isConnected = input<boolean>(false);
} 