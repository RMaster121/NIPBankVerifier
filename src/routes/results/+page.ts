import type { Result } from '$lib/models/Result';
import { apiResult } from '$lib/store';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	apiResult.subscribe((value) => {
	    console.log(value);
	});
	return {
		result: <Result[]>[
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
			},
            {
				search: {
					id_type: 'REGON',
					id_value: '987654321',
					bank_account: '44 4444 4444 4444 4444 4444 4444'
				},
				company: {
					bank_accounts: ['44 4444 4444 4444 4444 4444 4444'],
					name: 'Ostatnia firma',
					address: 'Kwiatowa 2, 11-111 Kraków'
				}
			},
            {
				search: {
					id_type: 'REGON',
					id_value: '987654321',
					bank_account: '44 4444 4444 4444 4444 4444 4442'
				},
				company: {
					bank_accounts: ['44 4444 4444 4444 4444 4444 4444'],
					name: 'Ostatnia firma',
					address: 'Kwiatowa 2, 11-111 Kraków'
				}
			}
		]
	};
};
