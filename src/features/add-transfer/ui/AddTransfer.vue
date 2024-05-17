<template>
  <form class="flex flex-col gap-3" @submit="onSubmit">
    <UiFakeInput
      v-slot="slotProps"
      label="Выберите счет списания"
      name="cardId"
      required
      @click="showFromCardModal = true"
    >
      {{ cardsModel.cardsMapById.get(slotProps.value)?.name ?? '' }}
      {{ cardsModel.cardsMapById.get(slotProps.value)?.label ?? '' }}
    </UiFakeInput>
    <UiInput
      label="Сумма списания"
      name="currencyAmount"
      :hint="`Введите сумму в валюте счета списания ${fromCardCurrency ? `(${getCurrencyName(fromCardCurrency)})` : ''}`"
      type="number"
      required
    />

    <div class="flex items-center justify-center">
      <hr class="w-full" />
      <div
        class="mx-3 flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-white shadow-md shadow-slate-300"
      >
        <UiIcon icon-name="faArrowDown" />
      </div>
      <hr class="w-full" />
    </div>

    <UiFakeInput
      v-slot="slotProps"
      label="Выберите счет пополнения"
      name="toCardId"
      required
      @click="showToCardModal = true"
    >
      {{ cardsModel.cardsMapById.get(slotProps.value)?.name ?? '' }}
      {{ cardsModel.cardsMapById.get(slotProps.value)?.label ?? '' }}
    </UiFakeInput>
    <UiInput
      label="Сумма пополнения"
      name="toCurrencyAmount"
      :hint="`Введите сумму в валюте счета пополнения ${toCardCurrency ? `(${getCurrencyName(toCardCurrency)})` : ''}`"
      type="number"
      required
    />

    <UiFakeInput label="Дата" required name="date" @click="showDateModal = true">
      {{ dayjs(values.date).format('DD MMMM YYYY') }}
    </UiFakeInput>
    <UiInput label="Описание" name="description" />

    <UiButton type="submit" size="large" class="sticky bottom-4 mt-2">Добавить расход</UiButton>

    <SelectCardModal v-model="showFromCardModal" @select-card="onCardSelect('from', $event)" />
    <SelectCardModal v-model="showToCardModal" @select-card="onCardSelect('to', $event)" />
    <UiDatepickerModal v-model:show="showDateModal" v-model="dateValue" :max-date="dayjs()" />
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import dayjs from 'dayjs';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { useCardsModel, SelectCardModal } from '@/entities/cards';
import { getCurrencyName } from '@/shared/lib';
import { UiButton, UiDatepickerModal, UiFakeInput, UiIcon, UiInput } from '@/shared/ui';
import { validationSchema } from '../model';

const cardsModel = useCardsModel();

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: toTypedSchema(validationSchema),
  initialValues: {
    currencyAmount: undefined,
    description: undefined,
    date: dayjs().toISOString(),
    cardId: undefined,
    toCardId: undefined,
    toCurrencyAmount: undefined,
  },
});

const showFromCardModal = ref(false);
const showToCardModal = ref(false);
const showDateModal = ref(false);

const fromCardCurrency = computed(() => {
  if (!values.cardId) return;
  const card = cardsModel.cardsMapById.get(values.cardId);
  if (!card) return;
  return card.currencyBalance.currency;
});

const toCardCurrency = computed(() => {
  if (!values.toCardId) return;
  const card = cardsModel.cardsMapById.get(values.toCardId);
  if (!card) return;
  return card.currencyBalance.currency;
});

const dateValue = computed({
  get: () => dayjs(values.date),
  set: (value: dayjs.Dayjs) => setFieldValue('date', value.toISOString()),
});

function onCardSelect(p: 'to' | 'from', cardId: string) {
  const field = p === 'to' ? 'toCardId' : 'cardId';
  setFieldValue(field, cardId);
}

const onSubmit = handleSubmit(values => {
  console.log(values);
});
</script>
