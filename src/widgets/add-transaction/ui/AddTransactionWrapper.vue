<template>
  <FastAction title="Новая транзакция" modal-title="Добавить транзакцию" icon="faCoins">
    <UiTabs v-model="currentTab" class="sticky top-0" :tabs="tabs" />
    <div v-if="currentTab" class="mt-4">
      <slot v-if="currentTab === 'income'" name="income" />
      <slot v-if="currentTab === 'expense'" name="expense" />
      <slot v-if="currentTab === 'transfer'" name="transfer" />
    </div>
  </FastAction>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FastAction, UiTabs } from '@/shared/ui';

const currentTab = ref(null);

const tabs = [
  { value: 'income', label: 'Доход', icon: 'faArrowDown' },
  { value: 'expense', label: 'Расход', icon: 'faArrowUp' },
  { value: 'transfer', label: 'Перевод', icon: 'faArrowsTurnToDots' },
];
</script>
