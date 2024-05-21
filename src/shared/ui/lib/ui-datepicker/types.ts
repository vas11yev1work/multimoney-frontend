import dayjs from 'dayjs';

export type DatepickerModel = dayjs.Dayjs | [dayjs.Dayjs | undefined, dayjs.Dayjs | undefined];

export interface Props {
  modelValue?: DatepickerModel;
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
  range?: boolean;
}
