// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { project } from './src/project.config.ts';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: `Hilfe · ${project.siteName}`,
			defaultLocale: 'root',
			locales: {
				root: { label: 'Deutsch', lang: 'de' },
			},
			customCss: ['./src/styles/custom.css'],
			lastUpdated: false,
			pagination: true,
			sidebar: [
				{
					label: 'Erste Schritte',
					items: ['einstieg/ueberblick'],
				},
			],
		}),
	],
});
