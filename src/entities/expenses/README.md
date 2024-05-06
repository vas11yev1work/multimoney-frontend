# expenses

Эта сущность предназначена для хранения информации о расходах за текущий месяц.

```typescript
interface ExpensesModel {
  expenses: SharedData<Expense[]>;
}
```

```typescript
interface Expense {
  id: string;
  amount: AmountModel; // сумма в основной валюте
  currencyAmount: AmountModel; // сумма в валюте карты
  description?: string;
  date: string;
  cardId: string;
  categoryId: string;
}
```
