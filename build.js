import chokidar from 'chokidar'
import fs from 'fs'
import { rollup } from 'rollup'
import terser from '@rollup/plugin-terser'

// ----------------------------------------------- ARGS

const LIVE = process.argv.includes('-live')

// ----------------------------------------------- PATHS

const SRC_DIR = './src/'
const ENTRY_FILE_PATH = 'index.js'
const ENTRY_PATH = SRC_DIR + ENTRY_FILE_PATH

const EXPORTS = [
    './index.js',
    './demo/reactiv.js'
]

// ----------------------------------------------- BUNDLE MANAGMENT

let bundling = false
let allow_bundle_timer = 1000

async function bundler_entry() {

    if (bundling) return
    bundling = true

    console.log('bundling...')
    await bundle()
    console.log('bundle done !')

    if (LIVE) {
        setTimeout(() => bundling = false, allow_bundle_timer)
    }

}

// ----------------------------------------------- LISTENERS

if (LIVE) {
    console.log('launching live bundler')
    const watch = chokidar.watch(SRC_DIR)
    watch.on('all', bundler_entry)
} else {
    await bundler_entry()
}

// ----------------------------------------------- BUNDLER

async function bundle() {

    // -------------------------- INPUT OPTIONS
    const input_options = {
        input: ENTRY_PATH,
        treeshake: true
    }
    // -------------------------- OUTPUT OPTIONS
    const base_output_options = {
        format: 'es',
        plugins: [terser({
            mangle: false
        })]
    }

    // -------------------------- BUNDLE PROCESS

    // ---- create bundle
    const bundle = await rollup(input_options)
    const bundled = await bundle.generate({ ...base_output_options })

    // ---- fix bundle
    const code = bundled.output[0].code
        .replace(/export ?{ ?(.*?) as default ?};/gm, (_, gp) => `export default ${gp};`)

    // ---- write bundle
    for (const filepath of EXPORTS) {
        fs.writeFileSync(filepath, code)
    }

}