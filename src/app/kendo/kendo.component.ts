import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kendo',
  templateUrl: './kendo.component.html',
  styleUrls: ['./kendo.component.css']
})
export class KendoComponent {
  @Input() kendoName!: string;
  @Input() location!: string;

  onButtonClick(): void {
    console.log('Kendo Button clicked!');
  }
}
