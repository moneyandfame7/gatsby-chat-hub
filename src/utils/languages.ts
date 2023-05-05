/* Return label and image */
export const getLanguageInfo = (language: string) => {
  switch (language) {
    case 'en':
      return {
        label: 'English',
        photo: 'https://flagcdn.com/w20/us.png',
        set: 'https://flagcdn.com/w40/us.png 2x'
      }
    case 'uk':
      return {
        label: 'Ukrainian',
        photo: 'https://flagcdn.com/w20/ua.png',
        set: 'https://flagcdn.com/w40/ua.png 2x'
      }
    default:
      return null
  }
}
