import { FC, useEffect, useRef, useState } from "react"
import { EditorState } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { basicSetup } from "../utils/codemirror/basicSetup"
import { syntaxHighlighting } from "@codemirror/language"
import {
  tokyoNightSyntax,
  tokyoNightTheme,
} from "../utils/codemirror/tokyoNight"
import { fullHeight } from "../utils/codemirror/fullHeight"
import { getLangSupportByFilename } from "../utils/codemirror/getLangSupportFromFilename"
import cx from "classnames"
import { debounce } from "../utils/debounce"

export type CodeEditorProps = {
  files: Record<string, string>
  onChange: (files: Record<string, string>) => Promise<void>
}

export const CodeEditor: FC<CodeEditorProps> = (props) => {
  const view = useRef<EditorView | null>(null)
  const container = useRef<HTMLDivElement | null>(null)

  // -- TABS --
  const tabs = Object.keys(props.files)
  const [activeTabID, setActiveTabID] = useState(tabs[0])

  // -- CONTENTS --
  const docs = useRef<Record<string, EditorState>>(
    Object.entries(props.files).reduce<Record<string, EditorState>>(
      (state, [id, content]) => {
        const langSupport = getLangSupportByFilename(id)

        const update = EditorView.updateListener.of(function () {
          storeCurrentState(id)

          const files = Object.entries(docs.current).reduce<
            Record<string, string>
          >((state, [key, editor]) => {
            const doc = editor.doc.toString()
            state[key] = doc
            return state
          }, {})

          props.onChange(files)
        })

        return {
          ...state,
          [id]: EditorState.create({
            doc: content || "whomp",
            extensions: [
              fullHeight,
              basicSetup(langSupport),
              syntaxHighlighting(tokyoNightSyntax),
              tokyoNightTheme,
              update,
            ],
          }),
        }
      },
      {}
    )
  )

  useEffect(() => {
    if (!container.current) return

    const state = docs.current[tabs[0]]
    const parent: HTMLElement = container.current

    view.current = new EditorView({
      state,
      parent,
    })

    return () => {
      view.current.destroy()
    }
  }, [])

  const storeCurrentState = (id: string) => {
    docs.current[id] = view.current.state
  }

  const retrieveState = (id: string) => {
    return docs.current[id]
  }

  const openTab = (id: string) => {
    if (!tabs.includes(id)) {
      return
    }
    storeCurrentState(activeTabID)
    setActiveTabID(id)
    const s = retrieveState(id)
    view.current?.setState(s)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#1A1B26] text-white border-b border-white/10">
        {tabs.map((tab, index) => {
          const isActive = activeTabID === tab
          return (
            <button
              className={cx(
                "p-2 text-sm font-medium opacity-40",
                isActive && ["opacity-100"]
              )}
              key={tab + index}
              onClick={() => openTab(tab)}
            >
              {tab}
            </button>
          )
        })}
      </div>
      <div ref={container} className="flex-grow overflow-hidden relative" />
    </div>
  )
}
