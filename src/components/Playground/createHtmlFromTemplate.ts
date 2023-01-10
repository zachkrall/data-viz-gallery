import Mustache from "mustache"
import { compileJS } from "./compileJS"

export const createHtmlFromTemplate = (
  js: string,
  external_css: string[],
  external_js: string[],
  template?: string
) => {
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
      cssResources: external_css,
      jsResources: external_js,
    }

    return Mustache.render(t, view)
  } catch (e) {}
}
