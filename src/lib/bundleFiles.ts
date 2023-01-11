import { Plugin, unified } from "unified"
import rehypeParse from "rehype-parse"
import rehypeStringify from "rehype-stringify"
import mime from "mime-types"
import { visit } from "unist-util-visit"

const insertSrc: (files: Record<string, string>) => Plugin = (files) => {
  return () => (tree) => {
    visit(tree, "element", (node: any) => {
      // insert script tag contents
      if (node.tagName === "script") {
        let src = node["properties"]["src"]

        node["children"].push({
          type: "text",
          value: files[src],
        })

        node["properties"]["src"] = undefined
      }

      // insert stylesheets
      console.log(node)
      if (
        node.tagName === "link" &&
        node["properties"]["rel"].includes("stylesheet")
      ) {
        node["tagName"] = "style"
        let src = node["properties"]["href"]
        node["properties"]["type"] = "text/css"

        node["children"] = [
          {
            type: "text",
            value: files[src],
          },
        ]

        node["properties"]["href"] = undefined
      }
      return node
    })
  }
}

export const bundleFiles = async (
  files: Record<string, string>
): Promise<string> => {
  let html = ``

  if (files["index.html"]) {
    let data = await unified()
      .use(rehypeParse)
      .use(insertSrc(files))
      .use(rehypeStringify)
      .process(files["index.html"])

    html = String(data)

    return html
  }

  return `error`
}
