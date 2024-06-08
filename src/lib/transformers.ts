export const emptyStringToNull = (value: string | null | undefined): string | null => {
	if (typeof value !== "string") {
		return value ?? null;
	}

	if (value === "" || value.length === 0) {
		return null;
	}

	return value;
};
