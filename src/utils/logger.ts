type LoggerVariant = 'info' | 'successfully' | 'error' | 'warn'
interface LoggerParams {
  title: string
  value?: any
  variant?: LoggerVariant
}

export class Logger {
  public static info({ title, value, variant = 'info' }: LoggerParams) {
    if (variant === 'successfully') {
      console.log(`%c ${title}`, 'color: green; font-weight:600; font-size: 16px;', value ? value : '')
    } else {
      console.log(`%c ${title}`, 'color: blue; font-weight:600; font-size: 16px;', value ? value : '')
    }
  }

  public static error({ title, value }: LoggerParams) {
    console.log(`%c ${title}`, 'color: red; font-size: 16px;', value)
  }

  public static warn({ title, value }: LoggerParams) {
    console.log(`%c ${title}`, 'color: yellow; font-size: 16px;', value)
  }

  private log() {}
}
