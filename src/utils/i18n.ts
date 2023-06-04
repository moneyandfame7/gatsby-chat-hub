import { useEffect, useMemo, useState } from 'react'

import { I18N, createPluralize, useI18N as useI18NBase, useTranslate as useTranslateBase } from '@ayub-begimkulov/i18n'

import { LanguageCode } from '@types'

import { en } from './i18n-keys/en'

const timeout =
	<T>(timeout: number) =>
	(value: T) =>
		new Promise<T>((res) => {
			setTimeout(() => res(value), timeout)
		})

const pluralizeEn = createPluralize('en')

const pluralizeUk = createPluralize('uk')
const loadUk = () => import('./i18n-keys/uk').then((module) => module.uk).then(timeout(1_500))

export const i18n = new I18N({
	defaultLang: 'en',
	languages: {
		en: {
			keyset: en,
			pluralize: pluralizeEn,
		},
		uk: {
			keyset: loadUk,
			pluralize: pluralizeUk,
		},
	},
})

export const useLanguages = () => {
	return useMemo(
		() => [
			{
				value: 'uk',
				title: 'Українська',
			},
			{
				value: 'en',
				title: 'English',
			},
		],
		[]
	)
}

export const useI18N = useI18NBase<typeof i18n>
export const useTranslate = useTranslateBase<typeof i18n>

export function setLanguage(lngCode: LanguageCode, callback?: VoidFunction) {
	console.log({ lngCode })

	// console.log({ languageCodes })
}
type LanguageKeys = Parameters<typeof i18n.get>[0]
type LanguageKeyset = Record<LanguageKeys, string>
/* @todo - get translation from backend? load to cache?  create custom npm for fetch?*/
export const useTranslateForString = (key: LanguageKeys, lngCode?: LanguageCode) => {
	const [translation, setTranslation] = useState('')

	useEffect(() => {
		if (i18n.getLang() === lngCode) {
			setTranslation(i18n.get(key))
		}
		if (!lngCode) {
			throw new Error('Language code not defined')
		}
		;(async () => {
			const demo: LanguageKeyset = await import(`./i18n-keys/${lngCode}`).then((module) => module[lngCode])
			console.log(demo)
			setTranslation(demo[key])
		})()
	}, [])

	return translation
}

const fetchLngString = async (lngCode: LanguageCode, key: LanguageKeys) => {
	if (i18n.getLang() === lngCode) {
		return i18n.get(key)
	}
	const lngPack: LanguageKeyset = await import(`./i18n-keys/${lngCode}`).then((module) => module[lngCode])

	return lngPack[key]
}
