# app-settings

Эта сущность предназначена для хранения настроек приложения

```typescript
interface AppSettingsModel {
  selectedCurrency: Currency | CurrencyType;
}
```

`userCurrencies` - список валют, которые выбрал пользователь

`selectedCurrency` - выбранная валюта

`mainCurrency` - основная валюта приложения
