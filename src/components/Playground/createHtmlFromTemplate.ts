import Mustache from "mustache"
import { compileJS } from "./compileJS"

export const createHtmlFromTemplate = (
  js: string,
  external_resources: string[],
  template?: string
) => {
  const { cssResources, jsResources } = external_resources.reduce<{
    css: string[]
    js: string[]
  }>(
    (acc, cur) => {
      if (cur.endsWith(".css")) {
        acc.css.push(cur)
      }
      if (cur.endsWith(".js")) {
        acc.js.push(cur)
      }
      return acc
    },
    { css: [], js: [] }
  )

  const t =
    template ??
    `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			
			<title>Playground</title>
				
			{{#cssResources}}
				<link rel="stylesheet" href="{{.}}" />
			{{/cssResources}}

		</head>
		<body>
			<div id="root"></div>
			
			{{#jsResources}}
				<script src="{{.}}"></script>
			{{/jsResources}}

			<script type="text/javascript">
				{{{ jsCode }}}
			</script>
		</body>
	</html>
	`

  try {
    const view = {
      jsCode: compileJS(js).code,
      cssResources,
      jsResources,
    }

    return Mustache.render(t, view)
  } catch (e) {}
}
