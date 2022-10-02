import fs from 'fs'
import path from 'path'

export const getExample = (slug: string) => {
	const srcDir = path.resolve(process.cwd(), 'src');
	const exampleDir = path.resolve(srcDir, 'examples')
	const examplePath = path.resolve(exampleDir, slug)

	const file = fs.readFileSync(`${examplePath}.js`, 'utf8')

	return file;
}