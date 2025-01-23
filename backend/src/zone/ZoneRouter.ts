import { Hono } from 'hono';
import ZoneController from '@/zone/controllers/ZoneController';

const ZoneRouter = new Hono();

ZoneRouter.get(
	'/',
	ZoneController.getZones
);

export default ZoneRouter;
