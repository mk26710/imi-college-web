import { z } from "zod";

type WithFetcherFn = {
	fetcher?: typeof fetch;
};

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

//

export const CreateDocumentIdentityBodySchema = z.object({
	typeId: z.number(),
	series: z.string(),
	number: z.string(),
	issuer: z.string(),
	issuedAt: z.string().date(),
	divisionCode: z.string(),
	nationalityId: z.number(),
});

export type CreateDocumentIdentityBody = z.infer<typeof CreateDocumentIdentityBodySchema>;

type CreateDocumentIdentityOptions = WithFetcherFn & {
	body: CreateDocumentIdentityBody;
	targetId: string;
};

export const createDocumentIdentity = async (opt: CreateDocumentIdentityOptions) => {
	const fetcher = opt.fetcher ?? fetch;

	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	const res = await fetcher(`/api/users/${opt.targetId}/documents/identity`, {
		headers,
		method: "POST",
		body: JSON.stringify(opt.body),
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return IdentityDocSchema.parse(data);
};
