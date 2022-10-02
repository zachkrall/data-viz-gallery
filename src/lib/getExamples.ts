import fs from 'fs'
import path from 'path'

export const getExamples = () => {
	const srcDir = path.resolve(process.cwd(), 'src');
	
	const examples = fs.readdirSync(path.resolve(srcDir, 'examples'))
  	
	return examples.map(example => {
		return example.replace(/\.js$/, '')
	})
}