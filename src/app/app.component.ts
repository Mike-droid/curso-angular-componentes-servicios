import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

  showImage: boolean = true;

  onLoaded(img: string) {
    console.log('log padre!', img); //* img viene del hijo
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }
}
