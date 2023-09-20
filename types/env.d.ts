/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PUBLIC_PATH: string
	readonly VITE_USER_API_URL: string
	readonly VITE_LOGIN_URL: string
	readonly VITE_USE_MOCK_DATA: string
	readonly VITE_APP_MARKDOWN: string
	readonly VITE_APP_API_URL: string
	readonly VITE_VUE_DEFINE_MODEL: string
	readonly VITE_DROP_CONSOLE: string
	readonly VITE_DROP_DEBUG: string 
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}