import { Server, Socket } from 'socket.io';
import { WsEvent } from "@/common/WsEvent";
import { WsMiddleware } from '@/common/middlewares/middleware';
import ChatController from "@/zone/controllers/ChatController";
import { addChatDto } from '@/zone/interfaces/dto/AddChatDto';

const io = new Server({
	cors: { origin: "*", }
});

io.on(WsEvent.CONNECTION, (socket) => {

	socket.on(WsEvent.JOIN_ZONE, (zone: string) => socket.join(zone));

	socket.on(WsEvent.CHAT_SEND, (data) => WsMiddleware(socket, data, addChatDto) && ChatController.onChat(socket, data));

});


export default io;
