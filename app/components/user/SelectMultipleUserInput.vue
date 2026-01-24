<script setup lang="ts">
    import { refDebounced } from '@vueuse/core'
    import type { UserOption } from './SelectUserInput.vue'
    import type { UserPaginatedCursorData } from '~/types/user'

    const model = defineModel<string>()
    const state = ref<UserOption[]>([])

    const appUrl = useRuntimeConfig().public.appUrl
    
    const { data: selectedUserOption } = await useFetch(`${appUrl}/api/user/select`, {
        credentials: 'include',
        params: { ids: model },
        immediate: model.value !== '' && state.value.length == 0,
        transform: (data: UserPaginatedCursorData) => {
            return data.data.map((item) => ({
                label: item.name,
                value: item.id,
            }))
        },
    });

    // transform ids to object
    onMounted(async () => {
        if (model.value == '') {
            state.value = [];
            return;
        }
        
        if (selectedUserOption.value == undefined) return;
        
        state.value = selectedUserOption.value
    });
    watch(model, () => {
        if (model.value == '') {
            state.value = [];
            return;
        }
    });

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