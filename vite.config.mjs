import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  // depending on your application, base can also be "/"
  base: '',
  // plugins: [react(), viteTsconfigPaths()],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
    viteTsconfigPaths,
    // Note, for local development, comment this out. For prod, uncomment it
    nodePolyfills(),
    react(),
  ],
  dedupe: ['react-dom', 'styled-components', 'react', '@interchain-ui/react'],
  build: {
    commonjsOptions: { transformMixedEsModules: true }, // Change
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  // define: {
  //   // By default, Vite doesn't include shims for NodeJS/
  //   // necessary for segment analytics lib to work
  //   global: {},
  // },
  // Node.js global to browser globalThis
  define: {
    global: 'globalThis',
  },
});
