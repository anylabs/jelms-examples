import * as React from "react"
import { render } from "react-dom"
import { Program } from "./program"
import View from "./view"

render(
  <Program>
    <View />
  </Program>,
  document.getElementById("app"),
)
