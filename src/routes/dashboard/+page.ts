import {
	getApplications,
	getCollegeMajors,
	getDictionaryAppStatuses,
	getDictionaryEduLevels,
	getDictionaryGenders,
	getMyAddress,
} from "@/lib/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const address = await getMyAddress({ fetcher: fetch });
	const dictGenders = await getDictionaryGenders({ fetcher: fetch });
	const applications = await getApplications({ fetcher: fetch, targetId: "@me" });
	const majors = await getCollegeMajors({ fetcher: fetch });
	const appStatuses = await getDictionaryAppStatuses({ fetcher: fetch });
	const eduLevels = await getDictionaryEduLevels({ fetcher: fetch });

	return { address, dictGenders, applications, majors, appStatuses, eduLevels };
};
