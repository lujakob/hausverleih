import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarTopComponent } from './components/toolbar-top/toolbar-top.component';
import { MatMenuModule, MatToolbarModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
