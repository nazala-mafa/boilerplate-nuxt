<script setup lang="ts">
import type { PaginatedData } from '~/types/paginatedData';

const { paginated_data } = defineProps<{
    paginated_data: PaginatedData<{}>
}>()

</script>

<template>
    <div class="flex justify-end items-center gap-5">
        <p class="mb-0 dark:text-gray-500">Showing {{ paginated_data.from }} to {{ paginated_data.to }} of {{ paginated_data.total }} entries</p>
        <div class="flex gap-2">
            <NuxtLink
                v-for="link in paginated_data.links"
                :href="link.url || ''"
                class="px-3 p-1 rounded border border-gray-300 dark:border-gray-500 text-gray-500"
                :class="{ 'text-white dark:text-black bg-primary': link.active, 'bg-neutral-300 dark:bg-gray-800 text-primary dark:text-gray-500': !link.url }"
                v-html="link.label"
                replace
            />
        </div>
    </div>
</template>