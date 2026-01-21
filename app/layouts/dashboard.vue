<script setup lang="ts">
    import type { NavigationMenuItem } from '@nuxt/ui';

    const items: NavigationMenuItem[] = [{
        label: 'Home',
        icon: 'i-lucide-house',
        href: '/'
    }, {
        label: 'Products',
        icon: 'i-lucide-box',
        href: '/product'
    }, {
        label: 'Users',
        icon: 'i-lucide-users',
        href: '/user'
    }];
</script>

<template>
    <UDashboardGroup>
        <UDashboardSidebar
            open
            toggle-side="right"
            resizable
        >
            <template #header>
                <h1>Boilerplate</h1>
            </template>

            <UNavigationMenu
                :items="items"
                orientation="vertical"
            />
        </UDashboardSidebar>

        <UDashboardPanel>
            <template #header>
                <UDashboardNavbar title="Home">
                    <template #right>
                        <UAvatar size="xl" :src="gravatarUrl('text@example.com')" />
                    </template>
                </UDashboardNavbar>
            </template>
            <template #body>
                <NuxtPage />
            </template>
        </UDashboardPanel>
    </UDashboardGroup>
</template>