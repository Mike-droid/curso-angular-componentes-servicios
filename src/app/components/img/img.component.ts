import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  img = '';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('src')
  set changeImg(newImg: string) {
    this.img = newImg;
    //* esto solo se ejecutará cuando cambie el input de la img
  }
  @Input() alt = '';

  @Output() loaded = new EventEmitter<string>(); //* se comunica con el padre

  imageDefault = './assets/images/default.png'

  counter = 0;

  counterFn: number | undefined;

  imgError() {
    this.img = this.imageDefault;
  }
}
