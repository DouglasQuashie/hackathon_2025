import { AddChatDto } from '../interfaces/dto/AddChatDto';
import ChatSend from '@/zone/events/ChatSend';
import { InputFactory, OutputFactory, UseCase, UseCaseResponseBuilder } from '@/common/interfaces/UseCase';
import { IChatRepositoryAddChat } from '@/zone/interfaces/IChatRepository';
import { Chat } from '@/common/entities/Chat';

type Input = InputFactory<
	AddChatDto,
	{
		addChat: IChatRepositoryAddChat["addChat"];
	}
>
type Output = OutputFactory<Chat>

export const AddChatUseCase: UseCase<Input, Output> = (deps) => {
	const { addChat } = deps;
	return {
		async execute(data) {
			try {
				const chat = await addChat(data);
				ChatSend.emit(data);

				return UseCaseResponseBuilder.success(201, chat);
			} catch (error) {
				console.log('AddChat Error', error);
				return UseCaseResponseBuilder.error(500, "Something went wrong !");
			}
		}
	};

};

