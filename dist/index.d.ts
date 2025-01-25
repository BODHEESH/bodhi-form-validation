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
    maxSize?: number;
    allowedTypes?: string[];
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    aspectRatio?: number;
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
    fieldValidators?: {
        [key: string]: (value: any) => ValidationResult;
    };
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
    isLatLng(coords: {
        lat: number;
        lng: number;
    }, options?: LatLngOptions): ValidationResult;
    isStrongPassword(password: string, options?: PasswordStrengthOptions): ValidationResult;
    isNumber(value: string | number, options?: NumberValidationOptions): ValidationResult;
    isArray(array: any[], options?: ArrayValidationOptions): ValidationResult;
    isObject(obj: any, options?: ObjectValidationOptions): ValidationResult;
    isDateInRange(date: Date | string, options?: DateRangeOptions): ValidationResult;
    isValidFileType(fileName: string, options?: FileTypeOptions): ValidationResult;
}
declare const validate: Validator;
export default validate;
