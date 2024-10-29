import { formatBankAccount, formatNIP } from '$lib/utilities/format';
import { identifyNumber } from '$lib/utilities/input_type';
import type { Result } from './Result';

enum Status {
	VERIFIED,
	NOT_VERIFIED,
	MANUAL_VERIFICATION,
	NON_EXISTING
}

export class EntityCardProperties {
	color: string;
	icon: string;
	status: string;
	bank_status?: string;
	result: Result;
	enum_status: Status;

	private is_veryfied(): Status {
		if (this.result.search.bank_account == '' || this.result.search.id_value == '') {
			return Status.MANUAL_VERIFICATION;
		} else if (!this.result.company) {
			return Status.NON_EXISTING;
		} else if (this.result.company!.bank_accounts.includes(this.result.search.bank_account)) {
			return Status.VERIFIED;
		} else {
			return Status.NOT_VERIFIED;
		}
	}

	public get_company_number(): string {
		let isNip = identifyNumber(this.result.search.id_value) == 'NIP';
		return (
			(isNip ? 'NIP' : 'REGON') +
			' ' +
			(isNip ? formatNIP(this.result.search.id_value) : this.result.search.id_value)
		);
	}

	constructor(result: Result) {
		this.result = result;
		this.enum_status = this.is_veryfied();
		switch (this.enum_status) {
			case Status.MANUAL_VERIFICATION:
				this.color = 'bg-yellow-100';
				this.icon = '🔍';
				this.status = 'Do sprawdzenia';
                this.bank_status = 'Konta bankowe podmiotu:\n' + result.company!.bank_accounts.map(account => `• ${formatBankAccount(account)}`).join('\n');
				break;
			case Status.NON_EXISTING:
				this.color = 'bg-red-100';
				this.icon = '❌';
				this.status = 'Podmiot nie istnieje';
				break;
			case Status.NOT_VERIFIED:
				this.color = 'bg-red-100';
				this.icon = '❌';
				this.status = 'Brak zgodności';
				this.bank_status = 'Podane konto nie jest powiązane z podmiotem.';
				break;
			case Status.VERIFIED:
				this.color = 'bg-green-100';
				this.icon = '✔️';
				this.status = 'Dane zgodne';
				if (result.company!.bank_accounts.length > 1) {
					this.bank_status =
						'Podane konto jest jednym z ' +
						result.company!.bank_accounts.length +
						' kont powiązanych z podmiotem.';
				} else {
					this.bank_status = 'Podane konto jest jedynym kontem powiązanym z podmiotem.';
				}
				break;
			default:
				this.color = 'bg-gray-100';
				this.icon = '❔';
				this.status = 'Nieznany status';
				break;
		}
	}
}
