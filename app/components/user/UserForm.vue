<script setup lang="ts">
    import type { FormSubmitEvent } from '@nuxt/ui';
    import type { User } from '~/types/user';
    import z from 'zod';

    const schema = z.object({
        id: z.number().nullable(),
        name: z.string().max(255),
        email: z.email().max(255),
        password: z.string().min(4).max(255).nullable(),
        password_confirmation: z.string().min(4).max(255).nullable(),
    }).superRefine(({ password, password_confirmation }, ctx) => {
        if (password !== password_confirmation) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Passwords don't match`,
                path: ["password_confirmation"],
            });
        }
    })

    export type Schema = z.output<typeof schema>

    const { onSubmit, defaultUser } = defineProps<{
        onSubmit: (data: Schema) => void,
        defaultUser?: User
    }>()

    const state = reactive({
        id: defaultUser?.id || null,
        name: defaultUser?.name || 'jokowi',
        email: defaultUser?.email || 'joko@wi.com',
        password: defaultUser?.password || '12341234',
        password_confirmation: defaultUser?.password_confirmation || '12341234',
    })

    async function _onSubmit(event: FormSubmitEvent<Schema>) {
        onSubmit(event.data)
    }
</script>

<template>
    <UForm 
        :schema="schema"
        :state="state"
        @submit="_onSubmit"
        class="space-y-5"
        id="user-form"
        v-on:error="(err) => console.log(err)"
    >
        <UFormField label="Name" name="name">
            <UInput v-model="state.name" class="w-full" />
        </UFormField>

        <UFormField label="Email" name="email">
            <UInput type="email" v-model="state.email" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password">
            <UInput type="password" v-model="state.password" class="w-full" />
        </UFormField>

        <UFormField label="Password Confirmation" name="password_confirmation">
            <UInput type="password" v-model="state.password_confirmation" class="w-full" />
        </UFormField>
    </UForm>
</template>