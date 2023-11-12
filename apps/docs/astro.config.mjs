import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
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
						'zh-CN': 'Guias',
					},
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Reference',
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
        // English docs in `src/content/docs/en/`
        en: {
          label: 'English',
        },
        // Simplified Chinese docs in `src/content/docs/zh-cn/`
        'zh-cn': {
          label: '简体中文',
          lang: 'zh-CN',
        },
        // Arabic docs in `src/content/docs/ar/`
        de: {
          label: 'Deutsch',
        },
      },
		}),
	],
})
