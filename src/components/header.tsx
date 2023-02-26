// React
import * as React from 'react'
import { useState, useContext } from 'react'
import { ThemeContext } from './layout'
// Components
import { Link } from 'gatsby'
import MySearchContainer from './search-box'
// Styles
import {
  header,
  headerLogo,
  burgerMenu,
  active,
  burgerMenuBar,
  burgerMenuBarX,
  navigator,
  actions,
  actionsMobile,
  dropdown,
  navigatorDropdown,
  actionsDropdown,
} from './header.module.scss'
// Icons
import Logo from '../images/svg/logo.svg'
import SearchIcon from '../images/svg/search.svg'
import Sun from '../images/svg/sun.svg'
import Moon from '../images/svg/moon.svg'
// Types
import type { CSSProperties, Dispatch, SetStateAction } from 'react'
import Modal from './modal'

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

const ThemePicker: React.FC = () => {
  const themeContext = useContext(ThemeContext)
  const handleClick = (value: string) => {
    themeContext?.toggleTheme(value)
  }
  return (
    <>
      {themeContext?.theme === 'light' ? (
        <Sun onClick={() => handleClick('dark')} />
      ) : (
        <Moon onClick={() => handleClick('light')} />
      )}
    </>
  )
}

interface ToggleDropdownProps {
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}

const BurgerMenu: React.FC<ToggleDropdownProps> = (props) => {
  const { isShow, setIsShow } = props
  return (
    <div
      className={`${isShow && active} ${burgerMenu}`}
      onClick={() => setIsShow(!isShow)}
    >
      <span className={`${burgerMenuBar}`} />
      <span className={`${burgerMenuBar}`} />
      <span className={`${burgerMenuBar}`} />
      <span className={`${isShow && active} ${burgerMenuBarX}`} />
    </div>
  )
}

const Dropdown: React.FC<ToggleDropdownProps> = (props) => {
  const { isShow } = props
  return (
    <div className={`${isShow ? active : ''} ${dropdown}`}>
      <nav className={`${navigatorDropdown}`}>
        <Link to='/'>Home</Link>
        <Link to='/blog'>Blog</Link>
        <Link to='/products'>Products</Link>
        <Link to='/about'>About</Link>
      </nav>
      <div className={actionsDropdown}>
        <ThemePicker />
      </div>
    </div>
  )
}

interface SearchModalProps {
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}

const SearchModal: React.FC<SearchModalProps> = (props) => {
  const { isShow, setIsShow } = props
  return (
    <Modal isShow={isShow} onClick={() => setIsShow(false)}>
      <MySearchContainer setIsShow={setIsShow} />
    </Modal>
  )
}

interface HeaderProps {
  style?: CSSProperties
}

const Header: React.FC<HeaderProps> = (props) => {
  const [isShowDropdown, setIsShowDropdown] = useState(false)
  const [isShowSearch, setIsShowSearch] = useState(false)
  return (
    <>
      <header style={props.style} className={header}>
        <Link className={headerLogo} to='/'>
          <Logo />
        </Link>
        {/* Desktop only */}
        <Navigator />
        <div className={actions}>
          <ThemePicker />
          <SearchIcon onClick={() => setIsShowSearch(true)} />
        </div>
        {/* Mobile only */}
        <div className={actionsMobile}>
          <SearchIcon onClick={() => setIsShowSearch(true)} />
          <BurgerMenu isShow={isShowDropdown} setIsShow={setIsShowDropdown} />
        </div>
        <Dropdown isShow={isShowDropdown} setIsShow={setIsShowDropdown} />
      </header>
      <SearchModal isShow={isShowSearch} setIsShow={setIsShowSearch} />
    </>
  )
}

export default Header
