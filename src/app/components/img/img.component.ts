import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {
  @Input() img: string = ''; //* se comunica con el hijo

  @Output() loaded = new EventEmitter<string>(); //* se comunica con el padre

  imageDefault = './assets/images/default.png'

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('log hijo!');
    this.loaded.emit(this.img); //* notificando al padre
  }
}
