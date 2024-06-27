import { z } from "zod";

export const EducationDocSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	userId: z.string(),
	statusId: z.number(),
	typeId: z.number(),
	series: z.string(),
	number: z.string(),
	issuer: z.string(),
	issuedAt: z.string(),
	gradYear: z.number(),
	issuerRegionId: z.number(),
});

type GetDocumentsEducationOptions = {
	fetcher?: typeof fetch;
	targetId: string;
};

export const getDocumentsEducation = async (opt: GetDocumentsEducationOptions) => {
	const fetcher = opt?.fetcher ?? fetch;

	const res = await fetcher(`/api/users/${opt.targetId}/documents/education`, {
		method: "GET",
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return EducationDocSchema.array().parse(data);
};
