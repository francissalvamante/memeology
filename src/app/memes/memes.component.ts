import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CacheService } from '../services/cache.service';

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  captions: number;
}

@Component({
  selector: 'app-memes',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './memes.component.html',
  styleUrl: './memes.component.scss',
})
export class MemesComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  memes: any = [];
  activeMeme: any;
  memePosition: number = Math.floor(Math.random() * 100);
  constructor(
    private apiService: ApiService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.loadMemes();
  }

  loadMemes() {
    const url = 'https://api.imgflip.com/get_memes';
    this.cacheService
      .cacheObservable(url, this.apiService.get(url))
      .subscribe((response) => {
        this.memes = response.data.memes;
        this.activeMeme = this.memes[this.memePosition];
      });

    // No Caching logic
    // this.apiService.get('https://api.imgflip.com/get_memes').subscribe({
    //   next: (response: { data: { memes: Meme[] } }) => {
    //     this.memes = response.data.memes;
    //     this.activeMeme = this.memes[this.memePosition];
    //   },
    //   error: (error) => console.error('Error fetching memes:', error),
    // });
  }

  showNextMeme(direction: number) {
    if (this.memePosition === 0 && direction === -1) {
      this.memePosition = this.memes.length - 1;
      this.activeMeme = this.memes[this.memePosition];
      return;
    }

    if (this.memePosition === this.memes.length - 1 && direction === 1) {
      this.memePosition = 0;
      this.activeMeme = this.memes[this.memePosition];
      return;
    }

    this.memePosition += direction;
    this.activeMeme = this.memes[this.memePosition];
  }
}
