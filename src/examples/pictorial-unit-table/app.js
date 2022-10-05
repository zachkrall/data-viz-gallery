const PICTORIAL_UNIT_IMAGE = `https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/bust-in-silhouette_1f464.png`
const NYC_FERRY_RIDERSHIP_URL = `https://data.cityofnewyork.us/resource/t5n6-gx8c.json`

const getData = async () => {
  const json = await d3.json(NYC_FERRY_RIDERSHIP_URL)

  const data = d3.rollup(
    json,
    (arr) => {
      return d3.sum(arr, (d) => d["boardings"])
    },
    (d) => {
      return d["stop"]
    }
  )

  return data
}

const main = async () => {
  const data = await getData()

  const chart = d3.select("#root")

  const make_heading = (g) => {
    g.append("thead")
      .append("tr")
      .selectAll("td")
      .data(["Stop Name", "", "Total"])
      .join("td")
      .text((d) => d)
  }

  const make_label = (g) => {
    g.append("td")
      .style("border-bottom", "1px solid black")
      .text((d) => d)
  }

  const make_num = (g) => {
    g.append("td")
      .style("border-bottom", "1px solid black")
      .text((d) => data.get(d))
  }

  const make_images = (g) => {
    g.append("td")
      .style("border-bottom", "1px solid black")
      .selectAll("span")
      .data((d) => {
        const count = Math.floor(data.get(d) / 100)
        const remainder = (data.get(d) % 100) / 100

        const fake_array = Array.from({ length: count }).fill(1.0)

        // [... 1.0, 1.0, 1.0, 1.0, 0.2]
        if (remainder > 0) {
          fake_array.push(remainder)
        }

        return fake_array
      })
      .join("span")
      .style("display", "inline-block")
      .style("background-image", `url(${PICTORIAL_UNIT_IMAGE})`)
      .style("background-size", "cover")
      .style("width", (d) => `${20 * d}px`)
      .style("height", "20px")
  }

  chart
    .append("table")
    .call(make_heading)
    .style("border-collapse", "collapse")
    .append("tbody")
    .selectAll("tr")
    .data(data.keys())
    .join("tr")
    .call(make_label)
    .call(make_images)
    .call(make_num)
}

main()
