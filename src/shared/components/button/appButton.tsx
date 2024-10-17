import React, { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.css'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const AppButton: React.FC<IButtonProps> = ({ className, ...props }) => {
  return (
    <button className={`${styles.button} ${className || ''}`} {...props} />
  )
}

export default AppButton
