import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { JsonInputComponent } from './components/json-input/json-input.component';
import { GraphRendererComponent } from './components/graph-renderer/graph-renderer.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    JsonInputComponent,
    GraphRendererComponent,
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [MatCardModule, MatButtonModule, MatGridListModule,MatSidenavModule,MatToolbarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
