import {
  CSSProperties,
  FC,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react"

export type PreviewProps = {
  html: string
}

export const Preview: FC<PreviewProps> = ({ html, ...props }) => {
  const [title, setTitle] = useState("Untitled")
  const wrapper = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    const container = wrapper.current

    const f = document.createElement("iframe")
    f.setAttribute("src", "")
    f.className = `absolute inset-0 bg-white w-full h-full rounded-b`

    container?.appendChild(f)

    f.contentWindow?.document.open()
    f.contentWindow?.document.write(html)

    setTitle(f.contentDocument.querySelector("title")?.innerText || "Untitled")

    return () => {
      f.remove()
      f.contentWindow?.document.close()
    }
  }, [html])

  return (
    <div className={"flex-grow h-full flex flex-col"}>
      <div
        className={`p-2 bg-[#1A1B26] text-white text-sm font-medium border-b border-white/10`}
      >
        {title}
      </div>
      <div ref={wrapper} className={"relative flex-grow"}></div>
    </div>
  )
}
