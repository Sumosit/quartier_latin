import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  currentVideoIndex = 0;
  currentProgress = 0;
  private progressInterval?: number;

  videos = [
    {
      src: 'assets/hero/IMG_7926.mp4',
      title: 'Студенты и образование'
    },
    {
      src: 'assets/hero/IMG_7926.mp4',
      title: 'Жизнь в Европе'
    },
    {
      src: 'assets/hero/IMG_7926.mp4',
      title: 'Успешные истории'
    }
  ];

  ngOnInit() {
  }

  ngOnDestroy() {
    this.clearProgressInterval();
  }

  onVideoLoaded() {
    this.currentProgress = 0;
    this.updateProgress();
  }

  onTimeUpdate() {
    this.updateProgress();
  }

  onVideoEnded() {
    if (this.currentVideoIndex < this.videos.length - 1) {
      this.nextVideo();
    } else {
      this.currentVideoIndex = 0;
      this.playCurrentVideo();
    }
  }

  nextVideo() {
    if (this.currentVideoIndex < this.videos.length - 1) {
      this.currentVideoIndex++;
      this.playCurrentVideo();
    }
  }

  previousVideo() {
    if (this.currentVideoIndex > 0) {
      this.currentVideoIndex--;
      this.playCurrentVideo();
    }
  }

  private playCurrentVideo() {
    if (this.videoElement?.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.src = this.videos[this.currentVideoIndex].src;
      video.load();
      video.play();
      this.currentProgress = 0;
    }
  }

  private updateProgress() {
    if (this.videoElement?.nativeElement) {
      const video = this.videoElement.nativeElement;
      if (video.duration > 0) {
        this.currentProgress = (video.currentTime / video.duration) * 100;
      }
    }
  }

  private clearProgressInterval() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }
}
