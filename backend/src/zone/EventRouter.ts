import { Hono } from 'hono';
import ChatController from '@/zone/controllers/ChatController';
import { CheckBodyMiddleware } from '@/common/middlewares/middleware';
import z from 'zod';
import EventController from '@/zone/controllers/EventController';
import { addEventDto } from '@/zone/interfaces/dto/AddEventDto';

const EventRouter = new Hono();

EventRouter.post(
	'/',
	async (c, next) => CheckBodyMiddleware(await c.req.json(), next, addEventDto),
	EventController.createEvent
);

export default EventRouter;
