const formClassNames = {
  label: 'block mb-2 text-sm font-medium text-gray-950/90 dark:text-white',
  input:
    'bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
  button:
    'w-full text-center mt-4 focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-4 ',
  gridUL: 'grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4',
  formSectionTitle:
    'text-lg mt-4 font-semibold text-gray-600 dark:text-gray-300',
};
const Regex = {
  gstin: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  aadhaar: /^[2-9]{1}[0-9]{11}$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

// basic Input
export function Input(props) {
  return (
    <input
      className="block w-full rounded-sm px-2 py-1 outline outline-1 outline-neutral-500 focus:outline-blue-500"
      {...props}
    />
  );
}

export function Input_GSTIN(props) {
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = props;

  return (
    <>
      <label htmlFor="GSTIN" className={formClassNames.label}>
        GSTIN
      </label>
      <input
        type="text"
        id="GSTIN"
        className={formClassNames.input}
        placeholder="GSTIN"
        maxLength="15"
        {...register('GSTIN', {
          onChange: (e) => {
            let value = e.target.value;
            // Convert to uppercase
            value = value.toUpperCase();
            // Validate using regex
            const regex = Regex.gstin;
            if (!regex.test(value)) {
              setError('GSTIN', {
                type: 'manual',
                message: 'Invalid GSTIN',
              });
            } else {
              clearErrors('GSTIN');
            }
            // Update the input value
            e.target.value = value;
          },
        })}
      />
      <p className=" text-xs text-red-500 h-4 px-2">
        {errors.GSTIN && errors.GSTIN.message}
      </p>
    </>
  );
}
export function PAN(props) {
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = props;
  return (
    <>
      <label htmlFor="PAN" className={formClassNames.label}>
        PAN
      </label>
      <input
        type="text"
        id="PAN"
        className={formClassNames.input}
        placeholder="PAN"
        maxLength="10"
        {...register('PAN', {
          onChange: (e) => {
            let value = e.target.value;
            // Convert to uppercase
            value = value.toUpperCase();
            // Validate using regex
            const regex = Regex.pan;
            if (!regex.test(value)) {
              setError('PAN', {
                type: 'manual',
                message: 'Invalid PAN',
              });
            } else {
              clearErrors('PAN');
            }
            // Update the input value
            e.target.value = value;
          },
        })}
      />
      {errors.PAN && (
        <p className=" text-xs text-red-500 italic">{errors.PAN.message}</p>
      )}
    </>
  );
}
export function Aadhaar(props) {
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = props;
  return (
    <>
      <label htmlFor="aadhaar" className={formClassNames.label}>
        Aadhaar
      </label>
      <input
        type="text"
        id="aadhaar"
        className={formClassNames.input}
        placeholder="Aadhaar"
        maxLength="12"
        {...register('aadhaar', {
          onChange: (e) => {
            let value = e.target.value;
            // Validate using regex
            const regex = Regex.aadhaar;
            if (!regex.test(value)) {
              setError('aadhaar', {
                type: 'manual',
                message: 'Invalid aadhaar',
              });
            } else {
              clearErrors('aadhaar');
            }
            // Update the input value
            e.target.value = value;
          },
        })}
      />
      {errors.aadhaar && (
        <p className=" text-xs text-red-500 italic">{errors.aadhaar.message}</p>
      )}
    </>
  );
}

export function Email(props) {
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = props;
  return (
    <>
      <label htmlFor="Email" className={formClassNames.label}>
        Email
      </label>
      <input
        type="email"
        id="Email"
        className={formClassNames.input}
        placeholder="Email"
        {...register('Email', {
          onChange: (e) => {
            let value = e.target.value;
            // Validate using regex
            const regex = Regex.email;
            if (!regex.test(value)) {
              setError('Email', {
                type: 'manual',
                message: 'Invalid Email',
              });
            } else {
              clearErrors('Email');
            }
            // Update the input value
            e.target.value = value;
          },
        })}
      />
      {errors.Email && (
        <p className=" text-xs text-red-500 italic">{errors.Email.message}</p>
      )}
    </>
  );
}
