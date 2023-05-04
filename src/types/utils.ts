export type Nullable<T> = { [K in keyof T]: T[K] | null }

export type NullableField<T> = T | null
