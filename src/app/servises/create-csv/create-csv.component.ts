import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-csv',
  templateUrl: './create-csv.component.html',
  styleUrls: ['./create-csv.component.scss']
})
export class CreateCSVComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  exportTableToCSV  () :void {
    let csv = [];
    const rows = document.querySelectorAll(".list");

    for (let i = 0; i < rows.length; i++) {
      let row = [];
      let cols = rows[i].querySelectorAll(".list li");

      for (let j = 0; j < cols.length; j++)
        row.push((cols[j] as HTMLElement).innerText);
      csv.push(row.join("\t"));

    }
    ;
    this.downloadCSV(csv.join("\n"));
    console.log('csv: ', csv);

  }

  downloadCSV  (csv: any):void {

    const csvFile = new Blob([csv], {type: "text/csv"});

    const downloadLink = document.createElement("a");

    downloadLink.download = 'file';

    downloadLink.href = window.URL.createObjectURL(csvFile);

    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);

    downloadLink.click();
    downloadLink.remove()
  }
// document.querySelector('button').addEventListener('click', () => exportTableToCSV('coins'));









}
