import * as React from 'react'
import { Link } from 'gatsby'

import { header, menu, navigator, actions } from './header.module.scss'
import Logo from '../images/svg/logo.svg'
import Menu from '../images/svg/menu.svg'
import Search from '../images/svg/search.svg'
import Sun from '../images/svg/sun.svg'
import Moon from '../images/svg/moon.svg'

const Navigator: React.FC = () => {
  return (
    <nav className={navigator}>
      <Link to='/'>Home</Link>
      <Link to='/blog'>Blog</Link>
      <Link to='/blog'>Products</Link>
      <Link to='/about'>About</Link>
    </nav>
  )
}

interface ThemePickerProps {
  useTheme: [string, (theme: string) => void]
}

const ThemePicker: React.FC<ThemePickerProps> = (props) => {
  const { useTheme } = props
  const [theme, toggleTheme] = useTheme
  return (
    <>
      {theme === 'light' ? (
        <Sun onClick={() => toggleTheme('dark')} />
      ) : (
        <Moon onClick={() => toggleTheme('light')} />
      )}
    </>
  )
}

interface HeaderProps {
  useTheme: [string, (theme: string) => void]
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className={header}>
      <Link to='/blog'>
        <Logo />
      </Link>
      <Navigator />
      <div className={actions}>
        <ThemePicker useTheme={props.useTheme} />
        <Search />
      </div>
      <Menu className={menu} />
    </header>
  )
}

export default Header
