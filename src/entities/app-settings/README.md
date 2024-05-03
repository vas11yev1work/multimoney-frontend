# app-settings

Эта сущность предназначена для хранения настроек приложения

```typescript
interface AppSettingsModel {
  userCurrencies: SharedData<CurrencyType[]>;
  selectedCurrency: Currency | CurrencyType;
  mainCurrency: SharedData<Currency | CurrencyType>;
}
```

`userCurrencies` - список валют, которые выбрал пользователь

`selectedCurrency` - выбранная валюта

`mainCurrency` - основная валюта приложения
