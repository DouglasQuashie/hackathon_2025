import { Socket } from 'socket.io';
import { AddChatDto } from '@/chat/interfaces/dto/AddChatDto';
import { AddChatUseCase } from '@/chat/usecases/AddChatUseCase';
import { ChatSqliteRepository } from '@/chat/repositories/ChatSqliteRepository';
import { WsEvent } from '@/common/WsEvent';

export const onChat = async (socket: Socket, data: AddChatDto) => {
	const result = await AddChatUseCase(ChatSqliteRepository()).execute(data);
	console.log(result);
	socket.emit(WsEvent.SEND_CHAT, data);
};


export default {
	onChat
};
