export interface CoinRate {
  date: number| string,
  rate: number| string,
  dateToLocalString: string;
};

export interface Coin {
  id: string,
  logo?: string,
  name: string,
}

export interface CoinInfo {
  id: string,
  image: {
    thumb: string,
    small: string,
    large: string
  },
  name: string;
}

type CoinPrise = Array<number>
export type  Prices = Array<CoinPrise>;

export interface MonthlyRate {
  market_caps?: Prices;
  prices: Prices;
  total_volumes?: Prices
}

export interface CurrentCoinInfo {
  name?: string,
  logo?: string,
}

export interface RequestState {
  message?: string | null,
  state?: boolean | null
}

// console.log(this.coinsInfo)
// this.httpClient.get<CoinInfo[]>(this.baseUrl).subscribe((data) => {
//   this.coinsInfo = data.map((coin): Coin => {
//     return {
//       id: coin.id,
//       name: coin.name,
//       logo: coin.image.thumb
//     }
//   });
// });

// this.httpClient.get<MonthlyRate>(rateUrl).subscribe(coin => {
//   this.coinRate = coin.prices.map((item): CoinRate => {
//     return {
//       date: item[0],
//       rate: item[1].toFixed(2),
//       dateToLocalString: this.getDate(item[0])
//     }
//   })
// });

// this.coinRate = (await getResponse(url).catch(data=>console.log(data)) as MonthlyRate).prices.map((priceInfo): CoinRate => {
//   return {
//     date: priceInfo[0],
//     rate: Number(priceInfo[1].toFixed(3)),
//     dateToLocalString: this.getDate(priceInfo[0])
//   }
// });
