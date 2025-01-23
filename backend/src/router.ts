import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { logger } from 'hono/logger';

import { ContentfulStatusCode } from 'hono/utils/http-status';

const app = new Hono();

const PORT = Bun.env.PORT || 3000;

app.use('*', cors())
app.use(logger())

app.get("/", (c) => c.text("Hello, world!"))

app.onError((handle, c) => {
	const cause = handle.cause as { status: ContentfulStatusCode; data: unknown };
	return c.json({ message: handle.message, status: cause.status, data: cause.data }, cause.status);
});

export default {
	port: PORT,
	fetch: app.fetch
};
