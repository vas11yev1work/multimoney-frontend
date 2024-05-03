<template>
  <form class="flex flex-col gap-3" @submit="onSubmit">
    <UiInput label="Название категории" name="name" required />
    <UiInput
      label="Лимит"
      name="limit"
      type="number"
      :hint="`Необходимо указать лимит в главной выбранной валюте (${mainCurrency.data})`"
    />
    <ExpenseIconSelect name="icon" />
    <UiButton type="submit" size="large" class="sticky bottom-4 mt-2">Добавить</UiButton>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { useAppSettingsModel } from '@/entities/app-settings';
import { UiButton, UiInput, ExpenseIconSelect } from '@/shared/ui';
import { validationSchema } from '../model';

const { mainCurrency } = useAppSettingsModel();

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(validationSchema),
  initialValues: {
    name: '',
    limit: undefined,
    icon: 'faHouse',
  },
});

const onSubmit = handleSubmit(values => {
  console.log(values);
});
</script>
