import * as React from "react"

export type Config<Model, Msg> = {
  init(): UpdateResult<Model, Msg>
  subscriptions?(emit: (msg: Msg) => void): void
  update(model: Model, msg: Msg): UpdateResult<Model, Msg>
}

export type UpdateResult<Model, Msg> = Model | [Model, Promise<Msg>]

type Context<Model, Msg> = {
  emit: (msg: Msg) => void
  model: Model
}

type Props<Model, Msg> = {
  children: {
    emit: (msg: Msg) => void
    model: Model
  }
}

export function program<Model, Msg>(config: Config<Model, Msg>) {
  const { init, subscriptions, update } = config
  const { Consumer, Provider } = createMandatoryContext<Context<Model, Msg>>()

  class Program extends React.Component<{}, Model> {
    constructor(props: {}) {
      super(props)

      const initial = init()

      if (Array.isArray(initial)) {
        this.state = initial[0]
        initial[1].then(this.emit)
      } else {
        this.state = initial
      }
    }

    emit = (msg: Msg) => {
      this.handleUpdate(update(this.state, msg))
    }

    handleUpdate = (result: UpdateResult<Model, Msg>) => {
      let model = null

      if (Array.isArray(result)) {
        model = result[0]
        result[1].then(this.emit)
      } else {
        model = result
      }

      this.setState(model)
    }

    render() {
      console.log(this.state)

      return (
        <Provider value={{ emit: this.emit, model: this.state }}>
          {this.props.children}
        </Provider>
      )
    }
  }

  return {
    Consumer,
    Program,
  }
}

function createMandatoryContext<T>() {
  const context = React.createContext<T>((undefined as any) as T)

  const consumer: React.Consumer<T> = ({ children }) => (
    <context.Consumer>
      {state =>
        state ? (
          children(state)
        ) : (
          <span style={{ color: "red" }}>Missing Context</span>
        )
      }
    </context.Consumer>
  )

  return {
    Consumer: consumer,
    Provider: context.Provider,
  }
}
