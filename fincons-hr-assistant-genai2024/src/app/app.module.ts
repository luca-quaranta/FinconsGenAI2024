import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { JsonInputComponent } from './components/json-input/json-input.component';
import { GraphRendererComponent } from './components/graph-renderer/graph-renderer.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    JsonInputComponent,
    GraphRendererComponent,
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    FormsModule
  ],
  exports:[MatCardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
