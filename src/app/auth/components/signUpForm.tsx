"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from "./signUpForm.module.css"
import AppInput from '@/shared/components/Input/appInput'
import AppButton from '@/shared/components/button/appButton'
import AppLoader from '@/shared/components/appLoader/appLoader'

interface SignUpFormData {
    email: string
    password: string
}

export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<SignUpFormData>()

    const [isLoading, setIsLoading] = useState(false)
    const [isInvalid, setIsInvalid] = useState(false)
    const [lengthIsValid, setLengthIsValid] = useState(false)
    const [casesIsValid, setCasesIsValid] = useState(false)
    const [digitsIsValid, setDigitsIsValid] = useState(false)

    const validatePassword = (password: string) => {
        setLengthIsValid(password.length >= 8 && !/\s/.test(password))
        setCasesIsValid(/[a-z]/.test(password) && /[A-Z]/.test(password))
        setDigitsIsValid(/\d/.test(password))
    }

    const onSubmit = async (data: SignUpFormData) => {
        console.log(data)
        setIsLoading(true)
        setIsInvalid(false)

        await new Promise((resolve) => setTimeout(resolve, 3000))
        reset()
        validatePassword('')
        setIsLoading(false)
    }

    const onError = async () => {
        setIsInvalid(true)
    }

    const getValidationClassName = (isValid: Boolean) => {
        if (isValid) return styles['is-text-valid']
        if (isInvalid) return styles['is-text-invalid']
        return ''
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
            <div className='_mb-md'>
                <AppInput
                    type="email"
                    placeholder="Email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email address'
                        }
                    })}
                    disabled={isLoading}
                    error={errors.email?.message}
                    isError={errors.email?.message ? true : false}
                    isSuccess={isInvalid && !errors.email?.message ? true : false}
                />
            </div>

            <div className='_mb-md'>
                <AppInput
                    type="password"
                    placeholder="Create your password"
                    {...register('password', {
                        onChange: (e) => {
                            validatePassword(e.target.value)
                        },
                        required: '_',
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*[0-9])(?!.*\s).{8,64}$/,
                            message: '_'
                        }
                    })}
                    disabled={isLoading}
                    error={errors.password?.message}
                    isError={errors.password?.message ? true : false}
                    isSuccess={isInvalid && !errors.password?.message ? true : false}
                />
            </div>

            <div className={`${styles['validation-container']} _mb-lg`}>
                <div className={`${styles['validation-text']} ${getValidationClassName(lengthIsValid)}`}>
                    8 characters or more (no spaces)
                </div>
                <div className={`${styles['validation-text']} ${getValidationClassName(casesIsValid)}`}>
                    Uppercase and lowercase letters
                </div>
                <div className={`${styles['validation-text']} ${getValidationClassName(digitsIsValid)}`}>
                    At least one digit
                </div>
            </div>

            <div className={styles['button-holder']}>
                <AppButton type="submit" disabled={isLoading}>
                    {isLoading && <AppLoader />}
                    {isLoading ? 'Loading...' : 'Sign Up'}
                </AppButton>
            </div>
        </form>
    )
}
