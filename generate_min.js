import chokidar from 'chokidar'
import webpack from 'webpack'
import * as url from 'url'
import fs from 'fs'
import { Parcel } from '@parcel/core'
import { rollup } from 'rollup'

// ----------------------------------------------- PATHS

const SRC_DIR = './src/'
const ENTRY_FILE_PATH = 'index.js'
const ENTRY_PATH = SRC_DIR + ENTRY_FILE_PATH

const EXPORTS = [
    './reactiv.js',
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

    setTimeout(() => bundling = false, allow_bundle_timer)

}

// ----------------------------------------------- LISTENERS

const listeners = [
    SRC_DIR,
]

for (const path of listeners) {
    const watch = chokidar.watch(path)
    watch.on('all', bundler_entry)
}

// ----------------------------------------------- BUNDLER

async function bundle() {

    const input_options = {
        input: ENTRY_PATH,
        treeshake: true
    }
    const base_output_options = {
        format: 'es',
    }

    const bundle = await rollup(input_options)
    const bundled = await bundle.generate({ ...base_output_options })

    const code = bundled.output[0].code
        .replace(/export ?{ ?(.*?) as default ?};/gm, (_, gp) => `export default ${gp};`)

    for (const filepath of EXPORTS) {
        fs.writeFileSync(filepath, code)
    }

}