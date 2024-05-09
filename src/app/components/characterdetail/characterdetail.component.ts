import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../interfaces/character.model';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './characterdetail.component.html',
  styleUrls: ['./characterdetail.component.css']
})
export class CharacterDetailComponent {
  @Input() character!: Character;
  @Output() close = new EventEmitter<void>();
  visible: boolean = false;

  constructor() {}

  openModal(): void {
    this.visible = true;
  }

  closeModal(): void {
    this.visible = false;
    this.close.emit();
  }
}
