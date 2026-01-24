<script setup lang="ts">
    import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';
    import { useConfirmDialog } from '~/composeable/useCofirmDialog';
    import type { Product, ProductPaginatedData } from '~/types/product';

    definePageMeta({
        layout: 'dashboard',
        title: 'Products',
    })

    const { $api } = useNuxtApp();

    const products = await $api('/api/product') as {
        datas: ProductPaginatedData
    }

    const columns: TableColumn<Product>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'user.name',
            header: 'Owner',
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            id: 'price',
            header: 'Price'
        },
        {
            id: 'action'
        }
    ]

    const confirm = useConfirmDialog()
    const toast = useToast()

    function getDropdownActions(product: Product): DropdownMenuItem[][] {
        return [
            [
                {
                    label: 'Edit',
                    icon: 'i-lucide-edit',
                    href: `/product/${product.id}/edit`
                },
                {
                    label: 'Delete',
                    icon: 'i-lucide-trash',
                    color: 'error',
                    onSelect: async () => {
                        if (await confirm({ 
                            title: 'Delete confirmation', 
                            description: 'Are you sure to delete this item? This item will deleted permanently.'
                        })) {
                            toast.add({
                                title: 'Delete success',
                                description: 'That item deleted successfully'
                            })
                        }
                    }
                }
            ]
        ]
    }
    
</script>

<template>
    <UMain>
        <UCard class="mb-6">
            <NuxtLink href="/product/create">
                <UButton>Create Product</UButton>
            </NuxtLink>
        </UCard>

        <UCard>
            <UTable :data="products.datas.data" :columns="columns">
                <template #price-cell="{ row }">
                    <div class="flex justify-end">
                        Rp. {{ row.original.price?.toLocaleString('id') }}
                    </div>
                </template>
                <template #action-cell="{ row }">
                    <UDropdownMenu :items="getDropdownActions(row.original)">
                        <UButton
                            icon="i-lucide-ellipsis-vertical"
                            color="neutral"
                            variant="ghost"
                            aria-label="Actions"
                        />
                    </UDropdownMenu>
                </template>
            </UTable>
        </UCard>
    </UMain>
</template>