import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-json-input',
  templateUrl: './json-input.component.html',
  styleUrls: ['./json-input.component.css']
})
export class JsonInputComponent {
  jsonInput: string = '';
  jsonError: string = '';
  @Output() dataChange = new EventEmitter<any>();
  validateJson(): boolean {
    try {
      JSON.parse(this.jsonInput);
      return true;
    } catch (e) {
      this.jsonError = 'Invalid JSON format';
      return false;
    }
  }

  renderGraph() {
    if (this.validateJson()) {
      this.jsonError = '';
      const parsedData = JSON.parse(this.jsonInput);
      // Emit the parsed data to the parent component
      // Assuming a service or event emitter is used to pass data
      this.dataChange.emit(parsedData);
    }
  }
}
