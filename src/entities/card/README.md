# card

Эта сущность представляет собой счет пользователя (банковская карта, наличные, счет)

```typescript
interface CardModel {
  cards: SharedData<Card[]>;
}
```
Баланс карты представлен в двух валютах: валюта карты и основная валюта пользователя

```typescript
export interface Card {
  id: string;
  color: CardColor;
  name: string;
  label?: string;
  balance: AmountModel; // баланс в основной валюте
  currencyBalance: AmountModel; // баланс в валюте карты
}
```

