export type Chat = {
	id: string;
	createdAt: Date;
	username: string;
	zone: string;
	content: string;
}

type ChatWithoutId = Omit<Chat, 'id'>;
