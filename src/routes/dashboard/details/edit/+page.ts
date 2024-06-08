import { getDictionaryGenders } from "@/lib/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	return {
		dictGenders: await getDictionaryGenders({ fetcher: fetch }),
	};
};
