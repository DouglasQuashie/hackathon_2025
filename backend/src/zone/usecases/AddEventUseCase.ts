import { InputFactory, OutputFactory, UseCase, UseCaseResponseBuilder } from '@/common/interfaces/UseCase';
import { AddEventDto } from '@/zone/interfaces/dto/AddEventDto';
import EventSend from '@/zone/events/EventSend';
import { Zone } from '@/zone/interfaces/Zone';
import { IEventRepositoryAddZone } from '@/zone/interfaces/IEventRepository';

type Input = InputFactory<
	AddEventDto,
	{
		addEvent: IEventRepositoryAddZone["addEvent"];
	}
>
type Output = OutputFactory<Event>

export const AddEventUseCase: UseCase<Input, Output> = (deps) => {
	const { addEvent } = deps;
	return {
		async execute(data) {
			try {
				const event = await addEvent(data);
				EventSend.emit(data);

				return UseCaseResponseBuilder.success(201, event);
			} catch (error) {
				console.log('AddChat Error', error);
				return UseCaseResponseBuilder.error(500, "Something went wrong !");
			}
		}
	};

};

