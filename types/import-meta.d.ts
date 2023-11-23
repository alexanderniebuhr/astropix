// File vendored from Vite itself, as a workaround to https://github.com/vitejs/vite/issues/13309 until Vite 5 comes out

// This file is an augmentation to the built-in ImportMeta interface
// Thus cannot contain any top-level imports
// <https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation>

/* eslint-disable @typescript-eslint/consistent-type-imports */

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
	[key: string]: unknown;
	BASE_URL: string;
	MODE: string;
	DEV: boolean;
	PROD: boolean;
	SSR: boolean;
}
