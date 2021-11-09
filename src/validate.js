export default function validate(values) {
  let errors = {};

  const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.email) {
    errors.email = "Enter your email";
  } else if (!validEmailRegex.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if(!values.password) {
    errors.password = "Enter your password";
  } else if (values.password.length < 6) {
    errors.password = "Use 6 characters or more for your password";
  }

  return errors;
}