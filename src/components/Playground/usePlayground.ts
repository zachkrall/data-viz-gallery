import { useContext } from "react"
import { playgroundDispatch, PlaygroundState, playgroundState } from "./context"

export const usePlayground = () => {
  const state = useContext(playgroundState)
  const dispatch = useContext(playgroundDispatch)

  return [state, dispatch]
}

export const usePlaygroundSelector = (
  selector: (state: PlaygroundState) => any
) => {
  const state = useContext(playgroundState)
  return state ? selector(state) : null
}
