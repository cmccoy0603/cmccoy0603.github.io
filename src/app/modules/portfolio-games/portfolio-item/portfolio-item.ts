import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { PortfolioGameDTO } from '../../../models/portfolio-game.dto';

@Component({
  selector: 'app-portfolio-item',
  standalone: true,
  templateUrl: './portfolio-item.html',
  styleUrl: './portfolio-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'portfolio-card-host',
  }
})
export class PortfolioItem {
  game = input.required<PortfolioGameDTO>();
  selected = output<PortfolioGameDTO>();

  protected readonly backgroundImage = computed(() => {
    const image = this.game().image ?? '';
    return `linear-gradient(180deg, rgba(11, 16, 32, 0.1), rgba(11, 16, 32, 0.78)), url('${image}')`;
  });

  protected onSelect() {
    this.selected.emit(this.game());
  }
}