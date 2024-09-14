export function extractSubjectDetails(response) {
	const { name, nip, workingAddress, residenceAddress, regon, accountNumbers } = response.result.subject;

	return {
		name,
		nip,
		workingAddress,
		residenceAddress,
		regon,
		accountNumbers
	};
}
