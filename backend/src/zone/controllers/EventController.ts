import { Context } from 'hono';
import { GetZonesUseCase } from '@/zone/usecases/GetZonesUseCase';
import { ZoneSqliteRepository } from '@/zone/repositories/ZoneSqliteRepository';
import { AddEventUseCase } from '@/zone/usecases/AddEventUseCase';
import { EventSqliteRepository } from '@/zone/repositories/EventSqliteRepository';
import { AddEventDto } from '@/zone/interfaces/dto/AddEventDto';

const createEvent = async (c: Context) => {
	const body = await c.req.json<AddEventDto>();
	const result = await AddEventUseCase(EventSqliteRepository()).execute(body);

	if (!result.isSuccess)
		return c.json({ status: result.status, message: result.message, data: null }, result.status);

	return c.json({ status: result.status, message: 'Success', data: result.data }, result.status);
};


export default {
	createEvent,
};
