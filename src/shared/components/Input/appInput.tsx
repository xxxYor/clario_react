"use client"

import React, { InputHTMLAttributes, forwardRef, useState } from 'react'
import styles from "./styles.module.css"
import { VisibilityOffIcon } from '@/shared/icons/visibilityOffIcon'
import { VisibilityIcon } from '@/shared/icons/visibilityIcon'

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
    isError?: boolean
    isSuccess?: boolean
}

const AppInput = forwardRef<HTMLInputElement, IInputProps>(({ isError, isSuccess, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPasswordType = props.type === 'password'
    const inputClass = `${isError ? styles['error'] : ''} ${isSuccess ? styles['success'] : ''}`.trim()
    const inputType = isPasswordType && showPassword ? 'text' : props.type;

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
        <div className={`${styles['input-wrapper']} ${inputClass}`}>
            <input ref={ref} {...props} type={inputType} />
            {error && error !== "_" && <span className={styles['error-message']}>{error}</span>}
            {isPasswordType && (
                <div
                    onClick={togglePasswordVisibility}
                    className={styles['toggle-password']}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {!showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                </div>
            )}
        </div>
    )
})

export default AppInput
