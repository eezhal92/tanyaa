import { defineConfig, mergeConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
    exclude:[
      ...configDefaults.exclude,
      'e2e/*',
      'tests-examples/*'
    ]
  }
}))
