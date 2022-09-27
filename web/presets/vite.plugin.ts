import { resolve } from 'path'
import { env } from './shared/env'
import vue from '@vitejs/plugin-vue'
import MetaLayouts from 'vite-plugin-vue-meta-layouts'
import VueMacros from 'unplugin-vue-macros/vite'
import Pages from 'vite-plugin-pages'
import Modules from 'vite-plugin-use-modules'
import Windicss from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import I18n from '@intlify/vite-plugin-vue-i18n'
import viteCompression from 'vite-plugin-compression';
import {
	NaiveUiResolver,
	VueUseComponentsResolver,
} from 'unplugin-vue-components/resolvers'

export default ()=>{
  return [
    vue(),
    //https://github.com/dishait/vite-plugin-vue-meta-layouts
    MetaLayouts({
			target: 'src/layouts', // 布局目录，默认 src/layouts
			defaultLayout: 'default', // 默认布局，默认为 default
			importMode: 'sync' // 加载模式，支持 sync 和 async。默认为自动处理，SSG 时为 sync，非 SSG 时为 async
		}),
    // https://github.com/sxzz/unplugin-vue-macros/blob/main/README-zh-CN.md
    VueMacros ({
			hoistStatic: true,
			defineOptions: true,
		}),
    Pages(),
    Modules({
      auto: true,
    }),
    // windicss 插件
		Windicss({
			// safelist: markdownWrapperClasses,
		}),
    Icons({
			autoInstall: true,
		}),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        'vue-i18n',
        '@vueuse/core',
      ],
      dirs:[
        'src/stores/**/*.ts',
        'src/composables/**/*.ts',
      ],
      dts: './presets/types/auto-imports.d.ts',
    }),
    Components({
        //自动加载的组件目录，默认值为 ['src/components']
        dirs: ['./src/components'],
        //组件名称包含目录，防止同名组件冲突
      directoryAsNamespace: true,

        //指定类型声明文件，为true时在项目根目录创建
        dts: "./presets/types/components.d.ts",
        //引入自动组件支持
        resolvers: [NaiveUiResolver(),VueUseComponentsResolver(),IconsResolver()]
    }),
    // i18n 国际化支持
    I18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, '../locales/**')],
    }),
    // 生产环境资源压缩
		viteCompression({
			// @ts-ignore
			algorithm: env.VITE_APP_COMPRESSINON_ALGORITHM,
		}),
  ]
}