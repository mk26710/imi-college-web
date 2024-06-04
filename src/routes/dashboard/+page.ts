import { getMyAddress } from "@/lib/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	const address = await getMyAddress();

	return { address };
};
