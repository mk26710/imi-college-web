import { getDocumentsIdentity } from "@/lib/api/doc-identity";
import { getDocumentsEducation } from "@/lib/api/doc-education";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const documentsIdentity = await getDocumentsIdentity({ fetcher: fetch, targetId: "@me" });
	const documentsEducation = await getDocumentsEducation({ fetcher: fetch, targetId: "@me" });

	return { documentsIdentity, documentsEducation };
};
