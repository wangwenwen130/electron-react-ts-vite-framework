export const MODE = import.meta.env.MODE
export const isDev = MODE === 'development'
export const isProd = MODE === 'production'

export const Host =  {
   development: "",
   production: "",
   test: ""
}