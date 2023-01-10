import { FC, useEffect, useRef } from "react"
import { CodeEditor } from "./CodeEditor"
import { Console } from "./Console"
import { playgroundDispatch, playgroundState } from "./context"
import { Preview } from "./Preview"
import { usePlayground } from "./usePlayground"

export type PlaygroundProps = {
  code: string
  config: Record<string, unknown>
}

export const Playground: FC<PlaygroundProps> = ({ code, config }) => {
  return (
    <playgroundState.Provider
      value={{
        code,
        config,
      }}
    >
      <playgroundDispatch.Provider value={null}>
        <div
          className={"p-2 overflow-hidden flex-auto flex items-stretch gap-4"}
        >
          <Preview className={"w-1/2"} />
          <div className={"flex flex-col w-1/2"}>
            <CodeEditor
              code={code}
              style={{
                // maxHeight: "100%",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      </playgroundDispatch.Provider>
    </playgroundState.Provider>
  )
}
