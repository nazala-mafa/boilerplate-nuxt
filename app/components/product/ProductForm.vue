<script setup lang="ts">
    import SelectUserInput from '../user/SelectUserInput.vue';
    import type { FormSubmitEvent } from '@nuxt/ui';
    import type { Product } from '~/types/product';
    import z from 'zod';
    import FileUploader from '../FileUploader.vue';

    const schema = z.object({
        id: z.number().nullable(),
        user: z.object({
            value: z.number(),
            label: z.string(),
        }),
        name: z.string().max(255),
        description: z.string().max(1000),
        price: z.number().min(0),
        image_url: z.url(),
    })

    export type Schema = z.output<typeof schema>

    const state = reactive({
        id: null,
        user: undefined,
        name: '',
        description: '',
        price: 0,
        image_url: '',
    })

    const { onSubmit } = defineProps<{
        onSubmit: (data: Schema) => void
    }>()

    async function _onSubmit(event: FormSubmitEvent<Schema>) {
        onSubmit(event.data)
    }
</script>

<template>
    <UForm :schema="schema" :state="state" @submit="_onSubmit" class="space-y-4">
        <SelectUserInput v-model="state.user" />

        <UFormField label="Name" name="name">
            <UInput v-model="state.name" class="w-full" />
        </UFormField>

        <UFormField label="Description" name="description">
            <UTextarea v-model="state.description" class="w-full" />
        </UFormField>

        <UFormField label="Price" name="price">
            <UInput type="number" v-model="state.price" class="w-full" />
        </UFormField>

        <UFormField label="Image" name="image_url">
            <FileUploader v-model="state.image_url" path="product" />
        </UFormField>

        <div class="flex justify-end">
            <UButton type="submit">
                Submit
            </UButton>
        </div>
    </UForm>
</template>