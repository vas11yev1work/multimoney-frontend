import { Currency, CurrencyType } from './types';

export const getCurrencyName = (currency?: Currency | CurrencyType) => {
  if (!currency) {
    return '';
  }
  switch (currency) {
    case 'USD':
    case Currency.Dollar:
      return 'Доллар';
    case 'EUR':
    case Currency.Euro:
      return 'Евро';
    case 'RUB':
    case Currency.Ruble:
      return 'Рубль';
    case 'KZT':
    case Currency.Tenge:
      return 'Тенге';
    case 'AMD':
    case Currency.ArmenianDram:
      return 'Армянский драм';
    case 'AUD':
    case Currency.AustralianDollar:
      return 'Австралийский доллар';
    case 'AZN':
    case Currency.AzerbaijaniManat:
      return 'Азербайджанский манат';
    case 'THB':
    case Currency.Baht:
      return 'Тайский бат';
    case 'BYN':
    case Currency.BelarusianRuble:
      return 'Белорусский рубль';
    case 'BRL':
    case Currency.BrazilianReal:
      return 'Бразильский реал';
    case 'CAD':
    case Currency.CanadianDollar:
      return 'Канадский доллар';
    case 'AED':
    case Currency.Dirham:
      return 'Дирхам';
    case 'GEL':
    case Currency.GeorgianLari:
      return 'Грузинский лари';
    case 'HKD':
    case Currency.HongKongDollar:
      return 'Гонконгский доллар';
    case 'UAH':
    case Currency.Hryvnia:
      return 'Гривна';
    case 'INR':
    case Currency.IndianRupee:
      return 'Индийская рупия';
    case 'IDR':
    case Currency.IndonesianRupiah:
      return 'Индонезийская рупия';
    case 'IRR':
    case Currency.IranianRial:
      return 'Иранский риал';
    case 'ILS':
    case Currency.IsraeliShekel:
      return 'Израильский шекель';
    case 'KGS':
    case Currency.KyrgyzstanSom:
      return 'Киргизский сом';
    case 'MYR':
    case Currency.MalaysianRinggit:
      return 'Малайзийский ринггит';
    case 'MXN':
    case Currency.MexicanPeso:
      return 'Мексиканское песо';
    case 'MNT':
    case Currency.MongolianTugrik:
      return 'Монгольский тугрик';
    case 'TMT':
    case Currency.NewTurkmenManat:
      return 'Новый туркменский манат';
    case 'GBP':
    case Currency.Pound:
      return 'Фунт стерлингов';
    case 'SAR':
    case Currency.SaudiRiyal:
      return 'Саудовский риял';
    case 'RSD':
    case Currency.SerbianDinar:
      return 'Сербский динар';
    case 'SGD':
    case Currency.SingaporeDollar:
      return 'Сингапурский доллар';
    case 'ZAR':
    case Currency.SouthAfricanRand:
      return 'Южноафриканский рэнд';
    case 'LKR':
    case Currency.SriLankanRupee:
      return 'Шри-ланкийская рупия';
    case 'CHF':
    case Currency.SwissFranc:
      return 'Швейцарский франк';
    case 'TJS':
    case Currency.TajikistaniSomoni:
      return 'Таджикский сомони';
    case 'TRY':
    case Currency.TurkishLira:
      return 'Турецкая лира';
    case 'UZS':
    case Currency.UzbekSum:
      return 'Узбекский сум';
    case 'VND':
    case Currency.VietnameseDong:
      return 'Вьетнамский донг';
    case 'KRW':
    case Currency.Won:
      return 'Вон';
    case 'JPY':
    case Currency.Yen:
      return 'Иена';
    case 'CNY':
    case Currency.YuanRenminbi:
      return 'Юань';
  }
};
