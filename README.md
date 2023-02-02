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
