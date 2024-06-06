import { getDictionaryRegions, getDictionaryTownTypes, getMyAddress } from "@/lib/api";
import type { PageLoad } from "./$types";
import { compareRegions } from "@/lib";

export const load: PageLoad = async ({ fetch }) => {
	const [dictRegions, dictTownTypes, address] = await Promise.all([
		getDictionaryRegions({ fetcher: fetch }),
		getDictionaryTownTypes({ fetcher: fetch }),
		getMyAddress({ fetcher: fetch }),
	]);

	dictRegions?.sort(compareRegions);

	return { dictRegions, dictTownTypes, address };
};
