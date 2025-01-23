import { Server } from "socket.io";
import { WsEvent } from "@/common/WsEvent";
import { WsMiddleware } from '@/common/middlewares/middleware';
import ChatController from "@/chat/controllers/ChatController";
import { addChatDto } from '@/chat/interfaces/dto/AddChatDto';

const io = new Server({
	cors: { origin: "*", }
});

io.on(WsEvent.CONNECTION, (socket) => {

	socket.on(WsEvent.CHAT_SEND, (data) => WsMiddleware(socket, data, addChatDto) && ChatController.onChat(socket, data));

});


export default io;
