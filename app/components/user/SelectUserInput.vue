<script setup lang="ts">
    import { refDebounced } from '@vueuse/core'
    import type { ProductPaginatedCursorData } from '~/types/product'

    export type UserOption = {
        value: number,
        label: string,
    }

    const model = defineModel<UserOption>()

    const searchTerm = ref('')
    const searchTermDebounced = refDebounced(searchTerm, 400)

    const appUrl = useRuntimeConfig().public.appUrl

    const { data: users, status } = await useFetch(`${appUrl}/api/user/select`, {
        params: { q: searchTermDebounced },
        credentials: 'include',
        transform: (data: ProductPaginatedCursorData) => {
            return data.data.map(user => ({
                label: user.name,
                value: user.id
            }) as UserOption)
        },
        lazy: true,
    })
</script>

<template>
    <UFormField label="User" name="user_id">
        <USelectMenu
            v-model:search-term="searchTerm"
            :items="users"
            :loading="status === 'pending'"
            ignore-filter
            placeholder="Select User"
            class="w-full"
            v-model="model"
        />
    </UFormField>
</template>