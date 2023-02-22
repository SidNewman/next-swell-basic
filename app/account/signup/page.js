'use client'

import styles from '../account.module.scss'
import { useRef,useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form';


const Signup = () => {
    
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

      const {
        handleSubmit,
        register,
        watch,
        reset,
        formState: { errors },
      } = useForm()
    

      const resetForm = (e) => {
        e.preventDefault()
        reset()
        setError(false)
        setSuccess(false)
        setSubmitting(false)
        setIsAccepted(false)
        setSignupName('')
      }


    const email = register('email', {
        required: 'This field is required.',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address.',
        },
      })

      const onSubmit = (data, e) => {
        e.preventDefault()
        
        setSubmitting(true)
        setError(false)
        
        fetch('/api/account/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            name: data.name,
            surname: data.surname,
            password: data.password,
            marketing: data.marketing,
            fullname: data.fullname || '',
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            setSubmitting(false)
            setSuccess(true)
          })
          .catch((error) => {
            setSubmitting(false)
            setError(true)
            console.log(error)
          })
    
      }


      const SuccessMessage = () => {
        return (
          <>
            <h2 className='text-4xl mb-4'>Success!</h2>
            <p>Thanks for signing up with us!</p>
            <br/>
            <p>You can now log in to your account with the credentials you've just provided <Link href="/account/login">here</Link></p>
          </>
        )
      }
    
      const ErrorMessage = () => {
        return (
          <>
            <h2 className='text-4xl mb-4'>Error!</h2>
            <p className='form-message'>Looks like you're already subscribed.</p>
            <button onClick={(e) => resetForm(e)}>Try again</button>
          </>
        )
      }


    return (
        <>
        <div className={styles.container}>

        <h1 className="mt-20 text-4xl font-bold text-center uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">Account Signup</h1>

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
        // NOTE: Form will hide completely on succesful submission
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="fullname"
            autoComplete="off"
            aria-hidden="true"
            {...register('fullname')}
            className="hidden"
          />

          <div className="flex flex-col">

          <label htmlFor='password'><b>Required</b></label>
          <br/>
    
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
                placeholder="keep it safe!"
                {...register('password')}
                required
              />  

                <br/>
                <hr/>
                <br/>
                <br/>
               <label htmlFor='password'><b>Optional</b></label>
               <br/>

              <label htmlFor='password'><b>Name</b></label>
              <input
                name="name"
                type="text"
                placeholder="Harry"
                {...register('name')}
              />

              <label htmlFor='password'><b>Surname</b></label>
              <input
                name="surname"
                type="text"
                placeholder="Potter"
                {...register('surname')}
              />

              <div className='flex gap-4 mb-8'>
              <label htmlFor='marketing'><b>Opt in to email marketing</b></label>
              <input
              style={{marginBottom: '0px'}}
                name="marketing"
                type="checkbox"
                {...register('marketing')}
              />
              </div>

            {errors?.email && (
              <span
                role="alert"
                id="error-message"
                className="text-xs text-[red] absolute right-[100px] top-2/4 translate-y-[-50%]"
              >
                {errors.email.message}
              </span>
            )}
            <button
              disabled={submitting}
              aria-label="Sign up"
              title="Sign up to your account"
              className={`${'pointer-events-auto opacity-100 py-4'}`}
            >
              Create account
            </button>
          </div>          
        </form>
      )}
        <p className='text-center mt-6'>Already have an account? <Link href="/account/login">Log in</Link></p>
        </div>
    </div>
    </>
    )
}

export default Signup