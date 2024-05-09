import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Character } from '../interfaces/character.model';
import { LikeService } from './like.service';

@Injectable({
  providedIn: 'root'
})
export class HarryPotterService {
  private apiUrl = 'https://hp-api.onrender.com/api/characters';
  private allCharacters: Character[] = [];

  constructor(private http: HttpClient, private likeService: LikeService) {}

  getCharacters(): Observable<Character[]> {
    if (this.allCharacters.length > 0) {
      return of(this.allCharacters);
    } else {
      return this.http.get<Character[]>(this.apiUrl).pipe(
        map(characters => {
          this.allCharacters = characters;
          return characters;
        }),
        catchError(error => {
          console.error('Error fetching characters', error);
          return of([]);
        })
      );
    }
  }

  getLikedCharacters(): Observable<Character[]> {
    return this.likeService.getLikedCharacters();
  }

  getCharactersWithLikes(): Observable<Character[]> {
    return forkJoin([
      this.getCharacters(),
      this.getLikedCharacters()
    ]).pipe(
      map(([characters, likedCharacters]) => {
        characters.forEach(character => {
          character.liked = likedCharacters.some(c => c.id === character.id);
        });
        return characters;
      })
    );
  }
}