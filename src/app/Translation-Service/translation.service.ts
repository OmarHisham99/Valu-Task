import { Injectable, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  // **************** Constructor ***************
  constructor(
    private translate: TranslateService,
    private titleService: Title
  ) {}

  // **************** Functions ***************
  setLanguage(language: string): void {
    this.translate.use(language);
    this.titleService.setTitle('Valu Task');
  }
  getCurrentLanguage(): string {
    return this.translate.currentLang || 'en';
  }
}
