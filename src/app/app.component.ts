import {ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {CoinInfo, CoinRate, CurrentCoinInfo, RequestState} from "./types/type";
import {HttpClient} from '@angular/common/http';
import {of} from "rxjs";
import {HttpServiceComponent} from './servises/http-service/http-service.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpServiceComponent],
})

export class AppComponent implements OnInit, OnChanges, DoCheck {
  private _httpClient: HttpClient;

  constructor(private httpClient: HttpClient, private httpService: HttpServiceComponent, private cdr: ChangeDetectorRef) {
    this._httpClient = httpClient;
  };


  coinsInfo: CoinInfo[] = [];
  coinRate: CoinRate[] = [];
  coinInfoHeader: CurrentCoinInfo = {};
  errorState: RequestState = {};
  loading: boolean = true;


  async ngOnInit(): Promise<void> {

    this.loadCurrentRate('bitcoin');
    await this.loadCoinsInfo();
    this.getTableHeaderInfo('bitcoin')

  }

  getTableHeaderInfo(id: string): void {
    for (let index in this.coinsInfo) {
      if (this.coinsInfo[index].id === id) {
        this.coinInfoHeader = {
          name: this.coinsInfo[index].name,
          logo: this.coinsInfo[index].image.large,
        }
      }
    }
  };

  async loadCoinsInfo(): Promise<void> {
    return new Promise(resolve => {
      of(this.httpService.getCoinsInfo()).subscribe({

        next: (data) => {
          data.subscribe(
            value => {
              resolve();
              return [...this.coinsInfo] = [...value];
            })
        },

        error: (err) => {
          this.errorState.state = !err.ok
          this.errorState.message = err.message
        },

        complete: () => {
          this.loading = false;
        }
      });
    });
  };

  loadCurrentRate(id: string) {
    of(this.httpService.getCoinsRate(id)).subscribe({
      next: (data) => data.subscribe(value => [...this.coinRate] = [...value],),
      error: (err) => {
        this.errorState.state = !err.ok
        this.errorState.message = err.message
      },
      complete: () => {
        this.loading = false;
      }
    });
  };

  ngOnChanges() {

  };

  ngDoCheck() {

  };

  public async getIdCoin(id: string): Promise<void> {
    this.loadCurrentRate(id);
    this.getTableHeaderInfo(id);
  }

  toggle: boolean = false;

  showMenu(): void {
    this.toggle = !this.toggle
  }
}

