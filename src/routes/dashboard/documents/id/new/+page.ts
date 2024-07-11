import { getDictionaryIdDocTypes, getDictionaryNationalities } from "@/lib/api/dictionaries";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const idDocTypes = await getDictionaryIdDocTypes({ fetcher: fetch });
	const nationalities = await getDictionaryNationalities({ fetcher: fetch });

	return { idDocTypes, nationalities };
};
