import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MemesComponent } from './memes/memes.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MemesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'memeology-exam';
}
