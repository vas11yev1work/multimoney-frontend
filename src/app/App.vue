<template>
  <RouterView v-if="isOnline" />
  <div v-else class="flex h-screen w-full items-center justify-center">
    <UiTypo>Нет подключения к интернету...</UiTypo>
  </div>
</template>

<script lang="ts" setup>
import { useNetworkConnection } from '@/shared/lib';
import { UiTypo } from '@/shared/ui';

const { isOnline } = useNetworkConnection();
</script>
