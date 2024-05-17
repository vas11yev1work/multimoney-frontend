<template>
  <div class="flex items-center gap-2 overflow-y-auto rounded-lg">
    <UiSuspense :data="cards">
      <AddNewCard>
        <EditCardForm />
      </AddNewCard>
      <CardItem v-for="card in cards.data" :key="card.id" :card="card" @click="selectCard(card)" />
      <CardViewModal :card="selectedCard" @close="selectedCard = undefined">
        <EditCardForm :card="selectedCard" />
      </CardViewModal>
      <template #loading>
        <UiSkeleton gap="0.5rem" mode="dark" height="80px" width="128px" radius="0.75rem" class="!flex-row" :rows="3" />
      </template>
    </UiSuspense>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AddNewCard, EditCardForm } from '@/features/add-new-card';
import { CardItem, CardViewModal } from '@/entities/cards';
import { Card, SharedData } from '@/shared/api';
import { UiSkeleton, UiSuspense } from '@/shared/ui';

defineProps<{
  cards: SharedData<Card[]>;
}>();

const selectedCard = ref<Card>();

function selectCard(card: Card) {
  selectedCard.value = card;
}
</script>
