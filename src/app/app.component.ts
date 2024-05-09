import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CharacterlistComponent } from './components/characterlist/characterlist.component';
import { LikedCharactersComponent } from './components/liked-characters/liked-characters.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CharacterlistComponent, HttpClientModule,
    CommonModule, RouterLink, RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'harry-potter-project';
}
