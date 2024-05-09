import dayjs from 'dayjs';

export interface Props {
  modelValue?: dayjs.Dayjs;
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
}
