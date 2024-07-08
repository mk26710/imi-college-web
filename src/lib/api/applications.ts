import { z } from "zod";
import { UserSchema } from "../api-types";

type WithFetcherFn = {
	fetcher?: typeof fetch;
};

export const ApplicationSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	userId: UserSchema.shape.id,
	majorId: z.string(),
	eduLevelId: z.number(),
	statusId: z.number(),
	priority: z.number(),
});

export type Application = z.infer<typeof ApplicationSchema>;

type DeleteUserApplicationOptions = WithFetcherFn & {
	targetUserId: string;
	applicationId: string;
};

export const deleteUserApplication = async (opt: DeleteUserApplicationOptions) => {
	const fetcher = opt.fetcher ?? fetch;

	const res = await fetcher(`/api/users/${opt.targetUserId}/applications/${opt.applicationId}`, {
		method: "DELETE",
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	// const data = await res.json();

	return res.status;
};
