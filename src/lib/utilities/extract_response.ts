export function extractSubjectDetails(subject) {
	const { name, nip, workingAddress, residenceAddress, regon, accountNumbers } = subject;

	return {
		name,
		nip,
		workingAddress,
		residenceAddress,
		regon,
		accountNumbers
	};
}
