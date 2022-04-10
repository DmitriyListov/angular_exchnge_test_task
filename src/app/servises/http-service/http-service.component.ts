import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, catchError, tap} from "rxjs";
import {CoinInfo, CoinRate, MonthlyRate, Prices} from "../../types/type";

@Injectable()
export class HttpServiceComponent implements OnInit {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void {
  }
  getDate(timestamp: string | number): string {
    return new Date(timestamp).toLocaleDateString();
  };

  getCoinsInfo(): Observable<CoinInfo[]> {
    return this.http.get<CoinInfo[]>('https://api.coingecko.com/api/v3/coins', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .pipe(map((data): CoinInfo[] => {

        return data.map((item): CoinInfo => {
          return {
            id: item.id,
            name: item.name,
            image: {
              thumb: item.image.thumb,
              small: item.image.small,
              large: item.image.large
            }
          }
        })
      }))
  };

  getCoinsRate(id: string): Observable<CoinRate[]> {
    return this.http.get<MonthlyRate>(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .pipe(map((data: MonthlyRate) => {
        return data.prices.map((priceItem): CoinRate => {
          return {
            date: priceItem[0],
            rate: Number(priceItem[1].toFixed(3)),
            dateToLocalString: this.getDate(priceItem[0])
          }
        }).slice(0, data.prices.length - 1);
      }))
  };
}
