import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import cn from './cn/index.json'
import en from './en/index.json'

const resources = {
  'en-US': {
    translation: en
  },
  'zh-CN': {
    translation: cn
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh-CN',
  interpolation: {
    escapeValue: false,
  },
  supportedLngs: ['zh-CN', 'en-US']
})

export default i18n
