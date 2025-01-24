import { Zone } from '@/zone/interfaces/Zone';
import { AddZoneDto } from '@/zone/interfaces/dto/AddEventDto';

export interface IZoneRepositoryGetZones {
	getZones(): Promise<Zone[]>;
}

export interface IZoneRepositoryAddZone {
	addZone(addZone: AddZoneDto): Promise<Zone>;
}

