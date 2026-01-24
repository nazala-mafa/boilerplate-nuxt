<script setup lang="ts">
import type { PaginatedData } from '~/types/paginatedData';

const { paginated_data } = defineProps<{
    paginated_data: PaginatedData<{}>
}>()

</script>

<template>
    <div class="flex justify-end items-center gap-5">
        <p class="mb-0">Showing {{ paginated_data.from }} to {{ paginated_data.to }} of {{ paginated_data.total }} entries</p>
        <div class="flex gap-2">
            <NuxtLink
                v-for="link in paginated_data.links"
                :href="link.url || ''"
                class="px-3 p-1 rounded border"
                :class="{ 'bg-white text-black': link.active, 'bg-slate-300 text-black': !link.url }"
                v-html="link.label"
                replace
            />
        </div>
    </div>
</template>