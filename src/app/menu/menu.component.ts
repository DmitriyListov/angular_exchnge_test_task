import { Component, EventEmitter, Input, Output} from '@angular/core';
import {CoinInfo} from "../types/type";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  @Input() coinsInfo: CoinInfo[] = [];
  @Output() newItemEvent = new EventEmitter<string>();

  selected({target}: Event) {
    const id: string = (target as HTMLElement).id
    this.newItemEvent.emit(id);
  }
}
