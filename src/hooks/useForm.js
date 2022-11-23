import { useState } from 'react';

const useForm = (callback, defaultValues = {}) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState([]);

  const validate = (property, value, pattern, message) => {
    const errorRemover = () => {
      let newErrors = {...errors};
      delete newErrors[property];
      setErrors(newErrors);
    };

    const regex = new RegExp(pattern);
    regex.test(value)
      ? errorRemover()
      : setErrors({...errors, [property]: message});
  };

  const eventDetails = (e) => {
    const target = e.target;
    const property = target.name;
    const value = target.value;
    const pattern = target.pattern;
    const validationMsg = target.dataset.error || 'Error, please check field.';

    return { property, value, pattern, validationMsg };
  }

  const handleChange = (e) => {
    e.preventDefault();
    
    const { property, value, pattern, validationMsg } = eventDetails(e);

    if (touched.includes(property)) {
      validate(property, value, pattern, validationMsg);
    }

    setValues({
      ...values,
      [property]: value,
    });
  };

  const handleSubmit = (e, ...args) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length > 0) {
      switch(callback.name) {
        case 'signUp':
          console.log('Submitting sign up...');
          callback(args[0], args[1]);
          break;
        case 'logIn':
          console.log('Sending credentials for login...');
          break;
        case 'verifyUser':
          console.log('Verifying user...');
          break;
        case 'logOut':
          console.log('Sending logout...');
          break;
        default:
          console.log('Callback name not recognized, calling without args.');
          callback();
      }
      console.log('Submitted');
    } else {
      console.log("Didn't pass validation, did nothing.");
    }
  };

  const handleBlur = (e) => {
    e.preventDefault();
   
    const { property, value, pattern, validationMsg } = eventDetails(e);

    if (!touched.includes(property) && value.length > 0) {
      validate(property, value, pattern, validationMsg);
    }
    
    setTouched(prev => {
      if (!prev.includes(property) && value.length > 0) { return [...prev, property]; }

      return prev;
    });
  }

  return {values, errors, handleChange, handleSubmit, handleBlur};
};

export default useForm;