export default defineNuxtPlugin(() => {
    const appUrl = useRuntimeConfig().public.appUrl;

    const headers = new Headers();
    headers.append('accept', 'application/json');

    const toast = useToast();

    const api = $fetch.create({
        baseURL: appUrl,
        credentials: 'include',
        async onRequest({ options }) {
            if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method || '')) {
                await $fetch(`${appUrl}/sanctum/csrf-cookie`, {
                    credentials: 'include',
                })
            }

            const token = useCookie('XSRF-TOKEN').value;
            if (token) {
                options.headers = {
                    ...options.headers,
                    // @ts-expect-error custom headers, syarat csrf-token dari laravel
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': token,
                }
            }
        },
        async onResponseError({ response }) {            
            if (response.status === 401) {
                useAuth().setUser(null)
                navigateTo('/login');
                toast.add({
                    title: 'Unautorized.',
                    description: 'Your Session Expired.'
                })
            }
        }
    })

    return {
        provide: {
            api
        }
    }
})