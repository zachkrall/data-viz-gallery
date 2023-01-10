import create, { StateCreator } from "zustand"
import produce from "immer"

export type Log = {
  message: unknown
  timestamp: Date
}

export type PlaygroundState = {
  code: string
  updateCode: (code: string) => void
  logs: Array<Log>
  addLog: (message: unknown) => void
  clearLogs: () => void
}

const playgroundCreator: StateCreator<PlaygroundState> = (set) => {
  return {
    code: ``,
    updateCode: (code: string) => {
      return set(
        produce((state) => {
          state.code = code
        })
      )
    },
    logs: [],
    addLog: (message: string) => {
      return set(
        produce((state) => {
          state.logs.push({
            message,
            timestamp: new Date(),
          })
        })
      )
    },
    clearLogs: () => {
      return set(
        produce((state) => {
          state.logs = []
        })
      )
    },
  }
}

export const usePlayground = create<PlaygroundState>()(playgroundCreator)
