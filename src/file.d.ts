declare module '*.png' {
  const content: string
  export default content
}

declare module '*.svg' {
  const content: React.FC<React.SVGAttributes<SVGElement>> | string
  export default content
}

declare module '*.gif'

declare module '*.scss'
