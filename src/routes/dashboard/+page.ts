import { getApplications, getDictionaryGenders, getMyAddress } from "@/lib/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const address = await getMyAddress({ fetcher: fetch });
	const dictGenders = await getDictionaryGenders({ fetcher: fetch });
	const applications = await getApplications({ fetcher: fetch, targetId: "@me" });

	return { address, dictGenders, applications };
};
