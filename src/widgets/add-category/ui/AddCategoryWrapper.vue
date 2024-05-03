<template>
  <FastAction title="Новая категория" modal-title="Добавить категорию" icon="faList">
    <UiTabs v-model="currentTab" class="sticky top-0" :tabs="tabs" />
    <div v-if="currentTab" class="mt-4">
      <slot v-if="currentTab === 'income'" name="income" />
      <slot v-if="currentTab === 'expense'" name="expense" />
    </div>
  </FastAction>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FastAction, UiTabs } from '@/shared/ui';

const currentTab = ref(null);

const tabs = [
  { value: 'income', label: 'Доходы', icon: 'faArrowDown' },
  { value: 'expense', label: 'Траты', icon: 'faArrowUp' },
];
</script>
