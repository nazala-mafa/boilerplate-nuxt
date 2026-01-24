<script setup lang="ts">
    import { refDebounced } from '@vueuse/core'
    import type { UserOption } from './SelectUserInput.vue'
    import type { UserPaginatedCursorData } from '~/types/user'

    const model = defineModel<string>()
    const state = ref<UserOption[]>()

    const appUrl = useRuntimeConfig().public.appUrl

    // transform ids to object
    const transformIdsToObject = async () => {
        if (model.value == '') {
            state.value = [];
            return;
        }
        
        const { data: users } = await useFetch(`${appUrl}/api/user/select`, {
            params: { ids: model },
            credentials: 'include',
            transform: (data: UserPaginatedCursorData) => {
                return data.data.map(user => ({
                    label: user.name,
                    value: user.id,
                })) as UserOption[]
            }
        })

        if (!users.value?.length) return;

        state.value = users.value
    };
    onMounted(transformIdsToObject)

    // transform object to ids
    watch(state, () => {
        if (!state.value?.length) {
            model.value = '';
            return;
        }
        model.value = state.value?.map(item => item.value).join(',')
    })

    const searchTerm = ref('')
    const searchTermDebounced = refDebounced(searchTerm, 400)

    const { data: users, status } = await useFetch(`${appUrl}/api/user/select`, {
        params: { q: searchTermDebounced },
        credentials: 'include',
        transform: (data: UserPaginatedCursorData) => {
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
            v-model="state"
            :multiple="true"
        />
    </UFormField>
</template>