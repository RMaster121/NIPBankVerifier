import { goto } from "$app/navigation";
import type { Result } from "$lib/models/Result";
import type { Search } from "$lib/models/Search";
import { apiResult } from "$lib/store";

export async function sendRequest(searches: Search[]): Promise<void> {
    apiResult.set(<Result[]>[
        {
			search: {
				id_type: 'NIP',
				id_value: '1234567891',
				bank_account: '11 1111 1111 1111 1111 1111 1111'
			},
			company: {
				bank_accounts: [
                    '11 1111 1111 1111 1111 1111 1111'
                ],
				name: 'Przykładowa firma',
				address: 'Jarzębinowa 1, 00-000 Warszawa'
			}
		},
        {
            search: {
                id_type: 'REGON',
                id_value: '123456789',
                bank_account: '22 2222 2222 2222 2222 2222 2223'
            },
            company: {
                bank_accounts: [
                    '22 2222 2222 2222 2222 2222 2222'
                ],
                name: 'Inna firma',
                address: 'Kwiatowa 2, 11-111 Kraków'
            }
        },
        {
            search: {
                id_type: 'REGON',
                id_value: '987654321',
                bank_account: '44 4444 4444 4444 4444 4444 4444'
            },
            company: {
                bank_accounts: [],
                name: 'Ostatnia firma',
                address: 'Kwiatowa 2, 11-111 Kraków'
            }
        }
    ]);
    goto("/results/");
}