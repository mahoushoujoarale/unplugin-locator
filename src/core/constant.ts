import type { Options } from '../types'

export const defaultPort = 9527

export const defaultOptions: Options = {
  hotKeys: ['altKey', 'shiftKey'],
  serverPort: defaultPort,
}

export const MacHotKeyMap = {
  ctrlKey: '^control',
  altKey: '⌥option',
  metaKey: '⌘command',
  shiftKey: 'shift',
}

export const WindowsHotKeyMap = {
  ctrlKey: 'Ctrl',
  altKey: 'Alt',
  metaKey: '⊞Windows',
  shiftKey: '⇧Shift',
}
