import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() img: string = ''; //* se comunica con el hijo

  @Output() loaded = new EventEmitter<string>(); //* se comunica con el padre

  imageDefault = './assets/images/default.png'

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

  ngOnChanges(): void {
    //* before and while render
    //* cambios en los *inputs* - muchas veces
    console.log(`ngOnChanges => this.img = ${this.img}`);
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
