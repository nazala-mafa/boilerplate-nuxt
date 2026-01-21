<script setup lang="ts">
    import type { NavigationMenuItem } from '@nuxt/ui';

    const items: NavigationMenuItem[] = [
        {
            label: 'Figma Kit',
            to: 'https://go.nuxt.com/figma-ui',
            target: '_blank'
        },
        {
            label: 'Playground',
            to: 'https://stackblitz.com/edit/nuxt-ui',
            target: '_blank'
        },
    ];
</script>

<template>
    <UFooter>
        <template #left>
            <p class="text-muted text-sm">
                Copyright {{ new Date().getFullYear() }}
            </p>
        </template>

        <UNavigationMenu :items="items" variant="link" />

        <template #right>
            <UButton
                icon="i-simple-icons-discord"
                color="neutral"
                variant="ghost"
                to="https://go.nuxt.com/discord"
                target="_blank"
                aria-label="Discord"
            />
        </template>
    </UFooter>
</template>