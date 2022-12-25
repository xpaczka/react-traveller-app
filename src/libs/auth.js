export const validateEmail = email => {
  if (email === '') return false;

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const match = email.match(emailRegex);

  return match ? true : false;
};

export const validateName = name => {
  return name.trim() !== '';
};

export const validateCountry = country => {
  return country !== '';
};

export const validatePassword = password => {
  const validationObject = {
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialCharacter: false,
  };

  if (password.length >= 8) {
    validationObject.length = true;
  }

  if (/[A-Z]/.test(password)) {
    validationObject.uppercase = true;
  }

  if (/[a-z]/.test(password)) {
    validationObject.lowercase = true;
  }

  if (/[0-9]/.test(password)) {
    validationObject.digit = true;
  }

  if (/[!@#$%^&*.,]/.test(password)) {
    validationObject.specialCharacter = true;
  }

  return validationObject;
};
