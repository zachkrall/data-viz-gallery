import { FC, useEffect, useRef } from "react"
import { CodeEditor } from "./CodeEditor"
import { Console } from "./Console"
import { Preview } from "./Preview"
import { usePlayground } from "./usePlayground"

export type PlaygroundProps = {
  code: string
}

export const Playground: FC<PlaygroundProps> = ({ code }) => {
  const { updateCode } = usePlayground()

  const initialCode = useRef(code)

  initialCode.current = code

  useEffect(() => {
    console.log("initial code", initialCode.current)
    updateCode(initialCode.current)
  }, [updateCode])

  return (
    <div className={"p-2 overflow-hidden flex-auto flex items-stretch gap-4"}>
      <Preview className={"w-1/2"} />
      <div className={"flex flex-col w-1/2"}>
        <CodeEditor
          style={{
            // maxHeight: "100%",
            overflow: "hidden",
          }}
        />
      </div>
    </div>
  )
}
