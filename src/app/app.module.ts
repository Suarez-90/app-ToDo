import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { TodoComponent } from './components/todo/todo.component';
import { FlexLayoutModule } from '@angular/flex-layout';

function inicializeApp(): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, 3000))
}

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule

  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: () => inicializeApp,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
