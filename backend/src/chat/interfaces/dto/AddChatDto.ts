import z from "zod"

export const addChatDto = z.object({
	id: z.string(),
	createdAt: z.string(),
	content: z.string(),
	username: z.string(),
	zone: z.string()
})

export type AddChatDto = z.infer<typeof addChatDto>;
