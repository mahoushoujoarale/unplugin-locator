type HotKey = 'ctrlKey' | 'altKey' | 'metaKey' | 'shiftKey'

type Editor = 'appcode' | 'atom' | 'atom-beta' | 'brackets' | 'clion' | 'code' | 'code-insiders' | 'codium' | 'emacs' | 'idea' | 'notepad++' | 'phpstorm' | 'pycharm' | 'rubymine' | 'sublime' | 'vim' | 'visualstudio' | 'webstorm'

export interface Options {
  hotKeys?: HotKey[]
  editor?: Editor
  silent?: boolean
  serverPort?: number
}
