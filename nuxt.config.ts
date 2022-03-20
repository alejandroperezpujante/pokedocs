import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // publicRuntimeConfig: {
  //   SUPABASE_URL: process.env.SUPABASE_URL,
  //   SUPABASE_KEY: process.env.SUPABASE_KEY
  // },
  buildModules: [
    '@nuxtjs/tailwindcss',
    // '@nuxtjs/supabase'
  ],
  // supabase: {
  //   url: process.env.SUPABASE_URL,
  //   key: process.env.SUPABASE_KEY,
  // }
})
