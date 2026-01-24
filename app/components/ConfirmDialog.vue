<script setup lang="ts">
const { title, description } = defineProps<{
    title: string,
    description?: string
}>()
const emit = defineEmits<{
    (e: 'close', value: boolean): void
}>()
</script>

<template>
    <UModal
        :close="false"
        :title="title"
        :description="description"
        :ui="{
            footer: 'flex justify-end gap-3'
        }"
    >
        <template #footer>
            <UButton variant="outline" @click="$emit('close', false)">Close</UButton>
            <UButton color="error" @click="$emit('close', true)">Yes</UButton>
        </template>
    </UModal>
</template>
