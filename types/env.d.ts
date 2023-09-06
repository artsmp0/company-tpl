/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
	readonly VITE_APP_API_URL: string
	readonly VITE_PUBLIC_PATH: string
	readonly VITE_USER_API_URL: string
	readonly VITE_LOGIN_URL: string
	readonly VITE_USE_MOCK_DATA: string 
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}