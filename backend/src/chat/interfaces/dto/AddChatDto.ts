import z from "zod"

export const addChatDto = z.object({
	content: z.string(),
	username: z.string(),
	zone: z.string()
})

export type AddChatDto = z.infer<typeof addChatDto>;
