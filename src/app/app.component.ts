import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

  showImage: boolean = true;

  toggleImage() {
    this.showImage = !this.showImage;
  }
}
