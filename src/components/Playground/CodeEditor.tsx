import { FC, useEffect, useMemo, useRef } from "react"
import { useCodeMirror } from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"

export type CodeEditorProps = {
  code: string
  className?: string
  style?: React.CSSProperties
}

export const CodeEditor: FC<CodeEditorProps> = ({ code, className, style }) => {
  const editor = useRef()

  const extensions = [javascript()]

  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    value: code,
  })

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current)
    }
  }, [editor.current])

  return (
    <div
      className={className}
      style={{
        borderRadius: "5px",
        border: "1px solid rgba(0,0,0,0.1)",
        ...style,
      }}
    >
      <div ref={editor} style={{ maxHeight: "100%", overflow: "auto" }} />
    </div>
  )
}
