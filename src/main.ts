import { bootstrapApplication } from '@angular/platform-browser';
<<<<<<< HEAD
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
=======
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
>>>>>>> upstream/master

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
