import { getDictionaryRegions, getDictionaryTownTypes } from "@/lib/api";
import type { PageLoad } from "./$types";
import { compareRegions } from "@/lib";

export const load: PageLoad = async () => {
	const [dictRegions, dictTownTypes] = await Promise.all([
		getDictionaryRegions(),
		getDictionaryTownTypes(),
	]);

	dictRegions?.sort(compareRegions);

	return { dictRegions, dictTownTypes };
};
