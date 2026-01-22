<script setup lang="ts">
    import ProductForm, { type Schema } from '~/components/product/ProductForm.vue';
    import type { Product } from '~/types/product';

    definePageMeta({
        layout: 'dashboard',
        title: 'Edit Product',
    })

    const id = useRoute().params.id

    const { $api } = useNuxtApp();

    const { product } = await $api(`/api/product/${id}`) as {
        product: Product
    }

    async function onSubmit(data: Schema) {
        console.log(data);        
    }
</script>

<template>
    <UCard class="max-w-xl">
        <ProductForm v-on:submit="onSubmit" />
    </UCard>
</template>