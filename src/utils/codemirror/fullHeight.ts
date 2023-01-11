import { Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"

export const fullHeight: Extension = EditorView.theme({
  "&": {
    position: "absolute",
    inset: "0 0 0 0",
    height: "100%",
  },
})
