import { AuthStore } from './auth'
import { Messages } from './messages'

export class Api {
	public static auth = new AuthStore()
	public static messages = new Messages()
	// public constructor() {
	// 	makePersistable(
	// 		{
	// 			...this.auth,
	// 			...this.messages,
	// 		},
	// 		{
	// 			name: 'root-store',
	// 			properties: ['error'],
	// 			storage: hasWindow() ? localStorage : undefined,
	// 		}
	// 	)
	// }
}
