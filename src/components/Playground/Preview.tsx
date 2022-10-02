import { CSSProperties, FC, useDeferredValue, useEffect, useRef } from "react"
import { createHtmlFromTemplate } from "./createHtmlFromTemplate"
import { usePlayground } from "./usePlayground"
import cx from "classnames"

export type PreviewProps = {
  className?: string
  style?: CSSProperties
}

export const Preview: FC<PreviewProps> = ({ className, style }) => {
  const wrapper = useRef<HTMLIFrameElement | null>(null)
  const { code, addLog } = usePlayground()
  const deferredCode = useDeferredValue(code)
  const html = createHtmlFromTemplate(deferredCode)

  useEffect(() => {
    const container = wrapper.current
    const f = document.createElement("iframe")
    f.setAttribute("src", "")

    Object.assign(f.style, {
      width: "100%",
      height: "100%",
    })

    container?.appendChild(f)

    const messageHandler = (event: MessageEvent) => {
      const type = event.data.type
      const payload = event.data.payload

      switch (type) {
        case "log": {
          addLog(payload)
          return
        }
      }
    }

    f.contentWindow?.document.open()
    f.contentWindow?.document.write(html)

    window.addEventListener("message", messageHandler)

    return () => {
      f.remove()
      window.removeEventListener("message", messageHandler)
      f.contentWindow?.document.close()
    }
  }, [addLog, html])

  return (
    <div ref={wrapper} className={cx(`flex`, className)} style={style}></div>
  )
}