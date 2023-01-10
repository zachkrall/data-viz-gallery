import fs from "fs"
import path from "path"
import yaml from "js-yaml"

export const getExample = async (slug: string) => {
  const srcDir = path.resolve(process.cwd(), "src")
  const exampleDir = path.resolve(srcDir, "examples")
  const examplePath = path.resolve(exampleDir, slug)

  try {
    const file = fs.readFileSync(`${examplePath}/app.js`, "utf8")

    const config = yaml.load(
      fs.readFileSync(`${examplePath}/config.yml`, "utf8")
    )
    return {
      contents: file,
      config,
    }
  } catch (e) {
    return null
  }
}
