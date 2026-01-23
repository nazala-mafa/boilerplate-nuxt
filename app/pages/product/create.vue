<script setup lang="ts">
    import ProductForm, { type Schema } from '~/components/product/ProductForm.vue';

    definePageMeta({
        layout: 'dashboard',
        title: 'Create Product',
    })

    const { $api } = useNuxtApp()

    async function onSubmit(data: Schema) {        
        const { message } = await $api('/api/product', {
            method: 'POST',
            body: data,
        }) as {
            message: string
        }

        useToast().add({
            title: 'Create Product',
            description: message
        })

        navigateTo('/product');
    }
</script>

<template>
    <div class="flex gap-5 items-start">
        <UCard class="max-w-xl flex-1">
            <template #header>
                <h2 class="mb-0">Product Form</h2>
            </template>
            <ProductForm v-on:submit="onSubmit" />
        </UCard>
        <UCard class="w-75">
            <template #header>
                <h2 class="mb-0">Action</h2>
            </template>
            <div class="flex gap-5">
                <UButton href="/product" color="neutral" class="flex-1 justify-center">Back</UButton>
                <UButton type="submit" class="flex-1 justify-center" form="product-form">Save</UButton>
            </div>
        </UCard>
    </div>
</template>