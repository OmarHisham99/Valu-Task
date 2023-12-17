import { Component } from '@angular/core';
import { TranslationService } from '../../Translation-Service/translation.service';
@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  // ***************** Variables ***************** //
  // ***************** Constructor ***************** //
  constructor(private translationService: TranslationService) {}
  // ***************** Functions ***************** //
  toggleLanguage(): void {
    const currentLanguage = this.translationService.getCurrentLanguage();
    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    this.translationService.setLanguage(newLanguage);
  }
}
