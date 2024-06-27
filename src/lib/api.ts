import { z } from "zod";
import {
	UserDetailsSchema,
	type Application,
	type DictEduLevel,
	type DictRegion,
	type DictTownType,
	type CollegeMajor as CollegeMajor,
	type SetUserAddressBody,
	type User,
	type UserAddress,
	CollegeMajorSchema,
	DictEduLevelSchema,
	DictAppStatusSchema,
} from "./api-types";

type FetchFn = typeof fetch;

export type APIError = {
	success: false;
	status: number;
	message: string;
	details: unknown;
};

const RegisterBody = z.object({
	firstName: z.string().min(1),
	middleName: z.string().min(1),
	lastName: z.string().optional().nullable().default(null),
	birthday: z.string().transform((s) => s + "T00:00:00Z"),
	genderId: z.coerce.number(),
	username: z.string().regex(/^[a-zA-Z_0-9]+$/i),
	password: z.string().min(6).max(72),
	email: z.string().email(),
	tel: z.string(),
	needsDorm: z.coerce.boolean().optional().default(false),
});

type RegisterBody = z.infer<typeof RegisterBody>;

type RegisterSuccessResponse = {
	id: string;
	createdAt: string;
	username: string;
	email: string;
	isVerified: boolean;
	role: string;
	needsDorm: boolean;
};

type RegisterResult =
	| { success: true; data: RegisterSuccessResponse }
	| { success: false; error: APIError };

export async function registerUser(body: Record<string, unknown>): Promise<RegisterResult> {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	const parsed = RegisterBody.safeParse(body);
	if (parsed.success !== true) {
		console.info(parsed.error.format());
		throw parsed.error;
	}

	const raw = JSON.stringify(parsed.data);

	const req = await fetch("/api/users", {
		method: "POST",
		headers,
		body: raw,
		redirect: "follow",
	});

	if (!req.ok) {
		const err = await req.json();
		// TODO: handle properly
		alert("ERROR SEE CONSOLE");
		console.error(err);
		return { success: false, error: err };
	}

	const data = (await req.json()) as RegisterSuccessResponse;
	return { success: true, data };
}

const LoginRequestBody = z.object({
	username: z.string(),
	password: z.string().max(72),
});

type LoginOptins = {
	body: unknown;
};

export async function login(opt: LoginOptins): Promise<boolean> {
	const parsed = await LoginRequestBody.safeParseAsync(opt.body);
	if (!parsed.success) {
		alert("ERROR VALIDATING INPUT");
		console.error(parsed.error);
		return false;
	}

	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	const raw = JSON.stringify(parsed.data);

	const req = await fetch("/api/tokens?cookie=true", {
		method: "POST",
		headers,
		body: raw,
		credentials: "same-origin",
	});

	if (req.ok) {
		console.debug("logged in!");
		return true;
	} else {
		console.debug("not logged in, check credentials");
		return false;
	}
}

export const logout = async () => {
	const res = await fetch("/api/tokens?cookie=unset", {
		method: "DELETE",
		credentials: "same-origin",
	});

	return res.status;
};

type GetCurrentUser = {
	fetcher?: FetchFn;
};

export const getCurrentUser = async (opt?: GetCurrentUser) => {
	const fetcher = opt?.fetcher ?? fetch;

	const res = await fetcher("/api/users/@me", {
		method: "GET",
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return data as User;
};

export const SetCurrentUserDetailsBodySchema = UserDetailsSchema.pick({
	firstName: true,
	middleName: true,
	lastName: true,
	genderId: true,
	birthday: true,
	tel: true,
	snils: true,
	needsDorm: true,
});

export type SetCurrentUserDetailsBody = z.infer<typeof SetCurrentUserDetailsBodySchema>;

type SetCurrentUserDetailsOptions = {
	fetcher?: FetchFn;
	body: SetCurrentUserDetailsBody;
};

export const setCurrentUserDetails = async (opt: SetCurrentUserDetailsOptions) => {
	const fetcher = opt?.fetcher ?? fetch;

	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	const res = await fetcher("/api/users/@me/details", {
		method: "PUT",
		credentials: "same-origin",
		headers,
		body: JSON.stringify(opt.body),
	});

	if (!res.ok) {
		return null;
	}

	return res.status;
};

type GetMyAddressOptions = {
	fetcher?: FetchFn;
};

export const getMyAddress = async (opt?: GetMyAddressOptions) => {
	const fetcher = opt?.fetcher ?? fetch;

	const res = await fetcher("/api/users/@me/address", {
		method: "GET",
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return data as UserAddress;
};

type SetMyAddressOptions = {
	fethcer?: FetchFn;
	body: SetUserAddressBody;
};

export const setMyAddress = async (opt: SetMyAddressOptions) => {
	const fethcer = opt.fethcer ?? fetch;

	const res = await fethcer("/api/users/@me/address", {
		method: "PUT",
		credentials: "same-origin",
		body: JSON.stringify(opt.body),
		headers: { "Content-Type": "application/json" },
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return data;
};

type GetRegionsOptions = {
	fetcher?: FetchFn;
};

export const getDictionaryRegions = async (opt?: GetRegionsOptions) => {
	const fetcher = opt?.fetcher ?? fetch;

	const res = await fetcher("/api/dictionaries/regions", {
		method: "GET",
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return data as DictRegion[];
};

type GetTownTypesOptions = {
	fetcher?: FetchFn;
};

export const getDictionaryTownTypes = async (opt?: GetTownTypesOptions) => {
	const fetcher = opt?.fetcher ?? fetch;

	const res = await fetcher("/api/dictionaries/towntypes", {
		method: "GET",
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return data as DictTownType[];
};

type GetDictionaryGendersOptions = {
	fetcher?: FetchFn;
};

export const getDictionaryGenders = async (opt?: GetDictionaryGendersOptions) => {
	const fetcher = opt?.fetcher ?? fetch;

	const res = await fetcher("/api/dictionaries/genders", {
		method: "GET",
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return data as DictRegion[];
};

type GetDictionaryEduLevelsOptions = {
	fetcher?: FetchFn;
};

export const getDictionaryEduLevels = async (opt?: GetDictionaryEduLevelsOptions) => {
	const fetcher = opt?.fetcher ?? fetch;

	const res = await fetcher("/api/dictionaries/edulevels", {
		method: "GET",
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return data as DictEduLevel[];
};

type GetCollegeMajorsOptions = {
	fetcher?: FetchFn;
};

export const getCollegeMajors = async (opts?: GetCollegeMajorsOptions) => {
	const fetcher = opts?.fetcher ?? fetch;

	const res = await fetcher("/api/dictionaries/majors", {
		method: "GET",
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return data as CollegeMajor[];
};

type GetDictAppStatusesOptions = {
	fetcher?: FetchFn;
};

export const getDictionaryAppStatuses = async (opt?: GetDictAppStatusesOptions) => {
	const fetcher = opt?.fetcher ?? fetch;

	const rest = await fetcher("/api/dictionaries/appstatuses", {
		method: "GET",
		credentials: "same-origin",
	});

	const data = await rest.json();

	return DictAppStatusSchema.array().parse(data);
};

type GetApplicationsOptions = {
	fetcher?: FetchFn;
	targetId?: string;
};

export const getApplications = async (opt?: GetApplicationsOptions) => {
	const fetcher = opt?.fetcher ?? fetch;
	const targetid = opt?.targetId ?? "@me";

	const res = await fetcher(`/api/users/${targetid}/applications`, {
		method: "GET",
		credentials: "same-origin",
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return data as Application[];
};

export const SendApplicationSchema = z.object({
	majorId: CollegeMajorSchema.shape.id,
	eduLevelId: DictEduLevelSchema.shape.id,
});

type SendApplicationOptions = {
	targetId: User["id"];
	body: z.infer<typeof SendApplicationSchema>;
};

export const sendApplication = async (opt: SendApplicationOptions) => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	const res = await fetch(`/api/users/${opt.targetId}/applications`, {
		method: "POST",
		credentials: "same-origin",
		body: JSON.stringify(opt.body),
	});

	if (!res.ok) {
		return null;
	}

	const data = await res.json();

	return data as Application;
};
