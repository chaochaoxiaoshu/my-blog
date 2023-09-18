// React
import * as React from 'react'
import { useState, useContext, useEffect } from 'react'
import { ThemeContext } from './layout'
// Components
import { Link } from 'gatsby'
import MySearchContainer from './search-box'
// Styles
import {
  headerBackground,
  header,
  headerOnScroll,
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
  headerPlaceholder,
} from './header.module.scss'
// Icons
import Logo from '../images/svg/logo.svg'
import SearchIcon from '../images/svg/search.svg'
import Sun from '../images/svg/sun.svg'
import Moon from '../images/svg/moon.svg'
// Types
import type { CSSProperties, Dispatch, SetStateAction } from 'react'
import Modal from './modal'
import useScrollTop from '../hooks/useScrollTop'
import HoverAnimation from './hover-animation'

const Navigator: React.FC = () => {
  return (
    <nav className={navigator}>
      <Link to='/'>
        <HoverAnimation>Home</HoverAnimation>
      </Link>
      <Link to='/blog'>
        <HoverAnimation>Blog</HoverAnimation>
      </Link>
      <Link to='/products'>
        <HoverAnimation>Products</HoverAnimation>
      </Link>
      <Link to='/about'>
        <HoverAnimation>About</HoverAnimation>
      </Link>
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
  const scrollTop = useScrollTop()
  const [isOnScroll, setIsOnScroll] = useState(false)
  useEffect(() => {
    if (scrollTop > 80) {
      if (isOnScroll) return
      setIsOnScroll(true)
    } else {
      if (!isOnScroll) return
      setIsOnScroll(false)
    }
  }, [scrollTop])
  return (
    <>
      <div style={props.style} className={headerBackground}>
        <header className={`${header} ${isOnScroll ? headerOnScroll : ''}`}>
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
      </div>
      <div className={headerPlaceholder}></div>
      <SearchModal isShow={isShowSearch} setIsShow={setIsShowSearch} />
    </>
  )
}

export default Header
