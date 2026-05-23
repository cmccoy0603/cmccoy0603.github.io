import { Injectable, computed, signal } from '@angular/core';

export type DeviceType = 'mobile' | 'desktop';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  readonly deviceType = signal<DeviceType>('desktop');
  readonly isMobile = computed(() => this.deviceType() === 'mobile');

  setDeviceType(viewportWidth: number) {
    this.deviceType.set(viewportWidth < 768 ? 'mobile' : 'desktop');
  }
}