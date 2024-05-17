<template>
  <UiModal v-model="value" title="Детали счета">
    <template #additional-icons>
      <button type="button" class="h-8 w-8 text-slate-400" @click="viewCardEdit = true">
        <UiIcon icon-name="faGears" size="lg" />
      </button>
    </template>
    <div class="mb-3">
      <UiTypo class="font-medium text-slate-500" level="5">Баланс</UiTypo>
      <UiMoney :value="cardBalance" :currency="mainCurrency" type="heading" class="font-semibold" />
      <UiMoney
        v-if="mainCurrency !== cardCurrency"
        :value="cardCurrencyBalance"
        :currency="cardCurrency"
        level="5"
        class="font-semibold"
      />
    </div>
    <div class="flex flex-col gap-3">
      <UiTextBlock :text="cardName" title="Имя счета" />
      <UiTextBlock :text="getCurrencyName(cardCurrency)" title="Валюта счета" />
    </div>
    <UiModal v-model="viewCardEdit" title="Редактировать карту">
      <slot />
    </UiModal>
  </UiModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Card } from '@/shared/api';
import { getCurrencyName } from '@/shared/lib';
import { UiIcon, UiModal, UiMoney, UiTextBlock, UiTypo } from '@/shared/ui';

const props = withDefaults(
  defineProps<{
    card?: Card;
  }>(),
  {
    card: undefined,
  }
);

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const viewCardEdit = ref(false);

const cardName = computed(() => {
  if (!props.card) {
    return '';
  }
  return `${props.card.name} ${props.card.label ? `** ${props.card.label}` : ''}`;
});
const cardCurrency = computed(() => props.card?.currencyBalance.currency ?? 'EUR');
const cardBalance = computed(() => props.card?.balance.amount ?? 0);
const cardCurrencyBalance = computed(() => props.card?.currencyBalance.amount ?? 0);
const mainCurrency = computed(() => props.card?.balance.currency ?? 'EUR');

const value = computed({
  get() {
    return !!props.card;
  },
  set(v: boolean) {
    if (!v) {
      emit('close');
    }
  },
});
</script>
