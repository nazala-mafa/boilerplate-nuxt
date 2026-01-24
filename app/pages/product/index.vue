<script setup lang="ts">
    import { useQuery } from '@tanstack/vue-query';
    import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';
    import { useConfirmDialog } from '~/composeable/useCofirmDialog';
    import type { Product, ProductPaginatedData } from '~/types/product';
    import SelectMultipleUserInput from '~/components/user/SelectMultipleUserInput.vue';

    definePageMeta({
        layout: 'dashboard',
        title: 'Products',
    })

    const route = useRoute()

    const { $api } = useNuxtApp();

    const { data: products, refetch } = useQuery({
        queryKey: computed(() => ['users', route.query]),
        queryFn: async () => await $api(`/api/product`, { query: route.query }) as ProductPaginatedData,
    })    

    const columns: TableColumn<Product>[] = [
        {
            id: 'number',
            header: '#',
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
                            await $api(`/api/product/${product.id}`, {
                                method: 'DELETE',
                            });
                            await refetch();
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

    const search = ref<string>(String(route.query.search ?? ''));
    const userIds = ref<string>(String(route.query.user_ids ?? ''));

    const router = useRouter()
    const onSearch = () => {
        const query = {
            search: search.value,
            user_ids: userIds.value,
            page: 1,
        };        
        router.push({ query });
    }

    const onReset = () => {
        search.value = '';
        userIds.value = '';
    }

    const hasQueryParams = computed(() => Object.keys(route.query).length > 0);    
</script>

<template>
    <UMain>
        <UCard class="mb-6">
            <NuxtLink href="/product/create">
                <UButton>Create Product</UButton>
            </NuxtLink>
        </UCard>

        <UCard class="mb-6">
            <div class="flex justify-between items-center">
                <SelectMultipleUserInput v-model="userIds" />
                <div class="flex justify-end items-center gap-2">
                    <UInput
                        type="search"
                        placeholder="Owner, Name ..."
                        v-model="search"
                    />
                    <UButton icon="i-lucide-filter" @click="onSearch" />
                    <UButton icon="i-lucide-redo" href="/product" @click="onReset"/>
                </div>
            </div>
        </UCard>

        <UCard>
            <UTable :data="products?.data" :columns="columns" empty="Product is empty">
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

            <template #footer>
                <Pagination v-if="products" :paginated_data="products" />
            </template>
        </UCard>
    </UMain>
</template>