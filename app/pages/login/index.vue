<script setup lang="ts">
    definePageMeta({
        layout: 'guest'
    })

    import * as z from 'zod';
    import type { FormSubmitEvent, AuthFormField, FormError } from '@nuxt/ui';

    import type { User } from '~/types/user';
    import { useAuth } from '~/stores/auth';
    import type { ValidationErrors } from '~/types/validationErrors';

    const toast = useToast()

    const fields: AuthFormField[] = [{
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        required: true,
        defaultValue: 'test@example.com',
    }, {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        required: true,
        defaultValue: 'password'
    }, {
        name: 'remember',
        type: 'checkbox',
        label: 'Remember me',
        defaultValue: false,
    }]

    z.config(z.locales.id())

    const schema = z.object({
        email: z.email(),
        password: z.string().min(4),
        remember: z.boolean().nullable()
    })

    type Schema = z.output<typeof schema>

    const { $api } = useNuxtApp()

    async function onSubmit(payload: FormSubmitEvent<Schema>) {
        try {
            const { user } = await $api('/login', {
                method: 'POST',
                body: payload.data as Schema
            }) as {
                message: string,
                user: User
            }

            useAuth().setUser(user)

            navigateTo('/');
        } catch (error: unknown) {
            const { data } = error as {data: ValidationErrors}
            const message = data.errors.email?.[0]
            if (message) {
                toast.add({
                    title: 'Sign in failed',
                    description: message
                })
            }
        }
    }
</script>

<template>
    <title>Boilerplate | Login Page</title>

    <div class="flex flex-col items-center justify-center gap-4 p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm
                :schema="schema"
                :fields="fields"
                title="Welcome Back!"
                icon="i-lucide-lock"
                @submit="onSubmit"
                :submit="{
                    label: 'Sign in',
                }"
            >
                <template #description>
                    Don't have an account? <ULink to="#" class="text-primary font-medium">Sign up</ULink>.
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>