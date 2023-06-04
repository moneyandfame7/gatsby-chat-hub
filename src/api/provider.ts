import * as methods from './methods'
import { MethodResponse, Methods, MethodsArgs } from './methods/types'

export function callApi<T extends keyof Methods>(name: T, ...args: MethodsArgs<T>): MethodResponse<T> {
	console.log(name, args)

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	return methods[name](...args) as MethodResponse<T>
}
