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
    <div v-if="value === null && !!fileUrl" class="overflow-hidden">
        <UButton icon="i-lucide-x" size="xs" color="neutral" class="rounded-full absolute -top-2 -right-2 cursor-pointer" @click="fileUrl = undefined" />
        <img :src="fileUrl" class="h-48 w-full object-cover rounded" />
    </div>
    <UFileUpload
        v-else
        v-model="value"
        v-on:update:model-value="(e) => {
            if (e) {
                onUpload(e);
            }
        }"
        class="min-h-48"
    />
</template>
