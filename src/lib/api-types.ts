import { z } from "zod";

export type UserDetails = {
	id: string;
	userId: string;
	firstName: string;
	middleName: string;
	lastName: string | null;
	genderId: number;
	birthday: string;
	tel: string;
	snils: string | null;
};

export type User = {
	id: string;
	createdAt: string;
	username: string;
	email: string;
	isVerified: boolean;
	needsDorm: boolean;
	permissions: string;
	details: UserDetails | null;
};

export const DictRegionSchema = z.object({
	id: z.number(),
	regionId: z.number(),
	value: z.string(),
	displayValue: z.string().nullish(),
	sortPriority: z.number(),
});

export type DictRegion = z.infer<typeof DictRegionSchema>;

export const DictTownTypeSchema = z.object({
	id: z.number(),
	value: z.string(),
	displayValue: z.string().nullish(),
});

export type DictTownType = z.infer<typeof DictTownTypeSchema>;

export const UserAddressSchema = z.object({
	id: z.string(),
	userId: z.string(),
	region: DictRegionSchema.nullish(),
	regionId: z.number(),
	townType: DictTownTypeSchema.nullish(),
	townTypeId: z.number(),
	town: z.string(),
	address: z.string(),
	postCode: z.string(),
});

export type UserAddress = z.infer<typeof UserAddressSchema>;

export const SetUserAddressSchema = UserAddressSchema.pick({
	regionId: true,
	townTypeId: true,
	town: true,
	address: true,
	postCode: true,
});

export type SetUserAddressBody = z.infer<typeof SetUserAddressSchema>;
