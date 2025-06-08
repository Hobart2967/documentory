export interface TranslationTable {
  QuickAccess: string;
  Computer: string;
  Network: string;
}

export const translations: { [locale: string]: TranslationTable } = {
  en: {
    QuickAccess: 'Quick Access',
    Computer: 'This Mac',
    Network: 'Network'
  }
};