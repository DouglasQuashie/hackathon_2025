import z from "zod"

export const addEventDto = z.object({
	id: z.string(),
	createdAt: z.string(),
	title: z.string(),
	content: z.string(),
	type: z.string(),
	zoneId: z.string(),
});

export type AddEventDto = z.infer<typeof addEventDto>;
