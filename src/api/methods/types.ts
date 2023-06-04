import type * as methods from './index'

export type Methods = typeof methods
export type MethodsArgs<T extends keyof Methods> = Parameters<Methods[T]>
export type MethodResponse<T extends keyof Methods> = ReturnType<Methods[T]>
