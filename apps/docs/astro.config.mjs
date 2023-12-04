import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightLinksValidator from 'starlight-links-validator'

export default defineConfig({
	site: 'https://docs.a.stro.pictures',
	integrations: [
		starlightLinksValidator(),
		starlight({
			title: 'Astropix Docs',
			social: {
				github: 'https://github.com/alexanderniebuhr/astropix/tree/main/packages/astropix',
			},
			sidebar: [
				{
					label: 'Guides',
					translations: {
						'zh-CN': '指南',
					},
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Reference',
					translations: {
						'zh-CN': '参考',
					},
					autogenerate: { directory: 'reference' },
				},
			],
			customCss: [
        './src/styles/custom.css',
      ],
			logo: {
        src: './src/assets/houston.webp',
      },
			editLink: {
        baseUrl: 'https://github.com/alexanderniebuhr/astropix/edit/main/apps/docs/',
      },
			defaultLocale: 'en',
			locales: {
        en: {
          label: 'English',
        },
        'zh-cn': {
          label: '简体中文',
          lang: 'zh-CN',
        },
        de: {
          label: 'Deutsch',
        },
      },
		}),
	],
})
