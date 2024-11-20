import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'fincons-hr-assistant-genai2024';
  jsonData: any;

  updateGraphData(data: any) {
    this.jsonData = data;
  }
}
