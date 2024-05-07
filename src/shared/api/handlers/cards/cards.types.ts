import { AmountModel } from '@/shared/lib';

export enum CardColor {
  Slate = 'SLATE',
  Red = 'RED',
  Orange = 'ORANGE',
  Amber = 'AMBER',
  Lime = 'LIME',
  Emerald = 'EMERALD',
  Cyan = 'CYAN',
  Blue = 'CLUE',
  Indigo = 'INDIGO',
  Violet = 'VIOLET',
  Pink = 'PINK',
  Rose = 'ROSE',
}

export interface Card {
  id: string;
  color: CardColor;
  name: string;
  label?: string;
  balance: AmountModel;
  currencyBalance: AmountModel;
}
