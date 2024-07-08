import { z } from "zod";
import { emptyStringToNull } from "./transformers";

export const UserDetailsSchema = z.object({
	id: z.string(),
	userId: z.string(),
	firstName: z.string().trim(),
	middleName: z.string().trim(),
	lastName: z.string().trim().nullable().transform(emptyStringToNull),
	genderId: z.number(),
	birthday: z.string().datetime(),
	tel: z.string(),
	snils: z.string(),
	needsDorm: z.coerce.boolean(),
});

export type UserDetails = z.infer<typeof UserDetailsSchema>;

export const UserSchema = z.object({
	id: z.string(),
	createdAt: z.string().datetime(),
	username: z.string(),
	email: z.string().email(),
	isVerified: z.boolean(),
	permissions: z.string(),
	details: UserDetailsSchema.nullable(),
});

export type User = z.infer<typeof UserSchema>;

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

export const DictDenderSchema = z.object({
	id: z.number(),
	value: z.string(),
	displayValue: z.string().nullable(),
});

export type DictGender = z.infer<typeof DictRegionSchema>;

export const UserAddressSchema = z.object({
	id: z.string(),
	userId: UserSchema.shape.id,
	region: DictRegionSchema.nullish(),
	regionId: z.number(),
	townType: DictTownTypeSchema.nullish(),
	townTypeId: DictTownTypeSchema.shape.id,
	town: z.string(),
	address: z.string(),
	postCode: z.string(),
});

export type UserAddress = z.infer<typeof UserAddressSchema>;

export const DictEduLevelSchema = z.object({
	id: z.number(),
	value: z.string(),
	displayValue: z.string().nullish(),
});

export type DictEduLevel = z.infer<typeof DictEduLevelSchema>;

export const DictAppStatusSchema = z.object({
	id: z.number(),
	isDefault: z.boolean(),
	value: z.string(),
	displayValue: z.string().nullish(),
});

export type DictAppStatus = z.infer<typeof DictAppStatusSchema>;

export const SetUserAddressSchema = UserAddressSchema.pick({
	regionId: true,
	townTypeId: true,
	town: true,
	address: true,
	postCode: true,
});

export type SetUserAddressBody = z.infer<typeof SetUserAddressSchema>;

export const CollegeMajorSchema = z.object({
	id: z.string(),
	name: z.string(),
	prefix: z.string(),
	base: z.string(),
	nameOfficial: z.string(),
	budget: z.boolean(),
	code: z.string(),
});

export type CollegeMajor = z.infer<typeof CollegeMajorSchema>;


