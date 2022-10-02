import { Fragment } from "react"
import { ObjectInspector } from "react-inspector"
import { usePlayground } from "./usePlayground"

export const Console = ({ className }) => {
  const { logs, clearLogs } = usePlayground()
  return (
    <div className={className}>
      <button onClick={clearLogs}>Clear</button>
      Logs:
      {logs.map((log, index) => {
        const d = log.timestamp.toLocaleTimeString()

        const query =
          typeof log.message === "object" && "query" in log.message
            ? log.message["query"]
            : undefined

        const obj =
          typeof log.message === "object" && "response" in log.message
            ? log.message["response"]
            : undefined

        return (
          <Fragment key={index}>
            <div className="flex justify-between">
              <div>
                <ObjectInspector data={query} />
              </div>
              <div>{d}</div>
            </div>
            <div className="flex justify-between">
              <div>
                <ObjectInspector data={obj} />
              </div>
              <div>{d}</div>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}
