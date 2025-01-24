import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { logger } from 'hono/logger';

import ChatRouter from '@/zone/ChatRouter';
import ZoneRouter from '@/zone/ZoneRouter';
import { ContentfulStatusCode } from 'hono/utils/http-status';

import io from '@/ws.router';
import EventRouter from '@/zone/EventRouter';

const app = new Hono();

const PORT = Bun.env.PORT || 3000;

app.use('*', cors())
app.use(logger())

app.get("/", (c) => c.text("Hello, world!"))

app.route('/chat', ChatRouter);
app.route('/zone', ZoneRouter);
app.route('/event', EventRouter);

app.onError((handle, c) => {
	const cause = handle.cause as { status: ContentfulStatusCode; data: unknown };
	return c.json({ message: handle.message, status: cause.status, data: cause.data }, cause.status);
});

export default {
	port: PORT,
	fetch: app.fetch,
	websocket: io.listen(3001)
};
