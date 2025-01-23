import { IChatRepositoryAddChat, IChatRepositoryGetChats } from '@/chat/interfaces/IChatRepository';

export interface IChatSQLiteRepository extends IChatRepositoryAddChat, IChatRepositoryGetChats {
}
