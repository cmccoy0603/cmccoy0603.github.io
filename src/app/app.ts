import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceService } from './shared/device.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly deviceService = inject(DeviceService);

  private readonly viewportListener = effect((onCleanup) => {
    const updateDeviceType = () => {
      this.deviceService.setDeviceType(window.innerWidth);
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);

    onCleanup(() => {
      window.removeEventListener('resize', updateDeviceType);
    });
  });
}
