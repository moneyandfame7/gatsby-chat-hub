export type NullableObj<T> = { [K in keyof T]: T[K] | null }

export type NullableField<T> = T | null
