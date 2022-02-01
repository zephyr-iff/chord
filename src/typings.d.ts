interface CSSModule {
  [className: string]: string
}

// type shims for CSS modules

declare module '*.module.scss' {
  const cssModule: CSSModule
  export = cssModule
}

declare module '*.module.css' {
  const cssModule: CSSModule
  export = cssModule
}
declare module '@rebass/forms' {
  const rebassForms = { Label: any, Input: any }
  export = rebassForms
}
declare module '*.svg'
declare module '*.png'
declare module '*.gif'

declare module 'save-svg-as-png'
