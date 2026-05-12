import init, { type InitOutput } from '@pkg/motion_core'

let wasm: InitOutput | null = null

export const createWasm = async () => {
  if (!wasm) {
    wasm = await init()
  }
  return wasm
}
