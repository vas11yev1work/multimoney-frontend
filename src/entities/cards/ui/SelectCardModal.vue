<template>
  <UiModal v-model="value" title="Выберите счет">
    <UiSuspense :data="cards">
      <div v-if="cards.data" class="-mx-2 flex flex-col">
        <button
          v-for="card in cards.data"
          :key="card.id"
          type="button"
          class="flex rounded-md p-2 text-left active:bg-slate-100"
          @click="selectCard(card.id)"
        >
          <ThumbnailCard :card="card" />
          <div class="ml-3 flex w-full flex-col items-start">
            <UiTypo class="mb-1 leading-5"> {{ card.name }} ({{ card.currencyBalance.currency }}) </UiTypo>
            <UiMoney
              level="5"
              class="font-semibold leading-4"
              :value="card.currencyBalance.amount"
              :currency="card.currencyBalance.currency"
            />
          </div>
        </button>
      </div>
      <template #loading>
        <div v-for="n in 3" :key="n" class="flex py-2">
          <UiSkeleton height="32px" width="48px" />
          <div class="ml-3">
            <UiSkeleton height="20px" width="180px" class="mb-1" />
            <UiSkeleton height="16px" width="100px" />
          </div>
        </div>
      </template>
    </UiSuspense>
  </UiModal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { UiModal, UiMoney, UiSkeleton, UiSuspense, UiTypo } from '@/shared/ui';
import { useCardsModel } from '../index';
import ThumbnailCard from './ThumbnailCard.vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void;
  (e: 'select-card', cardId: string): void;
}>();

const cardsModel = useCardsModel();
const { cards } = storeToRefs(cardsModel);

const value = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:model-value', value),
});

function selectCard(cardId: string) {
  emit('update:model-value', false);
  emit('select-card', cardId);
}
</script>
