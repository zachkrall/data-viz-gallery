import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { getExamples } from "../lib/getExamples"

export default function Home({ examples }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {examples.map((example) => (
          <div key={example}>
            <Link href={`/example/${example}`}>
              <a>{example}</a>
            </Link>
          </div>
        ))}
      </main>

      <footer></footer>
    </div>
  )
}

export const getStaticProps = async () => {
  const examples = getExamples()

  return {
    props: {
      examples,
    },
  }
}