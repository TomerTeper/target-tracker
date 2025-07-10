import { Component, input, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Target } from '../../models/target.model';

@Component({
  selector: 'app-target-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetListComponent {
  targets = input<Target[]>([]);
  @ViewChild('targetsList', { static: false }) targetsList!: ElementRef;

  trackByTargetId(index: number, target: Target): string {
    return target.id;
  }

  scrollToLatestTarget() {
    if (this.targetsList && this.targetsList.nativeElement) {
      const container = this.targetsList.nativeElement;
      
      // Smooth scroll to the top (latest target)
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
} 