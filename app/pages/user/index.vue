<script setup lang="ts">
    import { useQuery } from '@tanstack/vue-query';
    import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';
    import { useConfirmDialog } from '~/composeable/useCofirmDialog';
    import type { User, UserPaginatedData } from '~/types/user';

    definePageMeta({
        layout: 'dashboard',
        title: 'Users',
    })

    const route = useRoute()

    const { $api } = useNuxtApp();

    const { data: users, refetch } = useQuery({
        queryKey: computed(() => ['users', route.query]),
        queryFn: async () => await $api(`/api/user`, { query: route.query }) as UserPaginatedData,
    })

    const columns: TableColumn<User>[] = [
        {
            accessorKey: 'num',
            header: '#',
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            id: 'action'
        }
    ]

    const confirm = useConfirmDialog()
    const toast = useToast()

    function getDropdownActions(user: User): DropdownMenuItem[][] {
        return [
            [
                {
                    label: 'Edit',
                    icon: 'i-lucide-edit',
                    href: `/user/${user.id}/edit`
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
                            await $api(`/api/user/${user.id}`, {
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

    const router = useRouter()
    const onSearch = () => {
        const query = {
            search: search.value,
            page: 1,
        };        
        router.push({ query });
    }

    const onReset = () => {
        search.value = '';
    }

    const hasQueryParams = computed(() => Object.keys(route.query).length > 0);    
</script>

<template>
    <UMain>
        <UCard class="mb-6">
            <NuxtLink href="/user/create">
                <UButton>Create User</UButton>
            </NuxtLink>
        </UCard>

        <UCard class="mb-6">
            <div class="flex justify-between items-center">
                <div class="flex justify-end items-center gap-2">
                    <UInput
                        type="search"
                        placeholder="Email, Name ..."
                        v-model="search"
                    />
                    <UButton icon="i-lucide-filter" @click="onSearch" />
                    <UButton v-if="hasQueryParams" icon="i-lucide-redo" href="/user" @click="onReset"/>
                </div>
            </div>
        </UCard>

        <UCard 
            :ui="{
                body: 'sm:p-0'
            }"
        >
            <UTable :data="users?.data" :columns="columns" empty="Product is empty">
                <template #num-cell="{ row }">
                    <span>{{ row.index + Number(users?.from) }}</span>
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
                <Pagination v-if="users" :paginated_data="users" />
            </template>
        </UCard>
    </UMain>
</template>