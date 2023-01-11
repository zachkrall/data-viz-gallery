import { FC } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"

export type CodeEditorProps = {
  code: string
  className?: string
  style?: React.CSSProperties
}

export const CodeEditor: FC<CodeEditorProps> = ({ code, className, style }) => {
  const extensions = [javascript()]

  return <CodeMirror value={code} extensions={extensions} theme={tokyoNight} />
}
