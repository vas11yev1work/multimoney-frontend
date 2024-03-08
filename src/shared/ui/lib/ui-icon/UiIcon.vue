<template>
  <FontAwesomeIcon v-bind="$attrs" :icon="fas[iconName]" />
</template>

<script setup lang="ts">
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineProps<{
  iconName: string;
}>();
</script>
