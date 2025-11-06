import { useKeyboard, useRenderer } from "@opentui/solid"
import { createSimpleContext } from "./helper"

export const { use: useSuspend, provider: SuspendProvider } = createSimpleContext({
  name: "Suspend",
  init: () => {
    const renderer = useRenderer()
    useKeyboard((evt) => {
      if (evt.ctrl && evt.name == "z") {
        renderer.suspend()
        renderer.currentRenderBuffer.clear()
        process.kill(process.pid, "SIGTSTP")
      }
    })
    process.once("SIGCONT", () => {
      renderer.currentRenderBuffer.clear()
      renderer.resume()
      renderer.requestRender()
    })

    return async () => {}
  },
})
