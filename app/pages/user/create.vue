<script setup lang="ts">
    import UserForm, { type Schema } from '~/components/user/UserForm.vue';

    definePageMeta({
        layout: 'dashboard',
        title: 'Create User',
    })

    const { $api } = useNuxtApp()

    async function onSubmit(data: Schema) {        
        const { message } = await $api('/api/user', {
            method: 'POST',
            body: data,
        }) as {
            message: string
        }

        useToast().add({
            title: 'Create User',
            description: message
        })

        navigateTo('/user');
    }
</script>

<template>
    <div class="flex gap-5 items-start">
        <UCard class="max-w-xl flex-1">
            <template #header>
                <h2 class="mb-0">User Form</h2>
            </template>
            <UserForm v-on:submit="onSubmit" />
        </UCard>
        <UCard class="w-75">
            <template #header>
                <h2 class="mb-0">Action</h2>
            </template>
            <div class="flex gap-5">
                <UButton href="/user" color="neutral" class="flex-1 justify-center">Back</UButton>
                <UButton type="submit" class="flex-1 justify-center" form="user-form">Save</UButton>
            </div>
        </UCard>
    </div>
</template>