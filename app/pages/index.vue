<script setup lang="ts">
    definePageMeta({
        layout: 'dashboard'
    })

    const user = useAuth().user
</script>

<template>
    <title>Boilerplate</title>
    <UMain>
        <h1>Welcome, {{ user?.name }}.</h1>
    </UMain>
</template>