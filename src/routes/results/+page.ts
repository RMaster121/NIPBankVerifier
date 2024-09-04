import { goto } from '$app/navigation';
import { apiResult } from '$lib/store';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load: PageLoad = async ({ params }) => {
    const result = await new Promise((resolve) => {
        const unsubscribe = apiResult.subscribe((value) => {
            if (value.length == 0 && browser) {
                goto('/');
            }
            resolve(value);
        });
        unsubscribe();
    });

    return { result };
};