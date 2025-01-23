export interface ValidationResult {
  isValid: boolean;
  message: string;
  strength?: number;
}

export interface UsernameOptions {
  minLength?: number;
  maxLength?: number;
  allowSpecialChars?: boolean;
  allowNumbers?: boolean;
}

export interface EmailOptions {
  allowSubdomains?: boolean;
  allowInternational?: boolean;
  maxLength?: number;
}

export interface PasswordOptions {
  minLength?: number;
  maxLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSymbols?: boolean;
  allowSpaces?: boolean;
  minStrength?: number;
}

export interface PhoneOptions {
  country?: 'US' | 'UK' | 'IN' | 'INTERNATIONAL';
  allowSpaces?: boolean;
  requireCountryCode?: boolean;
}

export interface URLOptions {
  requireProtocol?: boolean;
  allowedProtocols?: string[];
  allowQueryParams?: boolean;
  allowFragments?: boolean;
}

export interface DateOptions {
  format?: string;
  minDate?: Date | string;
  maxDate?: Date | string;
  allowFuture?: boolean;
  allowPast?: boolean;
}

export interface PostalCodeOptions {
  country?: 'US' | 'UK' | 'CA' | 'IN';
}

export interface Validator {
  isUsername(userName: string, options?: UsernameOptions): ValidationResult;
  isEmail(email: string, options?: EmailOptions): ValidationResult;
  isPasswordMatch(password: string, confirmPassword: string): ValidationResult;
  isPassword(password: string, options?: PasswordOptions): ValidationResult;
  isPhone(phone: string, options?: PhoneOptions): ValidationResult;
  isURL(url: string, options?: URLOptions): ValidationResult;
  isDate(date: string | Date, options?: DateOptions): ValidationResult;
  isCreditCard(cardNumber: string): ValidationResult;
  isPostalCode(code: string, options?: PostalCodeOptions): ValidationResult;
}

const validate: Validator = {
  isUsername(userName: string, options: UsernameOptions = {}): ValidationResult {
    const {
      minLength = 3,
      maxLength = 30,
      allowSpecialChars = false,
      allowNumbers = true
    } = options;

    if (!userName || typeof userName !== 'string') {
      return { isValid: false, message: 'Username is required' };
    }

    if (userName.length < minLength) {
      return { isValid: false, message: `Username must be at least ${minLength} characters` };
    }

    if (userName.length > maxLength) {
      return { isValid: false, message: `Username cannot exceed ${maxLength} characters` };
    }

    const regex = allowSpecialChars
      ? new RegExp(`^[a-zA-Z0-9${allowNumbers ? '' : '_-'}]+$`)
      : new RegExp(`^[a-zA-Z${allowNumbers ? '0-9' : ''}]+$`);

    if (!regex.test(userName)) {
      return { 
        isValid: false, 
        message: `Username can only contain ${allowSpecialChars ? 'letters, numbers, and special characters' : 'letters' + (allowNumbers ? ' and numbers' : '')}` 
      };
    }

    return { isValid: true, message: 'Valid username' };
  },

  isEmail(email: string, options: EmailOptions = {}): ValidationResult {
    const {
      allowSubdomains = true,
      allowInternational = true,
      maxLength = 254 // RFC 5321
    } = options;

    if (!email || typeof email !== 'string') {
      return { isValid: false, message: 'Email is required' };
    }

    if (email.length > maxLength) {
      return { isValid: false, message: `Email cannot exceed ${maxLength} characters` };
    }

    const emailRegex = allowInternational
      ? /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Invalid email format' };
    }

    if (!allowSubdomains && (email.match(/\./g) || []).length > 1) {
      return { isValid: false, message: 'Subdomains are not allowed' };
    }

    return { isValid: true, message: 'Valid email' };
  },

  isPasswordMatch(password: string, confirmPassword: string): ValidationResult {
    if (!password || !confirmPassword) {
      return { isValid: false, message: 'Both passwords are required' };
    }

    return {
      isValid: password === confirmPassword,
      message: password === confirmPassword ? 'Passwords match' : 'Passwords do not match'
    };
  },

  isPassword(password: string, options: PasswordOptions = {}): ValidationResult {
    const {
      minLength = 8,
      maxLength = 128,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSymbols = true,
      allowSpaces = false,
      minStrength = 3
    } = options;

    if (!password || typeof password !== 'string') {
      return { isValid: false, message: 'Password is required' };
    }

    const checks = {
      length: password.length >= minLength && password.length <= maxLength,
      uppercase: !requireUppercase || /[A-Z]/.test(password),
      lowercase: !requireLowercase || /[a-z]/.test(password),
      numbers: !requireNumbers || /[0-9]/.test(password),
      symbols: !requireSymbols || /[!@#$%^&*(),.?":{}|<>]/.test(password),
      spaces: allowSpaces || !/\s/.test(password)
    };

    const strength = Object.values(checks).filter(Boolean).length;

    if (!checks.length) {
      return {
        isValid: false,
        message: `Password must be between ${minLength} and ${maxLength} characters`
      };
    }

    if (!checks.spaces) {
      return { isValid: false, message: 'Password cannot contain spaces' };
    }

    if (!checks.uppercase && requireUppercase) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }

    if (!checks.lowercase && requireLowercase) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }

    if (!checks.numbers && requireNumbers) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }

    if (!checks.symbols && requireSymbols) {
      return { isValid: false, message: 'Password must contain at least one special character' };
    }

    if (strength < minStrength) {
      return { isValid: false, message: 'Password is too weak' };
    }

    return {
      isValid: true,
      message: 'Strong password',
      strength
    };
  },

  isPhone(phone: string, options: PhoneOptions = {}): ValidationResult {
    const {
      country = 'INTERNATIONAL',
      allowSpaces = true,
      requireCountryCode = false
    } = options;

    if (!phone || typeof phone !== 'string') {
      return { isValid: false, message: 'Phone number is required' };
    }

    const cleanPhone = phone.replace(/\s/g, '');

    const intlRegex = /^\+?[1-9]\d{1,14}$/;
    
    const formats: { [key: string]: RegExp } = {
      US: /^\+?1?\d{10}$/,
      UK: /^\+?44\d{10}$/,
      IN: /^\+?91\d{10}$/,
      INTERNATIONAL: intlRegex
    };

    const regex = formats[country] || intlRegex;

    if (!regex.test(cleanPhone)) {
      return { 
        isValid: false, 
        message: 'Invalid phone number format' 
      };
    }

    if (requireCountryCode && !phone.startsWith('+')) {
      return { 
        isValid: false, 
        message: 'Country code is required' 
      };
    }

    return { isValid: true, message: 'Valid phone number' };
  },

  isURL(url: string, options: URLOptions = {}): ValidationResult {
    const {
      requireProtocol = true,
      allowedProtocols = ['http:', 'https:'],
      allowQueryParams = true,
      allowFragments = true
    } = options;

    if (!url || typeof url !== 'string') {
      return { isValid: false, message: 'URL is required' };
    }

    try {
      const urlObj = new URL(url);
      
      if (requireProtocol && !allowedProtocols.includes(urlObj.protocol)) {
        return { 
          isValid: false, 
          message: `URL must use one of these protocols: ${allowedProtocols.join(', ')}` 
        };
      }

      if (!allowQueryParams && urlObj.search) {
        return { isValid: false, message: 'Query parameters are not allowed' };
      }

      if (!allowFragments && urlObj.hash) {
        return { isValid: false, message: 'URL fragments are not allowed' };
      }

      return { isValid: true, message: 'Valid URL' };
    } catch {
      return { isValid: false, message: 'Invalid URL format' };
    }
  },

  isDate(date: string | Date, options: DateOptions = {}): ValidationResult {
    const {
      format = 'YYYY-MM-DD',
      minDate,
      maxDate,
      allowFuture = true,
      allowPast = true
    } = options;

    if (!date) {
      return { isValid: false, message: 'Date is required' };
    }

    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return { isValid: false, message: 'Invalid date format' };
    }

    const now = new Date();

    if (!allowFuture && dateObj > now) {
      return { isValid: false, message: 'Future dates are not allowed' };
    }

    if (!allowPast && dateObj < now) {
      return { isValid: false, message: 'Past dates are not allowed' };
    }

    if (minDate && dateObj < new Date(minDate)) {
      return { isValid: false, message: `Date must be after ${minDate}` };
    }

    if (maxDate && dateObj > new Date(maxDate)) {
      return { isValid: false, message: `Date must be before ${maxDate}` };
    }

    return { isValid: true, message: 'Valid date' };
  },

  isCreditCard(cardNumber: string): ValidationResult {
    if (!cardNumber || typeof cardNumber !== 'string') {
      return { isValid: false, message: 'Credit card number is required' };
    }

    const num = cardNumber.replace(/[\s-]/g, '');

    if (!/^\d+$/.test(num)) {
      return { isValid: false, message: 'Credit card number can only contain digits' };
    }

    let sum = 0;
    let isEven = false;

    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return {
      isValid: sum % 10 === 0,
      message: sum % 10 === 0 ? 'Valid credit card number' : 'Invalid credit card number'
    };
  },

  isPostalCode(code: string, options: PostalCodeOptions = {}): ValidationResult {
    const { country = 'US' } = options;

    if (!code || typeof code !== 'string') {
      return { isValid: false, message: 'Postal code is required' };
    }

    const formats: { [key: string]: RegExp } = {
      US: /^\d{5}(-\d{4})?$/,
      UK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
      CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] ?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
      IN: /^\d{6}$/
    };

    const regex = formats[country];
    if (!regex) {
      return { isValid: false, message: 'Unsupported country code' };
    }

    return {
      isValid: regex.test(code),
      message: regex.test(code) ? 'Valid postal code' : 'Invalid postal code format'
    };
  }
};

export default validate;
