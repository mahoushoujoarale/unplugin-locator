import type { Options } from 'tsup'

export default <Options>{
  entryPoints: [
    'src/*.ts',
    'src/core/client.ts',
  ],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: false,
  minify: true,
  onSuccess: 'npm run build:fix',
}
