import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, provideApiConfig } from './app/app.config';
import { App } from './app/app';

async function startApp() {
  try {
    const apiConfig = await provideApiConfig();

    await bootstrapApplication(App, {
      ...appConfig,
      providers: [
        apiConfig,
        ...appConfig.providers
      ]
    });
  } catch (err) {
    console.error(err)
  }
}

startApp();