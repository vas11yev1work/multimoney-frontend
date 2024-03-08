import { CardColor } from '../api';

export const getCardColor = (color?: CardColor) => {
  if (!color) {
    return 'bg-slate-700';
  }
  switch (color) {
    case CardColor.Slate:
      return 'bg-slate-700';
    case CardColor.Red:
      return 'bg-red-500';
    case CardColor.Orange:
      return 'bg-orange-500';
    case CardColor.Amber:
      return 'bg-amber-500';
    case CardColor.Lime:
      return 'bg-lime-500';
    case CardColor.Emerald:
      return 'bg-emerald-500';
    case CardColor.Cyan:
      return 'bg-cyan-500';
    case CardColor.Blue:
      return 'bg-blue-500';
    case CardColor.Indigo:
      return 'bg-indigo-500';
    case CardColor.Violet:
      return 'bg-violet-500';
    case CardColor.Pink:
      return 'bg-pink-500';
    case CardColor.Rose:
      return 'bg-rose-500';
    default:
      return 'bg-slate-700';
  }
};
