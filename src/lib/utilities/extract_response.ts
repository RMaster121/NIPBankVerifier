interface Subject {
	name: string;
	nip: string;
	statusVat: string;
	regon: string;
	krs: string;
	workingAddress: string;
	accountNumbers: string[];
}

function extractSubjectDetails(response) {
	const { name, nip, workingAddress, regon, accountNumbers } = response.result.subject;

	return {
		name,
		nip,
		workingAddress,
		regon,
		accountNumbers
	};
}

const details = extractSubjectDetails(response);
console.log(details);
