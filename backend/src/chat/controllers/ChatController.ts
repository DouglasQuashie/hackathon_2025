import { Socket } from 'socket.io';
import { AddChatDto } from '@/chat/interfaces/dto/AddChatDto';
import { AddChatUseCase } from '@/chat/usecases/AddChatUseCase';
import { ChatSqliteRepository } from '@/chat/repositories/ChatSqliteRepository';
import { WsEvent } from '@/common/WsEvent';
import io from '@/ws.router';
import { Context } from 'hono';
import { GetChatUseCase } from '@/chat/usecases/GetChatsUseCase';

const getChats = async (c: Context) => {
	const zone = c.req.query('zone') as string;
	const result = await GetChatUseCase(ChatSqliteRepository()).execute({ zone });

	if (!result.isSuccess)
		return c.json({ status: result.status, message: result.message, data: null }, result.status);

	return c.json({ status: result.status, message: 'Success', data: result.data }, result.status);
};

export const onChat = async (socket: Socket, data: AddChatDto) => {
	const result = await AddChatUseCase(ChatSqliteRepository()).execute(data);
	if (!result.isSuccess)
		return;

	io.to(data.zone).emit(WsEvent.SEND_CHAT, result.data);
};

export default {
	getChats,
	onChat
};
