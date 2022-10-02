import { javascript } from "@codemirror/lang-javascript"
import { basicSetup } from "codemirror"
import { EditorView, ViewUpdate } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { FC, useDeferredValue, useEffect, useRef } from "react"
import { usePlayground } from "./usePlayground"
import { useDebouncedCallback } from "use-debounce"
import { codeEditorTheme } from "./codeEditorTheme"
import { codeEditorSyntax } from "./codeEditorSyntax"
import { syntaxHighlighting } from "@codemirror/language"

export type CodeEditorProps = {
  className?: string
  style?: React.CSSProperties
}

export const CodeEditor: FC<CodeEditorProps> = ({ className, style }) => {
  const { code, updateCode } = usePlayground()

  const editorDivRef = useRef<HTMLDivElement | null>(null)
  const editorViewRef = useRef<EditorView | null>(null)

  const debounceUpdateCode = useDebouncedCallback((code: string) => {
    updateCode(code)
  })

  useEffect(() => {
    const update = EditorView.updateListener.of((event: ViewUpdate) => {
      const code = event.state.doc.toString()
      debounceUpdateCode(code)
    })

    const editor = editorDivRef.current
    const view = (editorViewRef.current = new EditorView({
      state: EditorState.create({
        doc: "",
        extensions: [
          basicSetup,
          javascript(),
          update,
          codeEditorTheme,
          syntaxHighlighting(codeEditorSyntax),
        ],
      }),
      parent: editor,
    }))

    return () => {
      view?.destroy()
      editorViewRef.current = null
    }
  }, [debounceUpdateCode])

  useEffect(() => {
    const doc = editorViewRef.current?.state.doc
    const selection = editorViewRef.current.state.selection
    const firstRange = selection.ranges[0]
    const anchor = firstRange?.anchor || selection.mainIndex

    const tr = editorViewRef?.current?.state.update({
      changes: {
        from: 0,
        to: doc.length,
        insert: code,
      },
      selection: {
        anchor: Math.max(anchor >= doc.length ? doc.length : anchor, 0),
      },
    })

    try {
      editorViewRef.current?.dispatch(tr)
    } catch (e) {}
  }, [code])

  return (
    <div
      className={className}
      style={{
        borderRadius: "5px",
        border: "1px solid rgba(0,0,0,0.1)",
        ...style,
      }}
    >
      <div ref={editorDivRef} style={{ maxHeight: "100%", overflow: "auto" }} />
    </div>
  )
}
