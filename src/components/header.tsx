import * as React from 'react'
import { Link } from 'gatsby'

import {
  header,
  headerLogo,
  burgerMenu,
  active,
  burgerMenuBar,
  burgerMenuBarX,
  navigator,
  actions,
  dropdown,
  navigatorDropdown,
  actionsDropdown,
} from './header.module.scss'
import Logo from '../images/svg/logo.svg'
import Search from '../images/svg/search.svg'
import Sun from '../images/svg/sun.svg'
import Moon from '../images/svg/moon.svg'
import { Dispatch, SetStateAction, useState } from 'react'

const Navigator: React.FC = () => {
  return (
    <nav className={navigator}>
      <Link to='/'>Home</Link>
      <Link to='/blog'>Blog</Link>
      <Link to='/products'>Products</Link>
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

interface ActiveProps {
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
}

const BurgerMenu: React.FC<ActiveProps> = (props) => {
  const { isActive, setIsActive } = props
  return (
    <div
      className={`${isActive ? active : ''} ${burgerMenu}`}
      onClick={() => setIsActive(!isActive)}
    >
      <span className={`${burgerMenuBar}`} />
      <span className={`${burgerMenuBar}`} />
      <span className={`${burgerMenuBar}`} />
      <span className={`${isActive ? active : ''} ${burgerMenuBarX}`} />
    </div>
  )
}

interface DropdownProps extends ActiveProps {
  useTheme: [string, (theme: string) => void]
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { isActive } = props
  return (
    <div className={`${isActive ? active : ''} ${dropdown}`}>
      <nav className={`${navigatorDropdown}`}>
        <Link to='/'>Home</Link>
        <Link to='/blog'>Blog</Link>
        <Link to='/products'>Products</Link>
        <Link to='/about'>About</Link>
      </nav>
      <div className={actionsDropdown}>
        <ThemePicker useTheme={props.useTheme} />
      </div>
    </div>
  )
}

interface HeaderProps {
  useTheme: [string, (theme: string) => void]
}

const Header: React.FC<HeaderProps> = (props) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <header className={header}>
      <Link className={headerLogo} to='/'>
        <Logo />
      </Link>
      {/* Desktop only */}
      <Navigator />
      <div className={actions}>
        <ThemePicker useTheme={props.useTheme} />
        <Search />
      </div>
      {/* Mobile only */}
      <BurgerMenu isActive={isActive} setIsActive={setIsActive} />
      <Dropdown
        isActive={isActive}
        setIsActive={setIsActive}
        useTheme={props.useTheme}
      />
    </header>
  )
}

export default Header
