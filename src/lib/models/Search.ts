export type Search = {
    id_type: 'REGON' | 'NIP' | 'KRS';
    id_value: string;
    bank_account: string;
};