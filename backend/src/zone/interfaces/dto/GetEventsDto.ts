import z from 'zod';

export const getEventsDto = z.object({
	type: z.string({ message: 'Vous devez fournir un type' }),
	zone: z.string({ message: 'Vous devez fournir une zone' }),
});

export type GetEventsDto = z.infer<typeof getEventsDto>;
