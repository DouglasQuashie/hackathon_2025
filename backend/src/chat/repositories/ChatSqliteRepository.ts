import prisma from '@/common/db';
import { IChatSQLiteRepository } from '@/chat/interfaces/IChatSQLiteRepository';
import { Chat } from '@/common/entities/Chat';

export const ChatSqliteRepository = (): IChatSQLiteRepository => {
	return {
		getChats(zone: string): Promise<Chat[]> {
			return prisma.chat.findMany({
				where: { zone },
				orderBy: { createdAt: 'asc' },
				take: 50
			});
		},
		async addChat(chat): Promise<void> {
			await prisma.chat.create({
				data: chat,
			});
		}
	};
};
