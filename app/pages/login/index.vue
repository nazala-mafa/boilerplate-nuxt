<script setup lang="ts">
    definePageMeta({
        layout: 'guest'
    })
    import * as z from 'zod';
    import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui';

    const toast = useToast()

    const fields: AuthFormField[] = [{
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        required: true,
    }, {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        required: true
    }, {
        name: 'remember',
        type: 'checkbox',
        label: 'Remember me',
    }]

    const schema = z.object({
        email: z.email('Invalid email'),
        password: z.string('Password is required').min(4, 'Must be at least 4 characters')
    })

    type Schema = z.output<typeof schema>

    function onSubmit(payload: FormSubmitEvent<Schema>) {
        console.log('Submitted', payload);
    }
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4 p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm
                :schema="schema"
                :fields="fields"
                title="Welcome Back!"
                icon="i-lucide-lock"
                @submit="onSubmit"
                :submit="{
                    label: 'Sign in'
                }"
            >
                <template #description>
                    Don't have an account? <ULink to="#" class="text-primary font-medium">Sign up</ULink>.
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>