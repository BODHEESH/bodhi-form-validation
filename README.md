# Bodhi Form Validations

[![npm version](https://img.shields.io/npm/v/bodhi-form-validations.svg?style=flat)](https://www.npmjs.com/package/bodhi-form-validations)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive, modern form validation library with TypeScript support. This library provides a robust set of validation functions for common form fields with customizable options and detailed error messages.

## Features

- 🚀 Full TypeScript support
- 📝 Comprehensive validation rules
- ⚙️ Highly customizable options
- 🌍 International support
- 💪 Zero dependencies
- 📱 Browser and Node.js compatible
- 🔒 Strong password validation
- 🌐 Multiple country formats support

## Installation

```bash
npm install bodhi-form-validations
```

or

```bash
yarn add bodhi-form-validations
```

## Usage

```typescript
import validate from 'bodhi-form-validations';

// Username validation
const usernameResult = validate.isUsername('JohnDoe', {
  minLength: 3,
  maxLength: 30,
  allowSpecialChars: false
});
console.log(usernameResult); // { isValid: true, message: 'Valid username' }

// Email validation
const emailResult = validate.isEmail('user@example.com', {
  allowSubdomains: true,
  allowInternational: true
});
console.log(emailResult); // { isValid: true, message: 'Valid email' }

// Password validation
const passwordResult = validate.isPassword('StrongP@ss123', {
  minLength: 8,
  requireUppercase: true,
  requireNumbers: true,
  requireSymbols: true
});
console.log(passwordResult); // { isValid: true, message: 'Strong password', strength: 4 }
```

## API Reference

### Username Validation
```typescript
validate.isUsername(username: string, options?: {
  minLength?: number;      // default: 3
  maxLength?: number;      // default: 30
  allowSpecialChars?: boolean; // default: false
  allowNumbers?: boolean;  // default: true
})
```

### Email Validation
```typescript
validate.isEmail(email: string, options?: {
  allowSubdomains?: boolean;    // default: true
  allowInternational?: boolean; // default: true
  maxLength?: number;           // default: 254
})
```

### Password Validation
```typescript
validate.isPassword(password: string, options?: {
  minLength?: number;        // default: 8
  maxLength?: number;        // default: 128
  requireUppercase?: boolean;// default: true
  requireLowercase?: boolean;// default: true
  requireNumbers?: boolean;  // default: true
  requireSymbols?: boolean;  // default: true
  allowSpaces?: boolean;     // default: false
  minStrength?: number;      // default: 3 (1-4 scale)
})
```

### Phone Number Validation
```typescript
validate.isPhone(phone: string, options?: {
  country?: 'US' | 'UK' | 'IN' | 'INTERNATIONAL'; // default: 'INTERNATIONAL'
  allowSpaces?: boolean;     // default: true
  requireCountryCode?: boolean; // default: false
})
```

### URL Validation
```typescript
validate.isURL(url: string, options?: {
  requireProtocol?: boolean;   // default: true
  allowedProtocols?: string[]; // default: ['http:', 'https:']
  allowQueryParams?: boolean;  // default: true
  allowFragments?: boolean;    // default: true
})
```

### Date Validation
```typescript
validate.isDate(date: string | Date, options?: {
  format?: string;            // default: 'YYYY-MM-DD'
  minDate?: Date | string;    // optional
  maxDate?: Date | string;    // optional
  allowFuture?: boolean;      // default: true
  allowPast?: boolean;        // default: true
})
```

### Credit Card Validation
```typescript
validate.isCreditCard(cardNumber: string)
```

### Postal Code Validation
```typescript
validate.isPostalCode(code: string, options?: {
  country?: 'US' | 'UK' | 'CA' | 'IN'; // default: 'US'
})
```

## Return Type

All validation functions return a `ValidationResult` object:

```typescript
interface ValidationResult {
  isValid: boolean;  // Whether the validation passed
  message: string;   // Validation message
  strength?: number; // Only for password validation (1-4 scale)
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request to our [GitHub repository](https://github.com/BODHEESH/bodhi-form-validation).

## Bug Reports

If you discover any bugs, feel free to create an issue on our [GitHub repository](https://github.com/BODHEESH/bodhi-form-validation/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
