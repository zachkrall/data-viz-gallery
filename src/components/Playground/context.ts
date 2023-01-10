import { createContext } from "react"

export type PlaygroundState = {
  code: string
  config: Record<string, unknown>
}

export const playgroundState = createContext(null)

export type PlaygroundDispatch = {}

export const playgroundDispatch = createContext(null)
