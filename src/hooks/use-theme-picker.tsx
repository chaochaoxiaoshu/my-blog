import { Dispatch, SetStateAction, useEffect, useState } from 'react'

/*
 * 为使用户设置可以覆盖系统设置，使用 window.matchMedia() 代替 CSS MediaQuery
 * 通过向 root 元素（html）添加 'data-theme' 标签来实现 DarkMode 切换
 * （在 global.scss 中有 [data-theme=dark] 选择器用于添加Dark Style）
 * 当监听到系统样式变化或用户手动选择主题时，
 * 调用 applyTheme() 添加 'data-theme' 标签实现切换主题
 */

type Theme = 'system' | 'light' | 'dark'
type UseThemePicker = () => [Theme, Dispatch<SetStateAction<Theme>>]

export const useThemePicker: UseThemePicker = () => {
  const [mediaQuery, setMediaQuery] = useState<MediaQueryList>()

  const [theme, setTheme] = useState<Theme>(
    localStorage.theme ? localStorage.theme : 'system'
  )

  const applyTheme = () => {
    if (theme === 'system') {
      if (mediaQuery?.matches) {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
    } else {
      if (theme === 'light') {
        document.documentElement.removeAttribute('data-theme')
      } else {
        document.documentElement.setAttribute('data-theme', 'dark')
      }
    }
  }

  useEffect(() => {
    setMediaQuery(window.matchMedia('(prefers-color-scheme: dark)'))
    applyTheme()
    mediaQuery?.addEventListener('change', applyTheme)
    return () => {
      mediaQuery?.removeEventListener('change', applyTheme)
    }
  }, [])

  useEffect(() => {
    theme === 'system'
      ? localStorage.removeItem('theme')
      : (localStorage.theme = theme)
    applyTheme()
  }, [theme])

  return [theme, setTheme]
}
