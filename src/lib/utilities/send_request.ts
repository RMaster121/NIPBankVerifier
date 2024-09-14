import { goto } from "$app/navigation";
import type { Result } from "$lib/models/Result";
import type { Search } from "$lib/models/Search";
import { apiResult } from "$lib/store";
import { call_api } from "$lib/utilities/call_api";
import { extractSubjectDetails } from "$lib/utilities/extract_response";
import { identifyNumber } from "./input_type";

export async function sendRequest(searches: Search[]): Promise<void> {
    const emptyField = 'Brak danych';
    try {
        const results = await Promise.all(
            searches.map(async (search) => {
                const response = await call_api(identifyNumber(search.id_value), search.id_value);
                const data = await response.json();
                if (response.status !== 200) throw new Error(data.message);
                if (!data.result.subject) return { search } as Result;
                const subjectDetails = extractSubjectDetails(data);

                return {
                    search,
                    company: {
                        bank_accounts: subjectDetails.accountNumbers || [],
                        name: subjectDetails.name,
                        address: subjectDetails.workingAddress || subjectDetails.residenceAddress || emptyField,
                        nip_value: subjectDetails.nip || emptyField,
                        regon_value: subjectDetails.regon || emptyField,
                    }
                } as Result;
            })
        );

        apiResult.set(results);
        goto("/results/");
    } catch (error) {
        console.error("Error fetching results:", error);
        throw error;
    }
}