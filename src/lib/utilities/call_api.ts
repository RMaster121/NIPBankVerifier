export async function call_api(id_type: string, id_value: string): Promise<Response> {
	const currentDate = new Date()
		.toLocaleString()
		.split(', ')[0]
		.split('.')
		.reverse()
		.map((part) => (part.length === 1 ? '0' + part : part))
		.join('-');
	const response = await fetch(
		`https://wl-api.mf.gov.pl/api/search/${id_type.toLowerCase()}/${id_value}?date=${currentDate}`,
		{
			method: 'GET'
		}
	);
	return response;
}
