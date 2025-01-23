import { AddChatDto } from '@/chat/interfaces/dto/AddChatDto';

export interface IChatRepositoryAddChat {
	addChat(chat: AddChatDto): Promise<void>
}
