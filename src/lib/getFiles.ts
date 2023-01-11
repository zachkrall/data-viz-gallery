import fs from "fs"
import path from "path"

export const getFiles = async (dir: string) => {
  const dirPath = path.resolve(process.cwd(), "src", "examples", dir)
  const contents = await fs.promises.readdir(dirPath)

  return contents.reduce<Record<string, string>>((state, filepath) => {
    if (filepath === "meta.yml") {
      return state
    }

    const data = fs.readFileSync(path.resolve(dirPath, filepath), {
      encoding: "utf8",
    })
    state[filepath] = data

    return state
  }, {})
}
