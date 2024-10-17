import SignUpForm from "./components/signUpForm"
import styles from "./page.module.css"

export default function Auth() {
  return (
    <main className={`${styles.main} _flex _center _fxdc`}>
      <div className={styles.wrapper}>
        <div className={`title-h1 _text-center _mb-lg`}>
          Sign up
        </div>
        <SignUpForm/>
      </div>
    </main>
  )
}
