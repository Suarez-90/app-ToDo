import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import { HomeComponent } from './app/components/home/home.component';
// import { bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}
// bootstrapApplication(HomeComponent);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
