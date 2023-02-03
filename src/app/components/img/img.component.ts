import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';

  @Input('src')
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img =>', this.img);
    //* esto solo se ejecutará cuando cambie el input de la img
  }
  @Input() alt: string = '';

  @Output() loaded = new EventEmitter<string>(); //* se comunica con el padre

  imageDefault = './assets/images/default.png'

  counter = 0;

  counterFn: number | undefined;

  constructor() {
    //* before render - only once
    console.log(`constructor => this.img = ${this.img}`);
    //! NO EJECUTES FUNCIONES ASÍNCRONAS AQUÍ
  }

  ngOnInit(): void {
    //* before render - only once
    //* aquí sí podemos usar async await
    console.log(`ngOnInit => this.img = ${this.img}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //* before and while render
    //* cambios en los *inputs* - muchas veces
    console.log(`ngOnChanges => this.img = ${this.img}`);
    console.log(`ngOnChanges => `, changes);
  }

  ngAfterViewInit(): void {
    //* after render
    //* maneja los hijos
    console.log(`ngAfterViewInit`);
  }

  ngOnDestroy(): void {
    //* cuando ya no existe el componente
    console.log(`ngOnDestroy`);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('log hijo!');
    this.loaded.emit(this.img); //* notificando al padre
  }
}
