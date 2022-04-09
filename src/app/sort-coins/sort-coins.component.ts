import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CoinRate} from "../types/type";

@Component({
  selector: 'app-sort-coins',
  templateUrl: './sort-coins.component.html',
  styleUrls: ['./sort-coins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortCoinsComponent {
  constructor() {
  }

  @Input() coinRate: CoinRate[] = [];

  directionDate: boolean = false;

  sortByDate(): void {
    this.directionDate = !this.directionDate;
    this.coinRate.sort((a: CoinRate, b: CoinRate): number => {
      if (this.directionDate) {
        return (b.date as number) - (a.date as number)
      } else {
        return (a.date as number) - (b.date as number)
      }
    });
  };

  directionRate: boolean = false;

  sortByRate(): void {
    this.directionRate = !this.directionRate;
    this.coinRate.sort((a: CoinRate, b: CoinRate): number => {
      if (this.directionRate) {
        return (b.rate as number) - (a.rate as number)
      } else {
        return (a.rate as number) - (b.rate as number)
      }
    });
  };

  sort(event: Event): void {
    const paramName = (event.target as HTMLElement).id;
    paramName === 'date' ? this.sortByDate() : this.sortByRate()
  }

}
