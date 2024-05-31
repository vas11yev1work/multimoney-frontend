<template>
  <UiModal v-model="value" title="Выберите категорию">
    <UiSuspense :data="categories">
      <div v-if="categories.data" class="-mx-2 flex select-none flex-col">
        <button
          v-for="category in categories.data"
          :key="category.id"
          type="button"
          class="flex rounded-md p-2 text-left transition active:scale-[.98] active:bg-gray-100"
          ontouchstart
          @click="selectCategory(category.id)"
        >
          <div class="flex items-center">
            <div class="mr-3 flex h-10 w-10 min-w-10 items-center justify-center rounded-xl bg-gray-100">
              <UiIcon :icon-name="category?.icon ?? 'faHome'" size="lg" class="text-blue-500" />
            </div>
            <div>
              <UiTypo>{{ category?.name ?? '' }}</UiTypo>
            </div>
          </div>
        </button>
      </div>
      <template #loading>
        <div v-for="n in 5" :key="n" class="flex items-center py-2">
          <UiSkeleton height="40px" width="40px" radius="12px" />
          <div class="ml-3">
            <UiSkeleton height="24px" width="180px" />
          </div>
        </div>
      </template>
    </UiSuspense>
  </UiModal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { UiIcon, UiModal, UiSkeleton, UiSuspense, UiTypo } from '@/shared/ui';
import { useIncomeCategoriesModel } from '../model';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void;
  (e: 'select-category', cardId: string): void;
}>();

const incomeCategoriesModel = useIncomeCategoriesModel();
const { categories } = storeToRefs(incomeCategoriesModel);

const value = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:model-value', value),
});

function selectCategory(categoryId: string) {
  emit('update:model-value', false);
  emit('select-category', categoryId);
}
</script>
