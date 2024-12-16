// select.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.page.html',
  styleUrls: ['./select.page.scss'],
})
export class SelectPage {
  constructor(private router: Router) {}

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
