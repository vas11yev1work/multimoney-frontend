<template>
  <div class="flex items-center gap-2 overflow-y-auto rounded-lg">
    <AddNewCard>
      <EditCardForm />
    </AddNewCard>
    <CardItem v-for="card in cards" :key="card.id" :card="card" />
  </div>
</template>

<script setup lang="ts">
import { AddNewCard } from '@/features/add-new-card';
import { EditCardForm } from '@/features/edit-card-form';
import { CardItem } from '@/entities/card';
import { Card } from '@/shared/api';

withDefaults(
  defineProps<{
    cards?: Card[];
  }>(),
  {
    cards: () => [],
  }
);
</script>
