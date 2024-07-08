import { z } from "zod";

type WithFetcherFn = {
	fetcher?: typeof fetch;
};

export const DictIdDocTypeSchema = z.object({
	id: z.number(),
	value: z.string(),
	displayValue: z.string().nullish(),
});

export type DictIdType = z.infer<typeof DictIdDocTypeSchema>;

export const getDictionaryIdDocTypes = async (opt?: WithFetcherFn) => {
	const fetcher = opt?.fetcher ?? fetch;

	const res = await fetcher("/api/dictionaries/iddoctypes", {
		method: "GET",
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return DictIdDocTypeSchema.array().parse(data);
};

export const DictEduDocTypeSchema = z.object({
	id: z.number(),
	value: z.string(),
	displayValue: z.string().nullish(),
});

export type DictEduDocType = z.infer<typeof DictEduDocTypeSchema>;

export const getDictDictionaryEduDocTypes = async (opt?: WithFetcherFn) => {
	const fetcher = opt?.fetcher ?? fetch;

	const res = await fetcher("/api/dictionaries/edudoctypes", {
		method: "GET",
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return DictEduDocTypeSchema.array().parse(data);
};
