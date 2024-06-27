import { z } from "zod";

export const IdentityDocSchema = z.object({
	id: z.string(),
  createdAt: z.string(),
	userId: z.string(),
	statusId: z.number(),
	typeId: z.number(),
	series: z.string(),
	number: z.string(),
	issuer: z.string(),
	issuedAt: z.string(),
	divisionCode: z.string(),
	nationalityId: z.number(),
});

type GetDocumentsIdentityOptions = {
	fetcher?: typeof fetch;
	targetId: string;
};

export const getDocumentsIdentity = async (opt: GetDocumentsIdentityOptions) => {
	const fetcher = opt?.fetcher ?? fetch;

	const res = await fetcher(`/api/users/${opt.targetId}/documents/identity`, {
		method: "GET",
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return IdentityDocSchema.array().parse(data);
};
