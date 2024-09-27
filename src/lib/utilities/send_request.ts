import { goto } from "$app/navigation";
import type { Result } from "$lib/models/Result";
import type { Search } from "$lib/models/Search";
import { apiResult } from "$lib/store";
import { call_api } from "$lib/utilities/call_api";
import { extractSubjectDetails } from "$lib/utilities/extract_response";
import toast from "svelte-french-toast";
import { identifyNumber } from "./input_type";

export async function sendRequest(searches: Search[]): Promise<void> {
    const emptyField = 'Brak danych';
    try {
        const results = await toast.promise(
         Promise.all(
            searches.map(async (search) => {
                const searchData = search.id_value || search.bank_account;
                const response = await call_api(identifyNumber(searchData), searchData );
                const data = await response.json();
                const subject = data.result.subject || data.result.subjects[0];
                if (response.status !== 200) throw new Error(data.message);
                if (!subject) return { search } as Result;
                const subjectDetails = extractSubjectDetails(subject);

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
        ),
        {
            loading: 'Werifikacja danych...',
            success: 'Dane zweryfikowane',
            error: 'Błąd weryfikacji danych'
        });
        apiResult.set(results);
        goto("/results/");
    } catch (error) {
        console.error("Error fetching results:", error);
        throw error;
    }
}