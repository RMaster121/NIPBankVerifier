import type { Company } from "./Company";
import type { Search } from "./Search";

export type Result = {
    search: Search;
    company: Company;
}