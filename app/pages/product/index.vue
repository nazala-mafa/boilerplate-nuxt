<script setup lang="ts">
    definePageMeta({
        layout: 'dashboard',
        title: 'Products',
    })

    const { $api } = useNuxtApp();
    const products = $api('/api/product')

    console.log(products);
    
</script>

<template>
    <UMain>
         
    </UMain>
</template>