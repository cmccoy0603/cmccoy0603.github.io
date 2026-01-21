import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillComponent } from './skill-component/skill-component';
import { SkillDTO } from '../../models/skill.dto';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SkillComponent]
})
export class SkillsComponent {
  protected readonly skills = signal<SkillDTO[]>([
    { id: 1, name: 'C#', description: 'Expert' },
    { id: 2, name: 'C++', description: 'Advanced' },
    { id: 3, name: 'TypeScript', description: 'Advanced' },
    { id: 4, name: 'Angular', description: 'Advanced' },
    { id: 5, name: 'Unity', description: 'Expert' },
    { id: 6, name: 'Unreal Engine', description: 'Advanced' },
    { id: 7, name: 'Game Design', description: 'Advanced' },
    { id: 8, name: 'Physics Systems', description: 'Intermediate' },
    { id: 9, name: 'Networking', description: 'Intermediate' }
  ]);
}
