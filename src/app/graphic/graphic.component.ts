import {Component, Input, OnInit, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, DoCheck} from '@angular/core';
import {CoinRate} from "../types/type";

import {
  select,
  Selection,
  axisBottom,
  axisLeft,
  scaleTime,
  line,
  scaleLinear,
  timeFormat,
  curveCatmullRom
} from "d3";

interface Margin {
  top: number,
  right: number,
  bottom: number,
  left: number
};

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphicComponent implements OnInit, OnChanges, DoCheck {

  private _coinRate: CoinRate[] = [];
  get coinRate(): CoinRate[] {
    return this._coinRate;
  }

  @Input() set coinRate(rate: CoinRate[]) {
    [...this._coinRate] = [...rate];
  }

  constructor(private cdr: ChangeDetectorRef) {
  }

  private svg!: Selection<any, any, any, any>;
  private margin: Margin = {top: 50, right: 50, bottom: 50, left: 50};
  private width: number = 650;
  private height: number = 350;
  private innerWidth = this.width - this.margin.left;
  private innerHeight = this.height - this.margin.top;

  ngOnInit(): void {

  }

  createSVG(): void {
    this.svg = select("#svg-container")
      .append('svg')
      .attr('width', this.innerWidth + this.margin.left + this.margin.right)
      .attr('height', this.innerHeight + this.margin.top + this.margin.bottom)
      .append("g")
      .attr('transform', `translate(${this.margin.left / 2} , ${this.margin.top})`).call(g => g.append("text")
        .attr("x", `${this.margin.left}`)
        .attr("y", -20)
        .text("↑ Rate at last 30 days ($)"));
  };

  draw(coinsRateData:CoinRate[]): void {

    const minDate = Math.min(...coinsRateData.map((item: CoinRate) => (item.date as number)));
    const maxDate = Math.max(...coinsRateData.map((item: CoinRate) => (item.date as number)));
    const minRate = Math.min(...coinsRateData.map((item: CoinRate) => (item.rate as number)));
    const maxRate = Math.max(...coinsRateData.map((item: CoinRate) => (item.rate as number)));

    const formatTime = timeFormat("%d.%m");
    const tickValuesForAxis = coinsRateData.map(d => new Date(d.date));

    const xScale = scaleTime()
      .domain([minDate, maxDate])
      .range([0, this.innerWidth])
      .nice();

    const xAxis = axisBottom(xScale)
      .tickValues(tickValuesForAxis)
      .tickFormat(function (d) {
        return formatTime(<Date>d);
      })

    const yScale = scaleLinear()
      .domain([minRate, maxRate])
      .range([this.innerHeight, 0])
      .nice()

    const yAxis = axisLeft(yScale)


    const createLine = line()
      .context(null)
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1]))
      .curve(curveCatmullRom.alpha(0.5));

    const lineData = coinsRateData.map((item) => {
      return [item.date, item.rate]
    });

    this.svg.append('path')
      .attr('stroke', 'green')
      .attr('stroke-width', '2')
      .attr('fill', 'none')
      .style("opacity", .4)
      // @ts-expect-error
      .attr('d', createLine([...lineData]))
      .attr('transform', `translate(${this.margin.left}, 0)`);

    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(yAxis)


    this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.height - this.margin.top})`)
      .call(xAxis)
      .selectAll('text')
      .attr('transform', "rotate(-50)")
      .attr("dx", "-25px")
      .attr("dy", "10px")

    const dots = this.svg.append('g')
    dots.selectAll('circle')
      .data(coinsRateData)
      .enter()
      .append('circle')
      .attr("cx", d => xScale(+d.date))
      .attr("cy", d => yScale(+d.rate))
      .attr('transform', `translate(${this.margin.left},0)`)
      .attr("r", 4)
      .style("opacity", .9)
      .style("fill", "#495fff");
  }

  flag: boolean = false;

  ngOnChanges(): void {

  }

  ngDoCheck() {
    select('svg').remove();
    this.createSVG();
    if (!this.coinRate.length) {
      return
    }
    this.draw(this.coinRate);
    this.flag = true
  }
}
