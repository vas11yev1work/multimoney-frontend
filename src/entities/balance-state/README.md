# balance-state

Эта сущность представляет собой состояние баланса пользователя

```typescript
interface BalanceStateModel {
  balanceState: SharedData<BalanceState>;
}
```

`balanceState` - состояние баланса пользователя, содержит следующие поля:

```typescript
interface BalanceState {
  total: Partial<Record<Currency, AmountModel>>;
  incomes: Partial<Record<Currency, AmountModel>>;
  expenses: Partial<Record<Currency, AmountModel>>;
}
```
Каждое поле представляет собой объект, где сумма конвертирована в выбранные валюты

