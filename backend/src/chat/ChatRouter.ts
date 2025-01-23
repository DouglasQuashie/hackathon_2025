import { Hono } from 'hono';
import ChatController from '@/chat/controllers/ChatController';
import { CheckBodyMiddleware } from '@/common/middlewares/middleware';
import z from 'zod';

const ChatRouter = new Hono();

ChatRouter.get(
	'/',
	(c, next) => CheckBodyMiddleware(c.req.query('zone'), next, z.string({ message: 'Pas de zone renseignée' })),
	ChatController.getChats
);

export default ChatRouter;
