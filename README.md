# Curso de Angular: Componentes y Servicios

## Componentes

### ¿Qué son los componentes?

Son partes de código que tienen funciones en específico. Juntos se forma toda la aplicación.

Para crear componentes en Angular, usamos la cli con el comando `ng g c todo` -> 'angular create component "nombre"'.

Para recordar: *cada componente debe pertenecer a 1 módulo. Es una relación 1 a 1*.

Angular declara los componentes con el uso del decorador `@Component`.

Para usar los componentes, basta con llamarlos como si fueran una etiqueta HTML.

El componente de img está construido en img.components.ts:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

}

```

Su html es img.component.html:

```html
<p>img works!</p>

```

Y lo usamos en, por ejemplo, app.component.html:

```html
<app-img></app-img>

```

### Uso de Inputs

Los inputs sirven para pasarle información del padre al hijo.

Hagamos que se muestre una imagen por defecto, y si tenemos una url correcta, se mostrará esa otra imagen:

Primero necesitmos FormsModule en nuestra app:

app.module.ts:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgComponent } from './components/img/img.component';

@NgModule({
  declarations: [
    AppComponent,
    ImgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Declaramos la variable en app.component.ts:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
}

```

Hacemos su respectivo código en app.component.html:

```html
<input type="text" [(ngModel)]="imgParent">

<app-img [img]="imgParent"></app-img>

```

Usamos el decorador `@Input` para que se comuniquen padre e hijo en img.components.ts:

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {
  @Input() img: string = 'valor init';
}

```

Hacemos su respectivo código en img.component.html:

```html
<img [src]="img" alt="imagen chida" width="200" *ngIf="img; else elseImg">
<ng-template #elseImg>
  <img src="../../assets/images/default.png" alt="default">
</ng-template>

```

### Uso de Outputs

Los outputs son para pasarle información del hijo al padre.

En el hijo, img.components.ts:

```typescript
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

```

con su html img.component.html:

```html
<img
  [src]="img"
  alt="imagen chida"
  width="200"
  *ngIf="img; else elseImg"
  (error)="imgError()"
  (load)="imgLoaded()"
>
<ng-template #elseImg>
  <img [src]="imageDefault" alt="default">
</ng-template>

```

Recibimos la información y notificación en el padre, app.component.ts:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

  onLoaded(img: string) {
    console.log('log padre!', img); //* img viene del hijo
  }
}

```

y su html, app.component.html:

```html
<input type="text" [(ngModel)]="imgParent">

<app-img (loaded)="onLoaded($event)" [img]="imgParent"></app-img>

```

### Componente para producto

Primero creamos la interfaz del producto, en product.model.ts:

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

```

Creamos el componente con `ng g c components/product`. En su código:

product.component.ts:

```typescript
import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product = {
    id: '',
    name: '',
    price: 0,
    image: ''
  }
}

```

y en product.component.html:

```html
<img [src]="product.image" [alt]="product.name" width="200px">
<h2>${{ product.price }}</h2>
<p>{{ product.name }}</p>

```

Usamos el componente en app.component.ts:

```typescript
import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';

  products: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/toy.jpg'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpg'
    },
  ];

  onLoaded(img: string) {
    console.log('log padre!', img); //* img viene del hijo
  }
}

```

y lo renderizamos en el html de product.component.html:

```html
<app-product *ngFor="let product of products" [product]="product"></app-product>
```

Nota: la parte de `[product]="product"` se entiende por el `*ngFor`.

### Ciclo de vida de componentes

El constructor es algo que corre desde el inicio de vida del componente...

```typescript
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

```

### ngDestoy &amp; SetInput

Algunos eventos pueden seguir ejecutándose aunque su componente ya haya sido destruido. Esto es un problema.

Por ejemplo, tenemos un contador en la UI:

```typescript
import {
  Component,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {
  ngOnInit(): void {
    this.counterFn = window.setInterval(() => {
      this.counter += 1;
      console.log('running counter');
    }, 1000)
  }

  ngOnDestroy(): void {
    window.clearInterval(this.counterFn);
    //* usamos esto para que el interval no se siga ejecutando
  }
}

```

```html
<h3>{{ counter }}</h3>
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showImage: boolean = true;

  toggleImage() {
    this.showImage = !this.showImage;
  }
}

```

```html
<button (click)="toggleImage()">Toggle image</button>

<p> {{ showImage }} </p>

<app-img
  *ngIf="showImage"
  (loaded)="onLoaded($event)"
  [img]="imgParent"
>
</app-img>

```

### Lista de productos

Creamos el componente con `ng g c components/products-list`.

### Componentes y Header

Generamos el nuevo componente con `ng g c components/nav`.
