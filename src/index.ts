export interface ValidationResult {
  isValid: boolean;
  message: string;
  strength?: number;
  details?: any;
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

export interface FileValidationOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[]; // e.g., ['image/jpeg', 'image/png']
  minWidth?: number; // for images
  minHeight?: number; // for images
  maxWidth?: number; // for images
  maxHeight?: number; // for images
  aspectRatio?: number; // width/height
}

export interface AddressOptions {
  requireStreet?: boolean;
  requireCity?: boolean;
  requireState?: boolean;
  requireZip?: boolean;
  requireCountry?: boolean;
  allowPOBox?: boolean;
}

export interface MoneyOptions {
  currency?: string;
  minAmount?: number;
  maxAmount?: number;
  allowNegative?: boolean;
  decimals?: number;
}

export interface ColorOptions {
  format?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'any';
  allowAlpha?: boolean;
}

export interface IPAddressOptions {
  version?: 'v4' | 'v6' | 'any';
  allowPrivate?: boolean;
  allowReserved?: boolean;
}

export interface SSNOptions {
  country?: 'US' | 'CA';
  format?: 'masked' | 'unmasked';
}

export interface TimeOptions {
  format?: '12h' | '24h';
  allowSeconds?: boolean;
  minTime?: string;
  maxTime?: string;
}

export interface LatLngOptions {
  precision?: number;
  format?: 'decimal' | 'dms';
}

export interface PasswordStrengthOptions {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
  bannedPasswords?: string[];
  maxRepeatingChars?: number;
  customRegex?: RegExp;
}

export interface NumberValidationOptions {
  min?: number;
  max?: number;
  integer?: boolean;
  positive?: boolean;
  negative?: boolean;
  precision?: number;
  allowThousandsSeparator?: boolean;
  allowScientificNotation?: boolean;
}

export interface ArrayValidationOptions {
  minLength?: number;
  maxLength?: number;
  unique?: boolean;
  itemValidator?: (item: any) => ValidationResult;
  allowNull?: boolean;
  allowEmpty?: boolean;
  sortOrder?: 'asc' | 'desc' | 'none';
}

export interface ObjectValidationOptions {
  requiredFields?: string[];
  optionalFields?: string[];
  allowExtra?: boolean;
  fieldValidators?: { [key: string]: (value: any) => ValidationResult };
  minProperties?: number;
  maxProperties?: number;
}

export interface DateRangeOptions {
  minDate?: Date | string;
  maxDate?: Date | string;
  allowWeekends?: boolean;
  allowHolidays?: boolean;
  format?: string;
  timezone?: string;
  allowFuture?: boolean;
  allowPast?: boolean;
  minAge?: number;
  maxAge?: number;
}

export interface FileTypeOptions {
  allowedExtensions?: string[];
  allowedMimeTypes?: string[];
  maxFileNameLength?: number;
  allowSpaces?: boolean;
  checkMimeType?: boolean;
  allowHidden?: boolean;
}

export interface TimeConversionResult {
  hour: number;
  minute: number;
  isValid: boolean;
  error?: string;
}

export interface DMSConversionResult {
  dms: string;
  isValid: boolean;
  error?: string;
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
  isFile(file: File, options?: FileValidationOptions): ValidationResult;
  isAddress(address: any, options?: AddressOptions): ValidationResult;
  isMoney(amount: string | number, options?: MoneyOptions): ValidationResult;
  isColor(color: string, options?: ColorOptions): ValidationResult;
  isIPAddress(ip: string, options?: IPAddressOptions): ValidationResult;
  isSSN(ssn: string, options?: SSNOptions): ValidationResult;
  isTime(time: string, options?: TimeOptions): ValidationResult;
  isLatLng(coords: { lat: number, lng: number }, options?: LatLngOptions): ValidationResult;
  isStrongPassword(password: string, options?: PasswordStrengthOptions): ValidationResult;
  isNumber(value: string | number, options?: NumberValidationOptions): ValidationResult;
  isArray(array: any[], options?: ArrayValidationOptions): ValidationResult;
  isObject(obj: any, options?: ObjectValidationOptions): ValidationResult;
  isDateInRange(date: Date | string, options?: DateRangeOptions): ValidationResult;
  isValidFileType(fileName: string, options?: FileTypeOptions): ValidationResult;
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

  isPhone(phone: string, { country = 'INTERNATIONAL', requireCountryCode = false }: PhoneOptions = {}): ValidationResult {
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

  isDate(date: string | Date, { minDate, maxDate, allowFuture = true, allowPast = true }: DateOptions = {}): ValidationResult {
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

    const num = cardNumber.replace(/[^\d]/g, '');

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
  },

  isFile(file: File, options: FileValidationOptions = {}): ValidationResult {
    const {
      maxSize = 5 * 1024 * 1024, // 5MB default
      allowedTypes = []
    } = options;

    if (!file) {
      return { isValid: false, message: 'File is required' };
    }

    if (file.size > maxSize) {
      return { isValid: false, message: `File size must not exceed ${maxSize / (1024 * 1024)}MB` };
    }

    if (allowedTypes.length && !allowedTypes.includes(file.type)) {
      return { isValid: false, message: `File type must be one of: ${allowedTypes.join(', ')}` };
    }

    // Additional image validations would be implemented here
    // Note: Actual implementation would require browser APIs or Node.js modules

    return { isValid: true, message: 'Valid file' };
  },

  isAddress(address: any, options: AddressOptions = {}): ValidationResult {
    const {
      requireStreet = true,
      requireCity = true,
      requireState = true,
      requireZip = true,
      requireCountry = true,
      allowPOBox = true
    } = options;

    if (!address) {
      return { isValid: false, message: 'Address is required' };
    }

    if (requireStreet && !address.street) {
      return { isValid: false, message: 'Street address is required' };
    }

    if (!allowPOBox && /\bp\.?\s*o\.?\s*box\b/i.test(address.street)) {
      return { isValid: false, message: 'P.O. Box addresses are not allowed' };
    }

    if (requireCity && !address.city) {
      return { isValid: false, message: 'City is required' };
    }

    if (requireState && !address.state) {
      return { isValid: false, message: 'State is required' };
    }

    if (requireZip && !address.zip) {
      return { isValid: false, message: 'ZIP code is required' };
    }

    if (requireCountry && !address.country) {
      return { isValid: false, message: 'Country is required' };
    }

    return { isValid: true, message: 'Valid address' };
  },

  isMoney(amount: string | number, options: MoneyOptions = {}): ValidationResult {
    const {
      minAmount = 0,
      maxAmount = Number.MAX_SAFE_INTEGER,
      decimals = 2
    } = options;

    const value = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(value)) {
      return { isValid: false, message: 'Invalid monetary value' };
    }

    if (value < minAmount) {
      return { isValid: false, message: `Amount must be at least ${minAmount}` };
    }

    if (value > maxAmount) {
      return { isValid: false, message: `Amount must not exceed ${maxAmount}` };
    }

    const decimalPlaces = value.toString().split('.')[1]?.length || 0;
    if (decimalPlaces > decimals) {
      return { isValid: false, message: `Amount cannot have more than ${decimals} decimal places` };
    }

    return { isValid: true, message: 'Valid amount' };
  },

  isColor(color: string, options: ColorOptions = {}): ValidationResult {
    const { format = 'any', allowAlpha = true } = options;

    if (!color) {
      return { isValid: false, message: 'Color value is required' };
    }

    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const rgbRegex = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;
    const rgbaRegex = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([01]|0?\.\d+)\s*\)$/;
    const hslRegex = /^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/;

    switch (format) {
      case 'hex':
        if (!hexRegex.test(color)) {
          return { isValid: false, message: 'Invalid hex color format' };
        }
        break;
      case 'rgb':
        if (!rgbRegex.test(color)) {
          return { isValid: false, message: 'Invalid RGB color format' };
        }
        break;
      case 'rgba':
        if (!rgbaRegex.test(color)) {
          return { isValid: false, message: 'Invalid RGBA color format' };
        }
        break;
      case 'hsl':
        if (!hslRegex.test(color)) {
          return { isValid: false, message: 'Invalid HSL color format' };
        }
        break;
      case 'any':
        if (!(hexRegex.test(color) || rgbRegex.test(color) || 
              (allowAlpha && rgbaRegex.test(color)) || hslRegex.test(color))) {
          return { isValid: false, message: 'Invalid color format' };
        }
        break;
    }

    return { isValid: true, message: 'Valid color' };
  },

  isIPAddress(ip: string, options: IPAddressOptions = {}): ValidationResult {
    const { 
      version = 'any',
      allowPrivate = true,
      allowReserved = false
    } = options;

    if (!ip) {
      return { isValid: false, message: 'IP address is required' };
    }

    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

    if (version === 'v4' || version === 'any') {
      if (ipv4Regex.test(ip)) {
        const parts = ip.split('.').map(Number);
        if (parts.every(part => part >= 0 && part <= 255)) {
          if (!allowPrivate && (
            parts[0] === 10 ||
            (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
            (parts[0] === 192 && parts[1] === 168)
          )) {
            return { isValid: false, message: 'Private IP addresses are not allowed' };
          }
          if (!allowReserved && (
            parts[0] === 0 ||
            parts[0] === 127 ||
            parts[0] >= 224
          )) {
            return { isValid: false, message: 'Reserved IP addresses are not allowed' };
          }
          return { isValid: true, message: 'Valid IPv4 address' };
        }
      }
      if (version === 'v4') {
        return { isValid: false, message: 'Invalid IPv4 address' };
      }
    }

    if (version === 'v6' || version === 'any') {
      if (ipv6Regex.test(ip)) {
        return { isValid: true, message: 'Valid IPv6 address' };
      }
      return { isValid: false, message: 'Invalid IPv6 address' };
    }

    return { isValid: false, message: 'Invalid IP address' };
  },

  isSSN(ssn: string, options: SSNOptions = {}): ValidationResult {
    const { 
      country = 'US',
      format = 'masked'
    } = options;

    if (!ssn) {
      return { isValid: false, message: 'SSN is required' };
    }

    const cleanSSN = ssn.replace(/[^\d]/g, '');

    if (country === 'US') {
      if (cleanSSN.length !== 9) {
        return { isValid: false, message: 'SSN must be 9 digits' };
      }

      if (/^0{3}|0{2}\d|\d0{2}/.test(cleanSSN)) {
        return { isValid: false, message: 'Invalid SSN format' };
      }

      if (/^666|000|9\d{2}/.test(cleanSSN)) {
        return { isValid: false, message: 'Invalid SSN format' };
      }

      if (format === 'masked') {
        const maskedRegex = /^\d{3}-\d{2}-\d{4}$/;
        if (!maskedRegex.test(ssn)) {
          return { isValid: false, message: 'SSN must be in format XXX-XX-XXXX' };
        }
      }
    }

    return { isValid: true, message: 'Valid SSN' };
  },

  isTime(time: string, options: TimeOptions = {}): ValidationResult {
    const {
      format = '24h',
      allowSeconds = true,
      minTime,
      maxTime
    } = options;

    if (!time) {
      return { isValid: false, message: 'Time is required' };
    }

    const time24hRegex = allowSeconds ? 
      /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/ :
      /^([01]\d|2[0-3]):([0-5]\d)$/;
    
    const time12hRegex = allowSeconds ?
      /^(0?\d|1[0-2]):([0-5]\d):([0-5]\d)\s*(AM|PM|am|pm)$/ :
      /^(0?\d|1[0-2]):([0-5]\d)\s*(AM|PM|am|pm)$/;

    if (format === '24h' && !time24hRegex.test(time)) {
      return { isValid: false, message: `Invalid 24-hour time format${allowSeconds ? ' (HH:MM:SS)' : ' (HH:MM)'}` };
    }

    if (format === '12h' && !time12hRegex.test(time)) {
      return { isValid: false, message: `Invalid 12-hour time format${allowSeconds ? ' (HH:MM:SS AM/PM)' : ' (HH:MM AM/PM)'}` };
    }

    if (minTime || maxTime) {
      // Convert to 24h format for comparison
      const timeValue = format === '12h' ? convertTo24Hour(time) : time;
      
      if (minTime && timeValue < minTime) {
        return { isValid: false, message: `Time must be after ${minTime}` };
      }
      
      if (maxTime && timeValue > maxTime) {
        return { isValid: false, message: `Time must be before ${maxTime}` };
      }
    }

    return { isValid: true, message: 'Valid time' };
  },

  isLatLng(coords: { lat: number, lng: number }, options: LatLngOptions = {}): ValidationResult {
    const {
      precision = 6,
      format = 'decimal'
    } = options;

    if (!coords || typeof coords.lat !== 'number' || typeof coords.lng !== 'number') {
      return { isValid: false, message: 'Invalid coordinates format' };
    }

    if (coords.lat < -90 || coords.lat > 90) {
      return { isValid: false, message: 'Latitude must be between -90 and 90 degrees' };
    }

    if (coords.lng < -180 || coords.lng > 180) {
      return { isValid: false, message: 'Longitude must be between -180 and 180 degrees' };
    }

    if (format === 'decimal') {
      const latPrecision = coords.lat.toString().split('.')[1]?.length || 0;
      const lngPrecision = coords.lng.toString().split('.')[1]?.length || 0;
      
      if (latPrecision > precision || lngPrecision > precision) {
        return { isValid: false, message: `Coordinates cannot have more than ${precision} decimal places` };
      }
    }

    return { 
      isValid: true, 
      message: 'Valid coordinates',
      details: format === 'dms' ? {
        lat: convertToDMS(coords.lat, 'lat'),
        lng: convertToDMS(coords.lng, 'lng')
      } : undefined
    };
  },

  isStrongPassword(password: string, options: PasswordStrengthOptions = {}): ValidationResult {
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSpecialChars = true,
      bannedPasswords = [],
      maxRepeatingChars = 3,
      customRegex
    } = options;

    if (!password) {
      return { isValid: false, message: 'Password is required', strength: 0 };
    }

    let strength = 0;
    const errors: string[] = [];

    // Length check
    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    } else {
      strength += 20;
    }

    // Uppercase check
    if (requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    } else if (requireUppercase) {
      strength += 20;
    }

    // Lowercase check
    if (requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    } else if (requireLowercase) {
      strength += 20;
    }

    // Numbers check
    if (requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    } else if (requireNumbers) {
      strength += 20;
    }

    // Special characters check
    if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    } else if (requireSpecialChars) {
      strength += 20;
    }

    // Banned passwords check
    if (bannedPasswords.includes(password.toLowerCase())) {
      errors.push('This password is not allowed');
      strength = 0;
    }

    // Repeating characters check
    const repeatingCharsRegex = new RegExp(`(.)\\1{${maxRepeatingChars},}`);
    if (repeatingCharsRegex.test(password)) {
      errors.push(`Password cannot contain ${maxRepeatingChars + 1} or more repeating characters`);
      strength -= 20;
    }

    // Custom regex check
    if (customRegex && !customRegex.test(password)) {
      errors.push('Password does not meet custom pattern requirements');
      strength -= 10;
    }

    // Ensure strength stays within 0-100
    strength = Math.max(0, Math.min(100, strength));

    return {
      isValid: errors.length === 0,
      message: errors.length > 0 ? errors.join('. ') : 'Password meets all requirements',
      strength
    };
  },

  isNumber(value: string | number, options: NumberValidationOptions = {}): ValidationResult {
    const {
      min,
      max,
      integer = false,
      positive = false,
      negative = false,
      precision,
      allowThousandsSeparator = true,
      allowScientificNotation = false
    } = options;

    // Clean the input if it's a string
    let numValue: number;
    if (typeof value === 'string') {
      // Remove thousands separators if allowed
      const cleanValue = allowThousandsSeparator ? value.replace(/,/g, '') : value;
      
      // Check for scientific notation
      if (!allowScientificNotation && /e/i.test(cleanValue)) {
        return { isValid: false, message: 'Scientific notation is not allowed' };
      }

      numValue = parseFloat(cleanValue);
    } else {
      numValue = value;
    }

    if (isNaN(numValue)) {
      return { isValid: false, message: 'Invalid number format' };
    }

    // Integer check
    if (integer && !Number.isInteger(numValue)) {
      return { isValid: false, message: 'Value must be an integer' };
    }

    // Sign checks
    if (positive && numValue <= 0) {
      return { isValid: false, message: 'Value must be positive' };
    }
    if (negative && numValue >= 0) {
      return { isValid: false, message: 'Value must be negative' };
    }

    // Range checks
    if (min !== undefined && numValue < min) {
      return { isValid: false, message: `Value must be greater than or equal to ${min}` };
    }
    if (max !== undefined && numValue > max) {
      return { isValid: false, message: `Value must be less than or equal to ${max}` };
    }

    // Precision check
    if (precision !== undefined) {
      const decimalPlaces = numValue.toString().split('.')[1]?.length || 0;
      if (decimalPlaces > precision) {
        return { isValid: false, message: `Value cannot have more than ${precision} decimal places` };
      }
    }

    return { isValid: true, message: 'Valid number' };
  },

  isArray(array: any[], options: ArrayValidationOptions = {}): ValidationResult {
    const {
      minLength = 0,
      maxLength = Infinity,
      unique = false,
      itemValidator,
      allowNull = false,
      allowEmpty = true,
      sortOrder = 'none'
    } = options;

    if (!Array.isArray(array)) {
      return { isValid: false, message: 'Value must be an array' };
    }

    if (!allowNull && array.some(item => item === null)) {
      return { isValid: false, message: 'Array cannot contain null values' };
    }

    if (!allowEmpty && array.length === 0) {
      return { isValid: false, message: 'Array cannot be empty' };
    }

    if (array.length < minLength) {
      return { isValid: false, message: `Array must contain at least ${minLength} items` };
    }

    if (array.length > maxLength) {
      return { isValid: false, message: `Array cannot contain more than ${maxLength} items` };
    }

    if (unique && new Set(array).size !== array.length) {
      return { isValid: false, message: 'Array must contain unique values' };
    }

    // Validate individual items
    if (itemValidator) {
      for (let i = 0; i < array.length; i++) {
        const itemValidation = itemValidator(array[i]);
        if (!itemValidation.isValid) {
          return {
            isValid: false,
            message: `Invalid item at index ${i}: ${itemValidation.message}`
          };
        }
      }
    }

    // Check sort order
    if (sortOrder !== 'none') {
      for (let i = 1; i < array.length; i++) {
        const prev = array[i - 1];
        const curr = array[i];
        
        if (sortOrder === 'asc' && prev > curr) {
          return { isValid: false, message: 'Array must be sorted in ascending order' };
        }
        if (sortOrder === 'desc' && prev < curr) {
          return { isValid: false, message: 'Array must be sorted in descending order' };
        }
      }
    }

    return { isValid: true, message: 'Valid array' };
  },

  isObject(obj: any, options: ObjectValidationOptions = {}): ValidationResult {
    const {
      requiredFields = [],
      optionalFields = [],
      allowExtra = false,
      fieldValidators = {},
      minProperties = 0,
      maxProperties = Infinity
    } = options;

    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      return { isValid: false, message: 'Value must be an object' };
    }

    const objKeys = Object.keys(obj);

    // Check number of properties
    if (objKeys.length < minProperties) {
      return { isValid: false, message: `Object must have at least ${minProperties} properties` };
    }
    if (objKeys.length > maxProperties) {
      return { isValid: false, message: `Object cannot have more than ${maxProperties} properties` };
    }

    // Check required fields
    for (const field of requiredFields) {
      if (!(field in obj)) {
        return { isValid: false, message: `Missing required field: ${field}` };
      }
    }

    // Check for extra fields
    if (!allowExtra) {
      const allowedFields = new Set([...requiredFields, ...optionalFields]);
      const extraFields = objKeys.filter(key => !allowedFields.has(key));
      if (extraFields.length > 0) {
        return { isValid: false, message: `Unknown fields: ${extraFields.join(', ')}` };
      }
    }

    // Validate field values
    for (const [field, validator] of Object.entries(fieldValidators)) {
      if (field in obj) {
        const validation = validator(obj[field]);
        if (!validation.isValid) {
          return {
            isValid: false,
            message: `Invalid value for field ${field}: ${validation.message}`
          };
        }
      }
    }

    return { isValid: true, message: 'Valid object' };
  },

  isDateInRange(date: Date | string, { minDate, maxDate, allowFuture = true, allowPast = true }: DateRangeOptions = {}): ValidationResult {
    // Convert string to Date if necessary
    let dateObj: Date;
    if (typeof date === 'string') {
      // Here you would implement date parsing based on the format
      // For now, we'll use basic parsing
      dateObj = new Date(date);
    } else {
      dateObj = date;
    }

    if (isNaN(dateObj.getTime())) {
      return { isValid: false, message: 'Invalid date format' };
    }

    const now = new Date();

    // Future/past checks
    if (!allowFuture && dateObj > now) {
      return { isValid: false, message: 'Future dates are not allowed' };
    }
    if (!allowPast && dateObj < now) {
      return { isValid: false, message: 'Past dates are not allowed' };
    }

    // Range checks
    if (minDate) {
      const minDateObj = typeof minDate === 'string' ? new Date(minDate) : minDate;
      if (dateObj < minDateObj) {
        return { isValid: false, message: `Date must be after ${minDateObj.toISOString()}` };
      }
    }
    if (maxDate) {
      const maxDateObj = typeof maxDate === 'string' ? new Date(maxDate) : maxDate;
      if (dateObj > maxDateObj) {
        return { isValid: false, message: `Date must be before ${maxDateObj.toISOString()}` };
      }
    }

    return { isValid: true, message: 'Valid date' };
  },

  isValidFileType(fileName: string, options: FileTypeOptions = {}): ValidationResult {
    const {
      allowedExtensions = [],
      maxFileNameLength = 255,
      allowSpaces = true,
      allowHidden = false
    } = options;

    if (!fileName) {
      return { isValid: false, message: 'Filename is required' };
    }

    // Check file name length
    if (fileName.length > maxFileNameLength) {
      return { isValid: false, message: `Filename cannot be longer than ${maxFileNameLength} characters` };
    }

    // Check for hidden files
    if (!allowHidden && fileName.startsWith('.')) {
      return { isValid: false, message: 'Hidden files are not allowed' };
    }

    // Check for spaces
    if (!allowSpaces && /\s/.test(fileName)) {
      return { isValid: false, message: 'Spaces are not allowed in filename' };
    }

    // Extension check
    if (allowedExtensions.length > 0) {
      const ext = fileName.split('.').pop()?.toLowerCase();
      if (!ext || !allowedExtensions.includes(ext)) {
        return { isValid: false, message: `File extension must be one of: ${allowedExtensions.join(', ')}` };
      }
    }

    // MIME type check would be implemented here if running in a browser environment
    // For Node.js, you would need additional libraries to check MIME types

    return { isValid: true, message: 'Valid file type' };
  }
};

// Helper functions
function convertTo24Hour(time12h: string): TimeConversionResult {
  const [time, modifier] = time12h.split(' ');
  const [hours, minutes] = time.split(':');
  let convertedHours = hours;
  
  if (hours === '12') {
    convertedHours = modifier === 'AM' ? '00' : '12';
  } else if (modifier === 'PM') {
    convertedHours = (parseInt(hours, 10) + 12).toString();
  }
  
  return {
    hour: parseInt(convertedHours, 10),
    minute: parseInt(minutes, 10),
    isValid: true
  };
}

function convertToDMS(decimal: number, type: 'lat' | 'lng'): DMSConversionResult {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const direction = type === 'lat'
    ? decimal >= 0 ? 'N' : 'S'
    : decimal >= 0 ? 'E' : 'W';
  
  return {
    dms: `${degrees}°${minutes}'${direction}`,
    isValid: true
  };
}

export default validate;
