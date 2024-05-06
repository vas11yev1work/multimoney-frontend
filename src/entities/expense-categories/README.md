# expense-categories

Эта сущность представляет собой категории расходов, созданные пользователем

```typescript
interface ExpenseCategoryModel {
  categories: SharedData<ExpenseCategory[]>;
}
```

```typescript
export interface ExpenseCategory {
  id: string;
  name: string;
  icon: string;
  limit?: AmountModel;
}
```

`limit` - лимит категории в основной валюте пользователя
