import type { Result } from '$lib/models/Result';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const result: Result[] = [
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
                id_type: 'KRS',
                id_value: '123456',
                bank_account: '33 3333 3333 3333 3333 3333 3333'
            },
            company: {
                bank_accounts: [
                    '33 3333 3333 3333 3333 3333 3333',
                    '33 3333 3333 3333 3333 3333 3334'
                ],
                name: 'Kolejna firma',
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
	];
	return { result };
};
