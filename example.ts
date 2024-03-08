interface AmountModel {
  amount: number;
  currency: string;
}

// /lib/v1/info
export interface MainInfo {
  total: AmountModel;
  incomes: AmountModel;
  expenses: AmountModel;
}

// /lib/v1/accounts
export interface Account {
  id: string;
  name: string;
  label?: string;
  balance: AmountModel;
  currencyBalance: AmountModel;
}
