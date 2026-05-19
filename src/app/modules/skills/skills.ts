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
    { id: 1, name: 'C#', description: 'Yeah I\'ve used it' },
    { id: 2, name: 'C++', description: 'Yeah i\'ve used it' },
    { id: 3, name: 'Object-Oriented Programming', description: 'Experience with OOP principles and design patterns' },
    { id: 4, name: 'Godot', description: 'Experience with Godot game engine creating many game jam projects' },
    { id: 5, name: 'Unity', description: 'Completed multiple projects using Unity both singleplayer and multiplayer' },
    { id: 6, name: 'Unreal Engine', description: 'Created two school projects using Unreal Engine' },
    { id: 7, name: 'Game Design', description: 'I\'ve made several games from concept to completion for game jams' },
    { id: 8, name: 'Physics Systems', description: 'Experience implementing physics libraries in box2d and bullet physics' },
    { id: 9, name: 'Networking', description: 'Created multiplayer rts using Unreal\'s replication system and created a custom server for an Unity project' }
  ]);
}
