import {Injectable} from '@angular/core';
import {CoinRate} from "../types/type";

@Injectable()
export class SortCoinsComponent {
  constructor() {
  }

  directionDate: boolean = false;

  sortByDate(arrayRates: CoinRate[]): CoinRate[] {
    this.directionDate = !this.directionDate;
    return arrayRates.sort((a: CoinRate, b: CoinRate): number => {
      if (this.directionDate) {
        return (b.date as number) - (a.date as number)
      } else {
        return (a.date as number) - (b.date as number)
      }
    });
  };

  directionRate: boolean = false;

  sortByRate(arrayRates: CoinRate[]): CoinRate[] {
    this.directionRate = !this.directionRate;
    return arrayRates.sort((a: CoinRate, b: CoinRate): number => {
      if (this.directionRate) {
        return (b.rate as number) - (a.rate as number)
      } else {
        return (a.rate as number) - (b.rate as number)
      }
    });
  };

  sort(sortedType: string, arrayRates: CoinRate[]): CoinRate[] {
    return sortedType === 'date' ? this.sortByDate(arrayRates) : this.sortByRate(arrayRates)
  }
}
