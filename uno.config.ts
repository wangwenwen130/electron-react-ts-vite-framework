import { defineConfig, transformerVariantGroup } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import presetWind3 from '@unocss/preset-wind3'

export default defineConfig({
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-c-c': 'flex justify-center items-center',
    'flex-col': 'flex flex-col',
    'flex-col-c-c': 'flex flex-col justify-center items-center',
    'input-bg':
      'bg-#ECEBEB focus:bg-#ECEBEB hover:bg-#ECEBEB hover:border-#ECEBEB focus:border-#ECEBEB focus-within:border-#ECEBEB',
  },
  presets: [
    /** UnoCss 默认预设 */
    // @ts-ignore
    presetWind3({}),
    // @ts-ignore
    presetRemToPx({
      // 默认情况下（1单位 = 0.25rem）html默认字体是16，改为4，每单位就是1px
      baseFontSize: 4,
    }),
  ],
  transformers: [transformerVariantGroup()],
})
