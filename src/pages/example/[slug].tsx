import { getExample } from "../../lib/getExample"
import { getExamples } from "../../lib/getExamples"
import { GetStaticPaths, GetStaticProps } from "next"
import { stringOr } from "../../utils/stringOr"
import { Playground } from "../../components/Playground/Playground"
import Link from "next/link"

export type ExamplePageProps = {
  title: string
  code: string
}

export default function ExamplePage({ title, code }) {
  return (
    <div className={"flex flex-col fixed inset-0 gap-2"}>
      <div className={"border-b p-2 bg-gray-100 text-sm"}>
        <Link href="/">
          <a>{"←"}</a>
        </Link>
      </div>
      <Playground code={code} />
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
  const sourceCode = getExample(slug)

  return {
    props: {
      code: sourceCode,
      title: slug || "untitled",
    },
  }
}
