import prisma from '@/common/db';
import { IChatSQLiteRepository } from '@/chat/interfaces/IChatSQLiteRepository';

export const ChatSqliteRepository = (): IChatSQLiteRepository => {
	return {
		async addChat(chat): Promise<void> {
			await prisma.chat.create({
				data: chat
			});
		},
	};
};
