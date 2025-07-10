import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stream-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stream-controls.component.html',
  styleUrls: ['./stream-controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StreamControlsComponent {
  // Input signals
  isConnected = input<boolean>(false);
  selectedClassification = input<'' | 'hostile' | 'friendly'>('');
  
  // Output signals
  toggleStream = output<void>();
  clearTargets = output<void>();
  filterChange = output<'hostile' | 'friendly' | ''>();

  onToggleStream(): void {
    this.toggleStream.emit();
  }

  onClearTargets(): void {
    this.clearTargets.emit();
  }

  onFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterChange.emit(target.value as '' | 'hostile' | 'friendly');
  }
} 