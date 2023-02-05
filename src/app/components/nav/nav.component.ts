import { Component } from '@angular/core';

import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(
    private storeService: StoreService
  ) {}

  counter: number = 0;

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  activeMenu: boolean = false;

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
}
