import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Target } from '../models/target.model';

@Injectable({
  providedIn: 'root'
})
export class TargetService {
  private targetsSignal = signal<Target[]>([]);
  private isConnectedSignal = signal<boolean>(false);
  private wsConnection?: WebSocket;

  public targets = this.targetsSignal.asReadonly();
  public isConnected = this.isConnectedSignal.asReadonly();
  public targetCount = computed(() => this.targets().length);

  public getFilteredTargets(classification?: 'hostile' | 'friendly') {
    return computed(() => {
      const targets = this.targets();
      if (!classification) return targets;
      return targets.filter(target => target.classification === classification);
    });
  }

  private apiUrl = 'http://localhost:8000';
  private wsUrl = 'ws://localhost:8000/ws';

  private http = inject(HttpClient);

  startWebSocketStream(): void {
    this.stopWebSocketStream();
    
    try {
      this.wsConnection = new WebSocket(this.wsUrl);
      
      this.wsConnection.onopen = () => {
        this.isConnectedSignal.set(true);
        console.log('WebSocket connected to backend');
      };

      this.wsConnection.onmessage = (event) => {
        try {
          const target = JSON.parse(event.data);
          const currentTargets = this.targetsSignal();
          const updatedTargets = [target, ...currentTargets].slice(0, 50); // Keep last 50 targets
          this.targetsSignal.set(updatedTargets);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.wsConnection.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnectedSignal.set(false);
      };

      this.wsConnection.onclose = () => {
        console.log('WebSocket connection closed');
        this.isConnectedSignal.set(false);
      };

    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      this.isConnectedSignal.set(false);
    }
  }

  stopWebSocketStream(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = undefined;
    }
    this.isConnectedSignal.set(false);
  }

  getTargets(): Observable<{targets: Target[], count: number}> {
    return this.http.get<{targets: Target[], count: number}>(`${this.apiUrl}/targets`);
  }

  addTargets(targets: Target[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/targets`, { targets });
  }

  clearTargets(): void {
    this.targetsSignal.set([]);
  }
} 