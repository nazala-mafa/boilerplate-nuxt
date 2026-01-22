<script setup lang="ts">
    import type { DropdownMenuItem } from '@nuxt/ui';
    const { $api } = useNuxtApp();

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
                onSelect: async (e) => {
                    e.preventDefault();

                    const { message } = await $api('/logout', { method: 'POST' }) as { message: string };

                    useToast().add({ 
                        title: 'Authentication',
                        description: message 
                    });

                    useAuth().setUser(null);

                    return navigateTo('/login');
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