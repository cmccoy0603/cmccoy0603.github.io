import { Component, input } from '@angular/core';
import { SkillDTO } from '../../../models/skill.dto';

@Component({
  selector: 'app-skill-component',
  imports: [],
  templateUrl: './skill-component.html',
  styleUrl: './skill-component.scss'
})
export class SkillComponent {
  skill = input.required<SkillDTO>()
}
