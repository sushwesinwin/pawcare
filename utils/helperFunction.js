/**
 * Validates a name
 * @param {string} name - The name to validate
 * @param {number} [minLength=2] - Minimum length required
 * @param {number} [maxLength=50] - Maximum length allowed
 * @returns {object} { isValid: boolean, message: string }
 */
function validateName(name, minLength = 2, maxLength = 50) {
    if (!name) {
      return { isValid: false, message: 'Name is required' };
    }
  
    if (name.length < minLength) {
      return { isValid: false, message: `Name must be at least ${minLength} characters` };
    }
  
    if (name.length > maxLength) {
      return { isValid: false, message: `Name must be no more than ${maxLength} characters` };
    }
  
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(name)) {
      return { isValid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    }
  
    return { isValid: true, message: 'Name is valid' };
}

// console.log(validateName('a'));

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {object} { isValid: boolean, message: string }
 */
function validateEmail(email) {
    if (!email) {
      return { isValid: false, message: 'Email is required' };
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }
  
    return { isValid: true, message: 'Email is valid' };
}

/**
 * Validates a password
 * @param {string} password - The password to validate
 * @param {object} [options] - Validation options
 * @param {number} [options.minLength=8] - Minimum length required
 * @param {boolean} [options.requireUppercase=true] - Whether uppercase is required
 * @param {boolean} [options.requireLowercase=true] - Whether lowercase is required
 * @param {boolean} [options.requireNumber=true] - Whether a number is required
 * @param {boolean} [options.requireSpecialChar=true] - Whether a special character is required
 * @returns {object} { isValid: boolean, message: string }
 */
function validatePassword(password, options = {}) {
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumber = false,
      requireSpecialChar = false,
    } = options;
  
    if (!password) {
      return { isValid: false, message: 'Password is required' };
    }
  
    if (password.length < minLength) {
      return { isValid: false, message: `Password must be at least ${minLength} characters` };
    }
  
    const validationMessages = [];
  
    if (requireUppercase && !/[A-Z]/.test(password)) {
      validationMessages.push('one uppercase letter');
    }
  
    if (requireLowercase && !/[a-z]/.test(password)) {
      validationMessages.push('one lowercase letter');
    }
  
    if (requireNumber && !/[0-9]/.test(password)) {
      validationMessages.push('one number');
    }
  
    if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      validationMessages.push('one special character');
    }
  
    if (validationMessages.length > 0) {
      return {
        isValid: false,
        message: `Password must contain ${validationMessages.join(', ')}`
      };
    }
  
    return { isValid: true, message: 'Password is valid' };
}

module.exports = {
    validateName,
    validateEmail,
    validatePassword
}