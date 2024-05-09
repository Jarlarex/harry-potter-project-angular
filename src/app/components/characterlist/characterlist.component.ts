import { Component, OnInit, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Character } from '../../interfaces/character.model';
import { HarryPotterService } from '../../services/harry-potter-api.service';
import { CharacterDetailComponent } from '../characterdetail/characterdetail.component';
import { CommonModule } from '@angular/common';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'app-characterlist',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CharacterDetailComponent, CommonModule],
  templateUrl: './characterlist.component.html',
  styleUrls: ['./characterlist.component.css']
})
export class CharacterlistComponent implements OnInit {
  allCharacters: Character[] = [];
  characters: Character[] = [];
  selectedCharacter?: Character;
  currentPage = 1;
  pageSize = 8;

  @ViewChild(CharacterDetailComponent) characterDetailComponent!: CharacterDetailComponent;

  constructor(
    private hpService: HarryPotterService,
    private likeService: LikeService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.hpService.getCharactersWithLikes().subscribe(
      data => {
        this.allCharacters = data;
        this.updatePage();
      },
      error => console.error('Error fetching characters', error)
    );
  }

  updatePage(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.characters = this.allCharacters.slice(start, end);
    this.cdr.markForCheck();
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.allCharacters.length) {
      this.currentPage++;
      this.updatePage();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  openCharacterDetail(character: Character): void {
    console.log('Character clicked:', character);
    this.selectedCharacter = character;
    if (this.characterDetailComponent) {
      console.log('Opening modal for:', character);
      this.characterDetailComponent.character = character;
      this.characterDetailComponent.openModal();
    }
  }

  handleCloseDetail(): void {
    this.selectedCharacter = undefined;
    if (this.characterDetailComponent) {
      this.characterDetailComponent.closeModal();
    }
  }

  toggleLike(character: Character, event: MouseEvent): void {
    event.stopPropagation();
    if (character.liked) {
      this.likeService.unlikeCharacter(character).subscribe(() => {
        character.liked = false;
        this.cdr.markForCheck();
      }, error => console.error('Error unliking character', error));
    } else {
      this.likeService.likeCharacter(character).subscribe(() => {
        character.liked = true;
        this.cdr.markForCheck();
      }, error => console.error('Error liking character', error));
    }
  }
}