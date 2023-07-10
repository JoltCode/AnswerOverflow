import type { APIMessageWithDiscordAccount } from '~api/utils/types';
import { useIsUserInServer } from './hooks';

export function useCanViewMessage(message: APIMessageWithDiscordAccount) {
	const isUserInServer = useIsUserInServer(message.serverId);
	if (isUserInServer === 'loading' && !message.public) return false;
	return message.public || isUserInServer === 'in_server';
}
