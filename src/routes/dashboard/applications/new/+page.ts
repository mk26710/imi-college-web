import { getCollegeMajors, getDictionaryEduLevels } from "@/lib/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const eduLevels = await getDictionaryEduLevels({ fetcher: fetch });
	const majors = await getCollegeMajors({ fetcher: fetch });

	return { eduLevels, majors };
};
