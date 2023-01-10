import { HighlightStyle } from "@codemirror/language"
import { tags } from "@lezer/highlight"
import { tokens } from "./codeEditorTokens"
import { createTheme } from "@uiw/codemirror-themes"

export const codeEditorSyntax = createTheme({
  theme: "light",
  settings: {
    background: "#ffffff",
    foreground: "#75baff",
    caret: "#5d00ff",
    selection: "#036dd626",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "#fff",
    gutterForeground: "#8a919966",
  },
  styles: [
    {
      tag: tags.comment,
      color: tokens.syntax.comment.color,
      fontStyle: tokens.syntax.comment.fontStyle,
    },
    {
      tag: tags.keyword,
      color: tokens.syntax.keyword,
    },
    {
      tag: tags.tagName,
      color: tokens.syntax.tag,
    },
    {
      tag: tags.punctuation,
      color: tokens.syntax.punctuation,
    },
    {
      tag: tags.definitionOperator,
      color: tokens.syntax.definition,
    },
    {
      tag: tags.propertyName,
      color: tokens.syntax.property,
    },
    {
      tag: tags.string,
      color: tokens.syntax.string,
    },
  ],
})
