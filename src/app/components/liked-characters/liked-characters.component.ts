import { Component, OnInit } from '@angular/core';
import { Character } from '../../interfaces/character.model';
import { LikeService } from '../../services/like.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-liked-characters',
  standalone: true,
  imports:[ NgFor ],
  templateUrl: './liked-characters.component.html',
  styleUrls: ['./liked-characters.component.css']
})
export class LikedCharactersComponent implements OnInit {
  likedCharacters: Character[] = [];

  constructor(private likeService: LikeService) {}

  ngOnInit(): void {
    this.fetchLikedCharacters();
  }

  fetchLikedCharacters(): void {
    this.likeService.getLikedCharacters().subscribe(
      (characters: Character[]) => {
        this.likedCharacters = characters;
      },
      (error: any) => console.error('Error fetching liked characters', error)
    );
  }
}
