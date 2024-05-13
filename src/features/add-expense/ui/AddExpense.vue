<template>
  <form class="flex flex-col gap-3" @submit="onSubmit">
    <UiFakeInput v-slot="slotProps" label="Выберите счет" name="cardId" required @click="showCardModal = true">
      {{ cardsModel.cardsMapById.get(slotProps.value)?.name ?? '' }}
      {{ cardsModel.cardsMapById.get(slotProps.value)?.label ?? '' }}
    </UiFakeInput>
    <UiFakeInput
      v-slot="slotProps"
      label="Выберите категорию"
      name="categoryId"
      required
      @click="showCategoryModal = true"
    >
      {{ expenseCategoriesModel.categoriesMapById.get(slotProps.value)?.name ?? '' }}
    </UiFakeInput>
    <UiInput
      label="Сумма"
      name="currencyAmount"
      :hint="`Введите сумму в валюте счета ${cardCurrency ? `(${getCurrencyName(cardCurrency)})` : ''}`"
      type="number"
      required
    />
    <UiFakeInput label="Дата" required name="date" @click="showDateModal = true">
      {{ dayjs(values.date).format('DD MMMM YYYY') }}
    </UiFakeInput>
    <UiInput label="Описание" name="description" />

    <UiButton type="submit" size="large" class="sticky bottom-4 mt-2">Добавить расход</UiButton>

    <SelectCardModal v-model="showCardModal" @select-card="onCardSelect" />
    <SelectExpenseCategoryModal v-model="showCategoryModal" @select-category="onCategorySelect" />
    <UiDatepickerModal v-model:show="showDateModal" v-model="dateValue" :max-date="dayjs()" />
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import dayjs from 'dayjs';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { useCardsModel, SelectCardModal } from '@/entities/cards';
import { useExpenseCategoriesModel, SelectExpenseCategoryModal } from '@/entities/expense-categories';
import { getCurrencyName } from '@/shared/lib';
import { UiButton, UiDatepickerModal, UiFakeInput, UiInput } from '@/shared/ui';
import { validationSchema } from '../model';

const cardsModel = useCardsModel();
const expenseCategoriesModel = useExpenseCategoriesModel();

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: toTypedSchema(validationSchema),
  initialValues: {
    currencyAmount: undefined,
    description: undefined,
    date: dayjs().toISOString(),
    cardId: undefined,
    categoryId: undefined,
  },
});

const showCardModal = ref(false);
const showCategoryModal = ref(false);
const showDateModal = ref(false);

const cardCurrency = computed(() => {
  if (!values.cardId) return;
  const card = cardsModel.cardsMapById.get(values.cardId);
  if (!card) return;
  return card.currencyBalance.currency;
});

const dateValue = computed({
  get: () => dayjs(values.date),
  set: (value: dayjs.Dayjs) => setFieldValue('date', value.toISOString()),
});

function onCardSelect(cardId: string) {
  setFieldValue('cardId', cardId);
}

function onCategorySelect(categoryId: string) {
  setFieldValue('categoryId', categoryId);
}

const onSubmit = handleSubmit(values => {
  console.log(values);
});
</script>
