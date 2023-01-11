import { useState } from "react"
import { bundleFiles } from "../lib/bundleFiles"
import { CodeEditor } from "./CodeEditor"
import { Preview } from "./Preview"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

export type WorkspaceProps = {
  files: Record<string, string>
  initialBundle: string
}

export const Workspace = (props) => {
  const [files, setFiles] = useState(props.files)
  const [compiledOutput, setCompiledOutput] = useState(props.initialBundle)

  return (
    <PanelGroup
      direction="horizontal"
      className="w-full h-full flex overflow-auto"
    >
      <Panel minSize={20}>
        <div className="h-full" style={{ transform: `translateZ(0)` }}>
          <Preview html={compiledOutput} />
        </div>
      </Panel>
      <PanelResizeHandle className="group hover:opacity-100 opacity-50 text-white flex items-center p-0.5">
        <div className="w-1 h-8 bg-white rounded-full group-hover:h-16 transition-all"></div>
      </PanelResizeHandle>
      <Panel minSize={20}>
        <div className="overflow-auto h-full">
          <CodeEditor
            files={files}
            onChange={async (files) => {
              const output = await bundleFiles(files)
              setFiles(files)
              setCompiledOutput(output)
              console.log({ output })
            }}
          />
        </div>
      </Panel>
    </PanelGroup>
  )
}
