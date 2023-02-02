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
