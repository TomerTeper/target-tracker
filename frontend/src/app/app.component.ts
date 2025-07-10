import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TargetService } from './services/target.service';
import { Target } from './models/target.model';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { StreamControlsComponent } from './components/stream-controls/stream-controls.component';
import { TargetListComponent } from './components/target-list/target-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    DashboardHeaderComponent,
    StreamControlsComponent,
    TargetListComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  // Signals
  selectedClassification = signal<'' | 'hostile' | 'friendly'>('');

  // Computed signals
  isConnected = this.targetService.isConnected;
  targets = this.targetService.targets;
  
  // Computed filtered targets
  filteredTargets = computed(() => {
    const targets = this.targets();
    const classification = this.selectedClassification();
    
    if (!classification) return targets;
    return targets.filter(target => target.classification === classification);
  });

  constructor(private targetService: TargetService) {}

  toggleStream() {
    if (this.isConnected()) {
      this.targetService.stopWebSocketStream();
    } else {
      this.targetService.startWebSocketStream();
    }
  }

  clearTargets() {
    this.targetService.clearTargets();
  }

  onFilterChange(classification: 'hostile' | 'friendly' | '') {
    this.selectedClassification.set(classification);
  }

  trackByTargetId(index: number, target: Target): string {
    return target.id;
  }
} 