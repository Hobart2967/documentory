import { injectable } from 'inversify';
import { TranslationTable, translations } from './../configuration/translations';

@injectable()
export class TranslationService {
  private readonly _locale = 'en';

  public translate(key: keyof TranslationTable): string {
    return translations[this._locale][key];
  }
}