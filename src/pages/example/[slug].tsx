import { getExamples } from "../../lib/getExamples"
import { GetStaticPaths, GetStaticProps } from "next"
import { stringOr } from "../../utils/stringOr"
import { Workspace } from "../../components/Workspace"
import { getFiles } from "../../lib/getFiles"
import { bundleFiles } from "../../lib/bundleFiles"

export type ExamplePageProps = {
  files: Record<string, string>
  initialBundle: string
}

export default function ExamplePage({ files, initialBundle }) {
  return (
    <div className={"bg-black flex fixed inset-0 overflow-auto"}>
      <Workspace files={files} initialBundle={initialBundle} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const examples = getExamples()

  return {
    paths: [
      ...examples.map((example) => {
        return {
          params: {
            slug: example,
          },
        }
      }),
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ExamplePageProps> = async (
  context
) => {
  const slug = stringOr(context.params.slug, null)
  const files = await getFiles(slug)
  const initialBundle = await bundleFiles(files)

  return {
    props: {
      files,
      initialBundle,
      title: slug || "untitled",
    },
  }
}
