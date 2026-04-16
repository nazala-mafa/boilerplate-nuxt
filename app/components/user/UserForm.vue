<script setup lang="ts">
    import type { FormSubmitEvent } from '@nuxt/ui';
    import z from 'zod';
    import type { User } from '~/types/user';

    const schema = z.object({
        id: z.number().nullable(),
        name: z.string().max(255),
        email: z.email().max(255).min(8),
        password: z.string().max(255).min(8),
    })

    export type Schema = z.output<typeof schema>

    const { onSubmit, defaultUser } = defineProps<{
        onSubmit: (data: Schema) => void,
        defaultUser?: User
    }>()

    const state = reactive({
        id: defaultUser?.id || null,
        name: defaultUser?.name || '',
        email: defaultUser?.email || '',
        password: defaultUser?.password || '',
    })

    async function _onSubmit(event: FormSubmitEvent<Schema>) {
        onSubmit(event.data)
    }
</script>

<template>
    <UForm :schema="schema" :state="state" @submit="_onSubmit" class="space-y-5" id="user-form" v-on:error="(err) => console.log(err)">
        <UFormField label="Name" name="name">
            <UInput v-model="state.name" class="w-full" />
        </UFormField>

        <UFormField label="Email" name="email">
            <UInput type="email" v-model="state.email" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password">
            <UInput type="password" v-model="state.password" class="w-full" />
        </UFormField>
    </UForm>
</template>