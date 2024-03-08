<template>
  <form class="flex flex-col gap-3" @submit="onSubmit">
    <UiInput label="Название" required name="name" />
    <UiInput label="Последние 4 цифры" name="label" hint="Поможет вам визуально отличить счета" type="number" />
    <UiSelect label="Валюта" required :options="currencies" name="currency" />
    <UiInput
      label="Начальный баланс"
      name="initialBalance"
      hint="Рассчет будет идти исходя начального баланса счета"
      type="number"
      required
    />
    <CardColorSelect name="color" />
    <UiButton size="large" class="mt-3" type="submit">Сохранить</UiButton>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import { CardColor } from '@/shared/api';
import { Currency, getCurrencyName } from '@/shared/lib';
import { CardColorSelect, UiButton, UiInput, UiSelect } from '@/shared/ui';
import { validationSchema } from '../model';

const currencies = computed(() => {
  const arr = [];
  for (const curr in Currency) {
    const currency = Currency[curr as keyof typeof Currency];
    arr.push({
      value: currency,
      text: currency + ` - ${getCurrencyName(currency)}`,
    });
  }
  return arr;
});

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(validationSchema),
  initialValues: {
    name: '',
    label: undefined,
    initialBalance: undefined,
    color: CardColor.Slate,
    currency: undefined,
  },
});

const onSubmit = handleSubmit(values => {
  console.log(values);
});
</script>
