import { defineConfig, transformerVariantGroup } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['flex-c-c', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['flex-col-c-c', 'flex flex-col justify-center items-center'],
  ],
  transformers: [transformerVariantGroup()],
})
