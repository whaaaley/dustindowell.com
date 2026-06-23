/// <reference types="vite/client" />
/// <reference types="temporal-polyfill/global" />

declare const VITE_GIT_COMMIT: string
declare const VITE_GIT_BRANCH: string
declare const VITE_GIT_AUTHOR: string
declare const VITE_GIT_DATE: string
declare const VITE_BUILD_TIME: string

// File System Access API (not yet in standard TS DOM lib)
type FileSystemFileHandle = {
  createWritable: () => Promise<FileSystemWritableFileStream>
}

type FileSystemWritableFileStream = {
  write: (data: string | Blob | ArrayBuffer) => Promise<void>
  close: () => Promise<void>
}

type ShowSaveFilePickerOptions = {
  suggestedName?: string
  types?: Array<{
    description: string
    accept: Record<string, string[]>
  }>
}

interface Window {
  showSaveFilePicker: (options?: ShowSaveFilePickerOptions) => Promise<FileSystemFileHandle>
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
