export async function call_api(id_type: string, id_value: string): Promise<Response> {
    const currentDate = new Date().toLocaleString().split(', ')[0].split('.').reverse().join('-');
	let response = await fetch(`https://wl-api.mf.gov.pl/api/search/${id_type.toLowerCase}/${id_value}?date=${currentDate}`, {
		method: 'GET'
	});
    return response;
}
