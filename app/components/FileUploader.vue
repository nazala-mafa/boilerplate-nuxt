<script setup lang="ts">
    const { path } = defineProps<{ path: string }>()
    const fileUrl = defineModel<string>()
    const value = ref(null)

    const { $api } = useNuxtApp()

    async function onUpload(file: File) {
        const formData = new FormData()
        formData.append('file', file)
        const { fileurl } = await $api(`/api/file/upload/${path}`, {
            method: 'POST',
            body: formData,
        }) as {
            filename: string,
            filepath: string,
            fileurl: string
        }
        fileUrl.value = fileurl
    }
</script>

<template>
    <UFileUpload
        v-model="value"
        v-on:update:model-value="(e) => {
            if (e) {
                onUpload(e);
            }
        }"
        class="min-h-48"
    />
</template>
