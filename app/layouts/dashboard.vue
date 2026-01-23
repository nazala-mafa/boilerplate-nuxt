<script setup lang="ts">
    const route = useRoute()
    const title = computed(() => route.meta.title as string);

    import type { NavigationMenuItem } from '@nuxt/ui';
    import DropdownProfileMenu from '~/components/layouts/DropdownProfileMenu.vue';

    const items = computed<NavigationMenuItem[]>(() => [{
        label: 'Home',
        icon: 'i-lucide-house',
        href: '/'
    }, {
        label: 'Products',
        icon: 'i-lucide-box',   
        href: '/product',
        active: /^\/product/.test(route.path)
    }, {
        label: 'Users',
        icon: 'i-lucide-users',
        href: '/user'
    }])
</script>

<template>
    <title>{{ title || 'Boilerplate' }}</title>
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
                <UDashboardNavbar :title="title || 'Boilerplate'">
                    <template #right>
                        <DropdownProfileMenu />
                    </template>
                </UDashboardNavbar>
            </template>
            <template #body>
                <NuxtPage />
            </template>
        </UDashboardPanel>
    </UDashboardGroup>
</template>