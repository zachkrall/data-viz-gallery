import { html } from "@codemirror/lang-html"
import { javascript } from "@codemirror/lang-javascript"
import { css } from "@codemirror/lang-css"

export const getLangSupportByFilename = (filename: string) => {
  const ext = /\.(.*)$/g.exec(filename)
  switch (ext[1]) {
    case "html": {
      return html
    }
    case "css": {
      return css
    }
    default: {
      return javascript
    }
  }
}
