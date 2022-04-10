import {ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {CoinInfo, CoinRate, CurrentCoinInfo, RequestState} from "./types/type";
import {HttpServiceComponent} from './servises/http-service/http-service.component';
import {CreateCSVComponent} from "./servises/create-csv/create-csv.component";
import {SortCoinsComponent} from "./sort-coins/sort-coins.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpServiceComponent, CreateCSVComponent, SortCoinsComponent],
})
export class AppComponent implements OnInit, OnChanges, DoCheck {

  constructor(
    private httpService: HttpServiceComponent,
    private cdr: ChangeDetectorRef,
    private CSV: CreateCSVComponent,
    private sortComponent: SortCoinsComponent) {
  };


  coinsInfo: CoinInfo[] = [];
  coinRate: CoinRate[] = [];
  coinInfoHeader: CurrentCoinInfo = {};
  errorState: RequestState = {};
  loading: boolean = true;

  async ngOnInit(): Promise<void> {
    this.loadCoinsInfo();
    this.loadCurrentRate('bitcoin');
    this.getTableHeaderInfo('bitcoin');
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

  loadCoinsInfo(): void {
    this.httpService.getCoinsInfo().subscribe({
      next: ((data) => {
        [...this.coinsInfo] = [...data];
      }),
      error: (err) => {
        this.errorState.state = !err.ok;
        this.errorState.message = err.message
      },
      complete: () => {
        this.loading = false;
        this.getTableHeaderInfo('bitcoin')
      }
    })
  };

  loadCurrentRate(id: string): void {
    this.loading = true;
    this.httpService.getCoinsRate(id).subscribe({
      next: (data => {
        [...this.coinRate] = [...data];
      }),
      error: (err) => {
        this.errorState.state = !err.ok;
        this.errorState.message = err.message
      },
      complete: () => {
        this.loading = false;
      }
    })
  } ;

  ngOnChanges() {
  } ;

  ngDoCheck() {

  } ;

  public  getIdCoin(id: string): void {
    this.loadCurrentRate(id)
    this.getTableHeaderInfo(id);
  }

  toggle: boolean = false;

  sort(sortedType: string): void {
    [...this.coinRate] = [...this.sortComponent.sort(sortedType, this.coinRate)]
  }

  showMenu(): void {
    this.toggle = !this.toggle
  }

  downloadCSV(): void {
    this.CSV.exportTableToCSV();
  }
}

