import { getDocumentsIdentity } from "@/lib/api/doc-identity";
import { getDocumentsEducation } from "@/lib/api/doc-education";
import { getDictDictionaryEduDocTypes, getDictionaryIdDocTypes } from "@/lib/api/dictionaries";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const documentsIdentity = await getDocumentsIdentity({ fetcher: fetch, targetId: "@me" });
	const documentsEducation = await getDocumentsEducation({ fetcher: fetch, targetId: "@me" });

	const idDocTypes = await getDictionaryIdDocTypes({ fetcher: fetch });
	const eduDocTypes = await getDictDictionaryEduDocTypes({ fetcher: fetch });

	return { documentsIdentity, documentsEducation, idDocTypes, eduDocTypes };
};
