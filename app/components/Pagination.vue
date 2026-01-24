<script setup lang="ts">
import type { Link } from '~/types/paginatedData';

const { links } = defineProps<{
    links: Link[]
}>()

</script>

<template>
    <div class="flex gap-2">
        <NuxtLink
            v-for="link in links"
            :href="link.url || ''"
            class="px-3 p-1 rounded border"
            :class="{ 'bg-white text-black': link.active, 'bg-slate-300 text-black': !link.url }"
            v-html="link.label"
            replace
        />
    </div>
</template>