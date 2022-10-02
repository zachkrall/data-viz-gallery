import * as Babel from "@babel/standalone"

export const compileJS = (code: string) => {
  return Babel.transform(code, {
    presets: ["env"],
  })
}
