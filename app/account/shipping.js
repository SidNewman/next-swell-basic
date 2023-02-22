import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


import styles from "./account.module.scss";

export const Shipping = ({ _account, id }) => {

  const [account, setAccount] = useState(_account)

  const [isOpen, setIsOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter() 

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const resetForm = (e) => {
    e.preventDefault()
    reset()
    setError(false)
    setSuccess(false)
    setSubmitting(false)
  }


  const handleModal = (e) => {
      if(setSuccess){
        setIsOpen(!isOpen);
        resetForm(e)
      } else {
        setIsOpen(!isOpen);
      }
  };

  const updateShipping = (data, e) => {
    e.preventDefault();

    setSubmitting(true);
    setError(false);

    fetch("/api/account/updateShipping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: id,
        address: data.address,
        city: data.city,
        postcode: data.postcode,
        county: data.county,
        country: data.country
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setSubmitting(false);
        setSuccess(true);
        setAccount(res)
      })
      .catch((error) => {
        setSubmitting(false);
        setError(true);
        console.log(error);
      });
  };

  const SuccessMessage = () => {
    return (
      <>
        <h2 className="text-4xl mb-4">Success!</h2>
        <p>You've updated your shipping details</p>
        <br />
      </>
    );
  };

  const ErrorMessage = () => {
    return (
      <>
        <h2 className="text-4xl mb-4">Error!</h2>
        <p className="form-message">We cant update your details at this time</p>
        {/* <button onClick={(e) => resetForm(e)}>Try again</button> */}
      </>
    );
  };

  return (
    <>
      <>
        <div className="flex justify-between mb-4">
          <p className={styles.infoTitle}>Shipping Address</p>
          <button onClick={handleModal}>edit</button>
        </div>
        <div>
          <span>{account.shipping.address1}</span>
        </div>
        <div>
          <span>{account.shipping.city}</span>
        </div>
        <div>
          <span>{account.shipping.zip}</span>
        </div>
        <div>
          <span>{account.shipping.state}</span>
        </div>
        <div>
          <span>{account.shipping.country}</span>
        </div>
      </>
      <div
        className={`${styles.modal} ${isOpen ? styles.open : styles.closed}`}
      >
          <div className={styles.inner}>
          <div onClick={(e)=>{handleModal(e)}} className={styles.closer}>X</div>
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
          <form className={styles.form} onSubmit={handleSubmit(updateShipping)}>
         

            <div className="flex flex-col">
            
    
              <label htmlFor="address">
                <b>Address</b>
              </label>
              <input
                name="address"
                type="text"
                defaultValue={account.shipping.address1}
                {...register("address")}
                required
              />

                <br />

              <label htmlFor="city">
                <b>City</b>
              </label>
              <input
                name="city"
                type="text"
                defaultValue={account.shipping.city}
                {...register("city")}
              />

                <br />

                <label htmlFor="postcode">
                <b>Postcode</b>
              </label>
              <input
                name="postcode"
                type="text"
                defaultValue={account.shipping.zip}
                {...register("postcode")}
              />

                <br />

                <label htmlFor="county">
                <b>County</b>
              </label>
              <input
                name="county"
                type="text"
                defaultValue={account.shipping.state}
                {...register("county")}
              />

                <br />

                <label htmlFor="country">
                <b>Country</b>
              </label>
              <input
                name="country"
                type="text"
                defaultValue={account.shipping.country}
                {...register("country")}
              />

                <br />
         

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
                className={`${"pointer-events-auto opacity-100"}`}
              >
                Update shipping
              </button>
            </div>
          </form>
        )}
      </div>
      </div>
    </>
  );
};
