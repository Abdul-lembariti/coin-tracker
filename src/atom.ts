import { atom } from 'recoil'

export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
})

export const back = atom({
  key: "Back",
  default: "/"
})