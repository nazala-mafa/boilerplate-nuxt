<script setup lang="ts">
    import { refDebounced } from '@vueuse/core'
    import { useQuery } from '@tanstack/vue-query';
    import { useConfirmDialog } from '~/composeable/useCofirmDialog';
    import type { User, UserPaginatedData } from '~/types/user';
    import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';

    definePageMeta({
        layout: 'dashboard',
        title: 'User',
    })

    const route = useRoute()
    const query = computed(() => ({
        page: Number(route.query.page ?? 1),
        search: route.query.search ?? ''
    }))

    const { $api } = useNuxtApp();

    const { data: users, refetch } = useQuery({
        queryKey: computed(() => ['users', query.value]),
        queryFn: async () => await $api(`/api/user`, { query: query.value }) as { datas: UserPaginatedData },
    })

    const columns: TableColumn<User>[] = [
        {
            id: 'number',
            header: '#',
        },
        {
            id: 'name',
            accessorKey: 'name',
            header: 'Name',
        },
        {
            id: 'email',
            accessorKey: 'email',
            header: 'Email',
        },
        {
            id: 'action',
        }
    ];

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

    const search = ref<string>(typeof query.value?.search === 'string' ? query.value.search : '')
    const debouncedSearch = refDebounced(search, 400);

    const router = useRouter()
    const onSearch = () => {
        router.push({
            query: {
                ...query.value,
                page: 1,
                search: debouncedSearch.value
            }
        })
    }
</script>

<template>
    <UMain>
        <UCard class="mb-6">
            <NuxtLink href="/user/create">
                <UButton>Create User</UButton>
            </NuxtLink>
        </UCard>

        <UCard class="mb-6">
            <div class="flex justify-end items-center gap-2">
                <UInput
                    type="search"
                    placeholder="Email, Name ..."
                    v-model="search"
                />
                <UButton icon="i-lucide-filter" @click="onSearch" />
            </div>
        </UCard>

        <UCard>
            <UTable :data="users?.datas?.data" :columns="columns" :empty="'lagi kosong'">
                <template #number-cell="{ row }">
                    <div class="flex justify-center">
                        {{ row.index + (users?.datas?.from || 0) }}
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
                <Pagination v-if="users?.datas?.links" :links="users?.datas?.links" />
            </template>
        </UCard>
    </UMain>
</template>