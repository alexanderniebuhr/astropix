# a.stro.images

### Setup

```sh
moon setup && moon sync projects && moon sync codeowners && moon sync hooks
```

TYPECHECK
ROOT: https://moonrepo.dev/docs/guides/javascript/typescript-project-refs#on-all-projects

```plaintext
NOTES

"typesVersions": {
	"*": {
		"*": ["./src/index.tsx"],
		"icons": ["./src/icons.tsx"]
	}
}

"disableSourceOfProjectReferenceRedirect": true, // perf fix, need to build before editor
// "emitDeclarationOnly": true, // for packages
// noEmit: true, // for apps
"module": "NodeNext", // EsNext
"moduleResolution": "NodeNext", // bundler
"useUnknownInCatchVariables": true, // if (err instanceof Error) {}
To start, set the moduleResolution compiler option to "nodenext" (for packages) or "bundler" (for apps)
```
