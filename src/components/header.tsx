import * as React from 'react'
import { Link } from 'gatsby'
import { useThemePicker } from '../hooks/use-theme-picker'

import { header, menu, navigator, actions } from './header.module.scss'
import Logo from '../images/svg/logo.svg'
import Menu from '../images/svg/menu.svg'
import Search from '../images/svg/search.svg'
import Sun from '../images/svg/sun.svg'
import Moon from '../images/svg/moon.svg'
import DesktopComputer from '../images/svg/desktop-computer.svg'

const Navigator: React.FC = () => {
  return (
    <nav className={navigator}>
      <Link to='/'>Home</Link>
      <Link to='/blog'>Products</Link>
      <Link to='/blog'>Blog</Link>
      <Link to='/about'>About</Link>
    </nav>
  )
}

const ThemePicker: React.FC = () => {
  const [theme, setTheme] = useThemePicker()
  const test = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  return (
    <div onClick={test}>
      {theme === 'light' && <Sun />}
      {theme === 'dark' && <Moon />}
      {theme === 'system' && <Sun />}
    </div>
  )
}

const Header: React.FC = () => {
  return (
    <header className={header}>
      <Link to='/blog'>
        <Logo />
      </Link>
      <Navigator />
      <div className={actions}>
        <ThemePicker />
        <Search />
      </div>
      <Menu className={menu} />
    </header>
  )
}

export default Header
