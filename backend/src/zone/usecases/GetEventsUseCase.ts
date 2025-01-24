import { InputFactory, OutputFactory, UseCase, UseCaseResponseBuilder } from '@/common/interfaces/UseCase';
import { IEventRepositoryGetEvents } from '@/zone/interfaces/IEventRepository';
import { Event } from '@/zone/interfaces/Event';
import { GetEventsDto } from '@/zone/interfaces/dto/GetEventsDto';

type Input = InputFactory<
	GetEventsDto,
	{
		getEvents: IEventRepositoryGetEvents['getEvents'];
	}
>;

type Output = OutputFactory<Event[]>;

export const GetEventsUseCase: UseCase<Input, Output> = (deps) => {
	const { getEvents } = deps;
	return {
		async execute(data) {
			try {
				const events = await getEvents(data);

				return UseCaseResponseBuilder.success(200, events);
			} catch (error) {
				console.log('GetChat Error', error);
				return UseCaseResponseBuilder.error(500, 'Something went wrong !');
			}
		}
	};

};

