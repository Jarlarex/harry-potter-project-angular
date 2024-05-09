import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Character } from '../interfaces/character.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private likeApiUrl = 'http://localhost:5050/likes';

  constructor(private http: HttpClient) {}

  getLikedCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.likeApiUrl).pipe(
      catchError(this.handleError)
    );
  }

  likeCharacter(character: Character): Observable<Character> {
    return this.http.post<Character>(this.likeApiUrl, character, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  unlikeCharacter(character: Character): Observable<Character> {
    return this.http.delete<Character>(`${this.likeApiUrl}/${character.id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
