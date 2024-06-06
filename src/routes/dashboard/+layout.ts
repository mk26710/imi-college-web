import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ parent }) => {
	const { currentUser } = await parent();
	if (currentUser == null) {
		return error(401, "Необходимо авторизоваться на сайте");
	}

	return null;
};
