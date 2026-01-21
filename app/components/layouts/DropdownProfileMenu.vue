<script setup lang="ts">
    import type { DropdownMenuItem } from '@nuxt/ui';

    const items = ref<DropdownMenuItem[][]>([
        [
            {
                label: 'Test',
                avatar: {
                    src: gravatarUrl('text@example.com')
                },
                to: '/profile'
            },
            {
                label: 'Logout',
                icon: 'i-lucide-log-out',
                onSelect: (e) => {
                    e.preventDefault();
                    console.log('logout attempt');
                    return navigateTo('/login')
                }
            },
        ]
    ])
</script>

<template>
    <UDropdownMenu :items="items" size="xl">
        <UAvatar size="xl" :src="gravatarUrl('text@example.com')" />
    </UDropdownMenu>
</template>