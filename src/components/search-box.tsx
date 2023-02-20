// React
import React, { useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
// Components
import { Link } from 'gatsby'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web'
import algoliasearch from 'algoliasearch/lite'
// Styles
import {
  mySearchContainer,
  searchHeader,
  searchIcon,
  escButton,
  searchFooter,
  logoLabel,
} from './search-box.module.scss'
// Icons
import SearchIcon from '../images/svg/search.svg'
import AlgoliaLogo from '../images/svg/algolia.svg'

const searchClient = algoliasearch(
  'YLPM08C45J',
  '458d7bd46199f3ce543d1db4675b0a8e'
)

interface HitProps {
  hit: {
    title: string
    slug: string
    tags: string[]
    excerpt: string
  }
}

const Hit: React.FC<HitProps> = (props) => {
  const { hit } = props
  const { title, slug, tags, excerpt } = hit
  return (
    <Link to={`/blog/${slug}`}>
      <article>
        <h1>{title}</h1>
      </article>
    </Link>
  )
}

interface MySearchContainerProps {
  setIsShow: Dispatch<SetStateAction<boolean>>
}

const MySearchContainer: React.FC<MySearchContainerProps> = (props) => {
  const { setIsShow } = props

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [])

  const handleKeyUp = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'MetaLeft':
        setIsShow(true)
        break
      case 'Escape':
        setIsShow(false)
        break
    }
  }

  return (
    <div className={mySearchContainer}>
      <InstantSearch searchClient={searchClient} indexName='Pages'>
        <header className={searchHeader}>
          <SearchIcon className={searchIcon} />
          <SearchBox placeholder='搜索' />
          <button onClick={() => setIsShow(false)} className={escButton}>
            ESC
          </button>
        </header>
        <Hits hitComponent={Hit} />
        <footer className={searchFooter}>
          <small className={logoLabel}>搜索服务来自</small>
          <AlgoliaLogo />
        </footer>
      </InstantSearch>
    </div>
  )
}

export default MySearchContainer
