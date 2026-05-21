import { Component, input } from '@angular/core';
import { PortfolioGameDTO } from '../../../models/portfolio-game.dto';
import { IframeStartWrapper } from '../iframe-start-wrapper/iframe-start-wrapper';

@Component({
  selector: 'app-threed-chromo-twist-modal-body',
  imports: [IframeStartWrapper],
  templateUrl: './threed-chromo-twist-modal-body.html',
  styleUrl: './threed-chromo-twist-modal-body.scss'
})
export class ThreedChromoTwistModalBody {
  game = input.required<PortfolioGameDTO>();
}
