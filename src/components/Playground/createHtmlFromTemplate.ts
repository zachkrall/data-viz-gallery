import Mustache from "mustache"
import { compileJS } from "./compileJS"

export const createHtmlFromTemplate = (js: string, template?: string) => {
  const t =
    template ??
    `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<title>Playground</title>
			<link rel="stylesheet" href="https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css"/>
			</head>
			<body>
			<div id="root"></div>
			<script src="https://d3js.org/d3.v7.min.js"></script>
			<script type="text/javascript">
				{{{ jsCode }}}
			</script>
		</body>
	</html>
	`

  try {
    const view = {
      jsCode: compileJS(js).code,
    }

    return Mustache.render(t, view)
  } catch (e) {}
}
