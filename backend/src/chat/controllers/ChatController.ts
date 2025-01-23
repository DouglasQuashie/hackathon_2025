import { Socket } from 'socket.io';
import { AddChatDto } from '@/chat/interfaces/dto/AddChatDto';
import { AddChatUseCase } from '@/chat/usecases/AddChatUseCase';
import { ChatSqliteRepository } from '@/chat/repositories/ChatSqliteRepository';
import { WsEvent } from '@/common/WsEvent';
import io from '@/ws.router';

export const onChat = async (socket: Socket, data: AddChatDto) => {
	const result = await AddChatUseCase(ChatSqliteRepository()).execute(data);
	console.log(result);
	if (!result.isSuccess)
		return;


	io.emit(WsEvent.SEND_CHAT, result.data);
};

export default {
	onChat
};
