import { getMyAddress } from "@/lib/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const address = await getMyAddress({ fetcher: fetch });

	return { address };
};
