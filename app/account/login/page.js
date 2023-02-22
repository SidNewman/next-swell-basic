'use client'

import swell from 'swell-js';

import Link from 'next/link'
import styles from '../account.module.scss'
import { useForm } from 'react-hook-form';
import { useRef,useState } from 'react'
import { useRouter } from 'next/navigation';


swell.init(process.env.NEXT_PUBLIC_SWELL_STORE_ID, process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY)


const Login = () => {

    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const router = useRouter()


      const {
        handleSubmit,
        register,
        watch,
        reset,
        formState: { errors },
      } = useForm()

      const email = register('email', {
        required: 'This field is required.',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address.',
        },
      })

      
      const validateLogin = async (data, e) => {
        e.preventDefault()
        
        setSubmitting(true)
        setError(false)

        try {
            const a = await swell.account.login(data.email, data.password).then(moveToDashboard)
            return a;
          } catch(err) {
            alert(err);
          }        
      }

      const moveToDashboard = () => {
        router.push('/account')
      }


      const SuccessMessage = () => {
        return (
          <>
            <h2 className='text-4xl mb-4'>Logged in!</h2>
          </>
        )
      }
    
      const ErrorMessage = () => {
        return (
          <>
            <h2 className='text-4xl mb-4'>Error! incorrect email or password</h2>
          </>
        )
      }


 return (
    <div className={styles.container}>
    <h1 className="mt-20 text-4xl font-bold text-center uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">Account Login</h1>
    <div className={styles.formArea}>

    {submitting && <div>Sending...</div>}

{success && (
    <div className={`${styles.formStatus} ${styles.success}`}>
        <SuccessMessage />
    </div>
)}

{error && (
    <div className={`${styles.formStatus} ${styles.error}`}>
        <ErrorMessage />
    </div>
)}

{!success && (

        <form onSubmit={handleSubmit(validateLogin)}>
            <label htmlFor='email'><b>Email</b></label>
            <input
              name="email"
              type="email"
              placeholder={errors?.email ? ' ' : 'harry.potter@hogwarts.co.uk'}
              inputMode="email"
              autoComplete="email"
              ref={email.ref}
              // onChange={(e) => handleEmail(e)}
              onBlur={(e) => {
                email.onBlur(e)
              }}
              onChange={(e) => {
                email.onChange(e)
              }}
              required
            />

            <label htmlFor='password'><b>Password</b></label>
              <input
                name="password"
                type="password"
                // placeholder="keep it safe!"
                {...register('password')}
                required
              />
    
            <button disabled={submitting} aria-label="log in" title="Log into yuor account" type="submit" className={`${'pointer-events-auto opacity-100 py-4'}`}>Login</button>
        </form>
        )}
    </div>
    <p className='text-center mt-6'>New here? <Link href="/account/signup">Create an account</Link></p>
</div>
 )
}

export default Login