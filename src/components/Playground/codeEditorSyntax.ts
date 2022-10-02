import { HighlightStyle } from "@codemirror/language"
import { tags } from "@lezer/highlight"
import { tokens } from "./codeEditorTokens"

export const codeEditorSyntax = HighlightStyle.define([
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
])
