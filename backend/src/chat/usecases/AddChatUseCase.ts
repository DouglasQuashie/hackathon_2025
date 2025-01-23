import { AddChatDto } from '../interfaces/dto/AddChatDto';
import ChatSend from '@/chat/events/ChatSend';
import { InputFactory, OutputFactory, UseCase, UseCaseResponseBuilder } from '@/common/interfaces/UseCase';
import { IChatRepositoryAddChat } from '@/chat/interfaces/IChatRepository';

type Input = InputFactory<
	AddChatDto,
	{
		addChat: IChatRepositoryAddChat["addChat"];
	}
>
type Output = OutputFactory<AddChatDto>

export const AddChatUseCase: UseCase<Input, Output> = (deps) => {
	const { addChat } = deps;
	return {
		async execute(data) {
			try {
				await addChat(data);
				ChatSend.emit(data);

				return UseCaseResponseBuilder.success(201, data);
			} catch (error) {
				console.log('AddChat Error', error);
				return UseCaseResponseBuilder.error(500, "Something went wrong !");
			}
		}
	};

};

