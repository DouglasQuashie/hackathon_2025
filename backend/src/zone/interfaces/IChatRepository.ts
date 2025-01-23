import { AddChatDto } from '@/zone/interfaces/dto/AddChatDto';
import { Chat } from '@/common/entities/Chat';

export interface IChatRepositoryAddChat {
	addChat(chat: AddChatDto): Promise<Chat>
}

export interface IChatRepositoryGetChats {
	getChats(zone: string): Promise<Chat[]>
}

