import { Context } from 'hono';
import { GetZonesUseCase } from '@/zone/usecases/GetZonesUseCase';
import { ZoneSqliteRepository } from '@/zone/repositories/ZoneSqliteRepository';

const getZones = async (c: Context) => {
	const result = await GetZonesUseCase(ZoneSqliteRepository()).execute();

	if (!result.isSuccess)
		return c.json({ status: result.status, message: result.message, data: null }, result.status);

	return c.json({ status: result.status, message: 'Success', data: result.data }, result.status);
};


export default {
	getZones,
};
