import * as React from 'react'
import { useEffect } from 'react'
import { modal, visible } from './modal.module.scss'

interface ModalProps {
  children: React.ReactNode
  isShow: boolean
  autoFocus?: boolean
  onClick?: () => void
}

const Modal: React.FC<ModalProps> = (props) => {
  const { children, isShow, onClick } = props

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isShow])

  return (
    <div className={`${modal} ${isShow && visible}`} onClick={onClick}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}

export default Modal
