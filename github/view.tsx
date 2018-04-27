import * as React from "react"
import { Consumer } from "./program"

export default () => (
  <div>
    <Header />
    <NameInput />
    <LoadButton />
  </div>
)

const Header = () => (
  <Consumer>
    {({ model: { profile } }) => (
      <h1>{profile ? `${profile.name} (${profile.id})` : "Enter username"}</h1>
    )}
  </Consumer>
)

const NameInput = () => (
  <Consumer>
    {({ emit, model: { name } }) => (
      <input
        onChange={e => emit({ type: "NameUpdated", name: e.target.value })}
        value={name}
      />
    )}
  </Consumer>
)

const LoadButton = () => (
  <Consumer>
    {({ emit }) => (
      <button onClick={() => emit({ type: "LoadProfile" })}>Load!</button>
    )}
  </Consumer>
)
