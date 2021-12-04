
const production = process.env.NODE_ENV === 'production'
const currentDirectory = process.cwd()

const common = {
  bundle: true,
  inject: ['./node_modules/@onclick/superstatic/src/jsx-shim.js'],
  jsxFactory: 'jsx',
  nodePaths: ['src', 'src/modules'],
  write: false,
  loader: {
    '.js': 'jsx'
  }
}

exports.esbuild = {
  ...common,
  entryPoints: ['src/app.js'],
  sourcemap: production === false,
  define: {
    'PROD': production === true, // deprecated
    'STATIC': false, // deprecated
    'process.env.APP_PROD': production === true,
    'process.env.FF_STATIC_RENDER': false
  }
}

exports.esbuild_static = {
  ...common,
  platform: 'node',
  define: {
    'PROD': production === true, // deprecated
    'STATIC': true, // deprecated
    'process.env.APP_PROD': production === true,
    'process.env.FF_STATIC_RENDER': true
  }
}

exports.typescript = {
  compilerOptions: {
    allowJs: true,
    lib: ['DOM', 'ESNext'],
    target: 'ES2015'
  }
}

exports.uglify = {
  toplevel: true,
  compress: {
    drop_console: true,
    passes: 3
  },
  mangle: {
    toplevel: true
  }
}

exports.sass = {
  includePaths: ['src', 'src/modules', 'node_modules'],
  sourceMap: currentDirectory + '/src',
  sourceMapContents: true,
  sourceMapEmbed: true
}

exports.cleancss = {
  level: 2
}
