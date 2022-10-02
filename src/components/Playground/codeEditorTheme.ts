import { EditorView } from "@codemirror/view"

import { tokens } from "./codeEditorTokens"

export const codeEditorTheme = EditorView.theme(
  {
    "&": {
      fontFamily: "JetBrains Mono, Helvetica",
      background: tokens.colors.surface1,
    },
    ".cm-line": {
      fontSize: "13px",
      lineHeight: "1.6",
    },
    ".cm-gutters": {
      background: tokens.colors.surface1,
      borderRight: "1px solid #e4e7eb",
    },
    ".cm-activeLineGutter": {
      background: "rgba(0,0,0,0.05)",
      color: "#000",
    },
  },
  { dark: true }
)
