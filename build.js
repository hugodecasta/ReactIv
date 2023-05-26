import chokidar from 'chokidar'
import fs from 'fs'
import { rollup } from 'rollup'
import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'

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

    try {

        console.log('bundling...')
        await bundle()
        console.log('bundle done !')
    } catch (e) {
        console.log('error while bundling !')
        console.error(e)
    }

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

// ----------------------------------------------- BUNDLERS

const inner_builds = [
    './src/MD2',
    './src/core',
]

async function inn_bundler() {

    const entry_name = '__index__.js'

    for (const inner_dir of inner_builds) {

        const module_name = inner_dir.split('/').pop()

        const inner_files = fs.readdirSync(inner_dir)
            .filter(e => e != entry_name)
        const code_lines = [
            `const ${module_name}={}`,
            ...inner_files.map(file => {
                const comp_name = file.replace('.js', '')
                return `import ${comp_name} from "./${file}"`
            }),
            'export default { ' + inner_files.map(file => {
                const comp_name = file.replace('.js', '')
                return comp_name
            }).join(',') + ' } ',
        ]
        const code = code_lines.join('\n')
        fs.writeFileSync(`${inner_dir}/${entry_name}`, code)
    }
}

async function bundle() {

    await inn_bundler()

    // -------------------------- INPUT OPTIONS
    const input_options = {
        input: ENTRY_PATH,
        treeshake: true,
        plugins: [
            resolve({
                moduleDirectories: ['node_modules']
            })
        ]
    }
    // -------------------------- OUTPUT OPTIONS
    const base_output_options = {
        format: 'es',
        plugins: [
            terser({
                mangle: false,
                format: {
                    comments: (_, comment) => {
                        return comment.value.includes('*\n     *')
                    }
                }
            }),
        ],
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