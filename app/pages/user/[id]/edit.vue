<script setup lang="ts">
    import { useQueryClient } from '@tanstack/vue-query';
    import UserForm, { type Schema } from '~/components/user/UserForm.vue';
    import type { User } from '~/types/user';

    definePageMeta({
        layout: 'dashboard',
        title: 'Edit User',
    })

    const id = useRoute().params.id

    const { $api } = useNuxtApp();

    const { data: user } = await $api(`/api/user/${id}`) as {
        data: User
    }    

    const queryClient = useQueryClient();

    async function onSubmit(data: Schema) {
        const { message } = await $api(`/api/user/${data.id}`, {
            method: 'PATCH',
            body: data,
        }) as {
            message: string
        }

        useToast().add({
            title: 'Update User',
            description: message
        })

        navigateTo('/user');
     
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['products'] });
    }
</script>

<template>
    <div class="flex gap-5 items-start">
        <UCard class="max-w-xl flex-1">
            <template #header>
                <h2 class="mb-0">User Form</h2>
            </template>
            <UserForm v-on:submit="onSubmit" :default-user="user" />
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