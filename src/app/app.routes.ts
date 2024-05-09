import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterlistComponent } from './components/characterlist/characterlist.component';
import { LikedCharactersComponent } from './components/liked-characters/liked-characters.component';

export const routes: Routes = [
    { path: '', component: CharacterlistComponent },
    { path: 'liked-characters', component: LikedCharactersComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
