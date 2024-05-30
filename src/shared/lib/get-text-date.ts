import dayjs from 'dayjs';

export const getTextDate = (date: dayjs.Dayjs): string => {
  const today = dayjs().startOf('day');
  const targetDate = date.startOf('day');
  const diffDays = targetDate.diff(today, 'day');

  switch (diffDays) {
    case -2:
      return 'Позавчера';
    case -1:
      return 'Вчера';
    case 0:
      return 'Сегодня';
    case 1:
      return 'Завтра';
    case 2:
      return 'Послезавтра';
    default:
      return targetDate.format('D MMM YYYY');
  }
};
