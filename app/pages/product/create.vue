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
    <UCard class="max-w-xl">
        <ProductForm v-on:submit="onSubmit" />
    </UCard>
</template>