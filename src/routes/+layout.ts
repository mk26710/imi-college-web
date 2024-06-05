// export const ssr = false;

import { getCurrentUser } from "@/lib/api";
import type { LayoutLoad } from "./$types";
import { ROOT_DEP } from "@/lib/constants";

export const load: LayoutLoad = async ({ fetch, depends }) => {
	const currentUser = await getCurrentUser({ fetcher: fetch });

	depends(ROOT_DEP);

	return { currentUser };
};
