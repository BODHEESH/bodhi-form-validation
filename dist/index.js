"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var validate = {
    isUsername: function (userName, options) {
        if (options === void 0) { options = {}; }
        var _a = options.minLength, minLength = _a === void 0 ? 3 : _a, _b = options.maxLength, maxLength = _b === void 0 ? 30 : _b, _c = options.allowSpecialChars, allowSpecialChars = _c === void 0 ? false : _c, _d = options.allowNumbers, allowNumbers = _d === void 0 ? true : _d;
        if (!userName || typeof userName !== 'string') {
            return { isValid: false, message: 'Username is required' };
        }
        if (userName.length < minLength) {
            return { isValid: false, message: "Username must be at least ".concat(minLength, " characters") };
        }
        if (userName.length > maxLength) {
            return { isValid: false, message: "Username cannot exceed ".concat(maxLength, " characters") };
        }
        var regex = allowSpecialChars
            ? new RegExp("^[a-zA-Z0-9".concat(allowNumbers ? '' : '_-', "]+$"))
            : new RegExp("^[a-zA-Z".concat(allowNumbers ? '0-9' : '', "]+$"));
        if (!regex.test(userName)) {
            return {
                isValid: false,
                message: "Username can only contain ".concat(allowSpecialChars ? 'letters, numbers, and special characters' : 'letters' + (allowNumbers ? ' and numbers' : ''))
            };
        }
        return { isValid: true, message: 'Valid username' };
    },
    isEmail: function (email, options) {
        if (options === void 0) { options = {}; }
        var _a = options.allowSubdomains, allowSubdomains = _a === void 0 ? true : _a, _b = options.allowInternational, allowInternational = _b === void 0 ? true : _b, _c = options.maxLength // RFC 5321
        , maxLength = _c === void 0 ? 254 : _c // RFC 5321
        ;
        if (!email || typeof email !== 'string') {
            return { isValid: false, message: 'Email is required' };
        }
        if (email.length > maxLength) {
            return { isValid: false, message: "Email cannot exceed ".concat(maxLength, " characters") };
        }
        var emailRegex = allowInternational
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
    isPasswordMatch: function (password, confirmPassword) {
        if (!password || !confirmPassword) {
            return { isValid: false, message: 'Both passwords are required' };
        }
        return {
            isValid: password === confirmPassword,
            message: password === confirmPassword ? 'Passwords match' : 'Passwords do not match'
        };
    },
    isPassword: function (password, options) {
        if (options === void 0) { options = {}; }
        var _a = options.minLength, minLength = _a === void 0 ? 8 : _a, _b = options.maxLength, maxLength = _b === void 0 ? 128 : _b, _c = options.requireUppercase, requireUppercase = _c === void 0 ? true : _c, _d = options.requireLowercase, requireLowercase = _d === void 0 ? true : _d, _e = options.requireNumbers, requireNumbers = _e === void 0 ? true : _e, _f = options.requireSymbols, requireSymbols = _f === void 0 ? true : _f, _g = options.allowSpaces, allowSpaces = _g === void 0 ? false : _g, _h = options.minStrength, minStrength = _h === void 0 ? 3 : _h;
        if (!password || typeof password !== 'string') {
            return { isValid: false, message: 'Password is required' };
        }
        var checks = {
            length: password.length >= minLength && password.length <= maxLength,
            uppercase: !requireUppercase || /[A-Z]/.test(password),
            lowercase: !requireLowercase || /[a-z]/.test(password),
            numbers: !requireNumbers || /[0-9]/.test(password),
            symbols: !requireSymbols || /[!@#$%^&*(),.?":{}|<>]/.test(password),
            spaces: allowSpaces || !/\s/.test(password)
        };
        var strength = Object.values(checks).filter(Boolean).length;
        if (!checks.length) {
            return {
                isValid: false,
                message: "Password must be between ".concat(minLength, " and ").concat(maxLength, " characters")
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
            strength: strength
        };
    },
    isPhone: function (phone, options) {
        if (options === void 0) { options = {}; }
        var _a = options.country, country = _a === void 0 ? 'INTERNATIONAL' : _a, _b = options.allowSpaces, allowSpaces = _b === void 0 ? true : _b, _c = options.requireCountryCode, requireCountryCode = _c === void 0 ? false : _c;
        if (!phone || typeof phone !== 'string') {
            return { isValid: false, message: 'Phone number is required' };
        }
        var cleanPhone = phone.replace(/\s/g, '');
        var intlRegex = /^\+?[1-9]\d{1,14}$/;
        var formats = {
            US: /^\+?1?\d{10}$/,
            UK: /^\+?44\d{10}$/,
            IN: /^\+?91\d{10}$/,
            INTERNATIONAL: intlRegex
        };
        var regex = formats[country] || intlRegex;
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
    isURL: function (url, options) {
        if (options === void 0) { options = {}; }
        var _a = options.requireProtocol, requireProtocol = _a === void 0 ? true : _a, _b = options.allowedProtocols, allowedProtocols = _b === void 0 ? ['http:', 'https:'] : _b, _c = options.allowQueryParams, allowQueryParams = _c === void 0 ? true : _c, _d = options.allowFragments, allowFragments = _d === void 0 ? true : _d;
        if (!url || typeof url !== 'string') {
            return { isValid: false, message: 'URL is required' };
        }
        try {
            var urlObj = new URL(url);
            if (requireProtocol && !allowedProtocols.includes(urlObj.protocol)) {
                return {
                    isValid: false,
                    message: "URL must use one of these protocols: ".concat(allowedProtocols.join(', '))
                };
            }
            if (!allowQueryParams && urlObj.search) {
                return { isValid: false, message: 'Query parameters are not allowed' };
            }
            if (!allowFragments && urlObj.hash) {
                return { isValid: false, message: 'URL fragments are not allowed' };
            }
            return { isValid: true, message: 'Valid URL' };
        }
        catch (_e) {
            return { isValid: false, message: 'Invalid URL format' };
        }
    },
    isDate: function (date, options) {
        if (options === void 0) { options = {}; }
        var _a = options.format, format = _a === void 0 ? 'YYYY-MM-DD' : _a, minDate = options.minDate, maxDate = options.maxDate, _b = options.allowFuture, allowFuture = _b === void 0 ? true : _b, _c = options.allowPast, allowPast = _c === void 0 ? true : _c;
        if (!date) {
            return { isValid: false, message: 'Date is required' };
        }
        var dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            return { isValid: false, message: 'Invalid date format' };
        }
        var now = new Date();
        if (!allowFuture && dateObj > now) {
            return { isValid: false, message: 'Future dates are not allowed' };
        }
        if (!allowPast && dateObj < now) {
            return { isValid: false, message: 'Past dates are not allowed' };
        }
        if (minDate && dateObj < new Date(minDate)) {
            return { isValid: false, message: "Date must be after ".concat(minDate) };
        }
        if (maxDate && dateObj > new Date(maxDate)) {
            return { isValid: false, message: "Date must be before ".concat(maxDate) };
        }
        return { isValid: true, message: 'Valid date' };
    },
    isCreditCard: function (cardNumber) {
        if (!cardNumber || typeof cardNumber !== 'string') {
            return { isValid: false, message: 'Credit card number is required' };
        }
        var num = cardNumber.replace(/[\s-]/g, '');
        if (!/^\d+$/.test(num)) {
            return { isValid: false, message: 'Credit card number can only contain digits' };
        }
        var sum = 0;
        var isEven = false;
        for (var i = num.length - 1; i >= 0; i--) {
            var digit = parseInt(num[i]);
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
    isPostalCode: function (code, options) {
        if (options === void 0) { options = {}; }
        var _a = options.country, country = _a === void 0 ? 'US' : _a;
        if (!code || typeof code !== 'string') {
            return { isValid: false, message: 'Postal code is required' };
        }
        var formats = {
            US: /^\d{5}(-\d{4})?$/,
            UK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
            CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] ?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i,
            IN: /^\d{6}$/
        };
        var regex = formats[country];
        if (!regex) {
            return { isValid: false, message: 'Unsupported country code' };
        }
        return {
            isValid: regex.test(code),
            message: regex.test(code) ? 'Valid postal code' : 'Invalid postal code format'
        };
    },
    isFile: function (file, options) {
        if (options === void 0) { options = {}; }
        var _a = options.maxSize, maxSize = _a === void 0 ? 5 * 1024 * 1024 : _a, // 5MB default
        _b = options.allowedTypes, // 5MB default
        allowedTypes = _b === void 0 ? [] : _b, minWidth = options.minWidth, minHeight = options.minHeight, maxWidth = options.maxWidth, maxHeight = options.maxHeight, aspectRatio = options.aspectRatio;
        if (!file) {
            return { isValid: false, message: 'File is required' };
        }
        if (file.size > maxSize) {
            return { isValid: false, message: "File size must not exceed ".concat(maxSize / (1024 * 1024), "MB") };
        }
        if (allowedTypes.length && !allowedTypes.includes(file.type)) {
            return { isValid: false, message: "File type must be one of: ".concat(allowedTypes.join(', ')) };
        }
        // Additional image validations would be implemented here
        // Note: Actual implementation would require browser APIs or Node.js modules
        return { isValid: true, message: 'Valid file' };
    },
    isAddress: function (address, options) {
        if (options === void 0) { options = {}; }
        var _a = options.requireStreet, requireStreet = _a === void 0 ? true : _a, _b = options.requireCity, requireCity = _b === void 0 ? true : _b, _c = options.requireState, requireState = _c === void 0 ? true : _c, _d = options.requireZip, requireZip = _d === void 0 ? true : _d, _e = options.requireCountry, requireCountry = _e === void 0 ? true : _e, _f = options.allowPOBox, allowPOBox = _f === void 0 ? true : _f;
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
    isMoney: function (amount, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var _b = options.currency, currency = _b === void 0 ? 'USD' : _b, _c = options.minAmount, minAmount = _c === void 0 ? 0 : _c, _d = options.maxAmount, maxAmount = _d === void 0 ? Number.MAX_SAFE_INTEGER : _d, _e = options.allowNegative, allowNegative = _e === void 0 ? false : _e, _f = options.decimals, decimals = _f === void 0 ? 2 : _f;
        var value = typeof amount === 'string' ? parseFloat(amount) : amount;
        if (isNaN(value)) {
            return { isValid: false, message: 'Invalid monetary value' };
        }
        if (!allowNegative && value < 0) {
            return { isValid: false, message: 'Negative values are not allowed' };
        }
        if (value < minAmount) {
            return { isValid: false, message: "Amount must be at least ".concat(minAmount) };
        }
        if (value > maxAmount) {
            return { isValid: false, message: "Amount must not exceed ".concat(maxAmount) };
        }
        var decimalPlaces = ((_a = value.toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        if (decimalPlaces > decimals) {
            return { isValid: false, message: "Amount cannot have more than ".concat(decimals, " decimal places") };
        }
        return { isValid: true, message: 'Valid amount' };
    },
    isColor: function (color, options) {
        if (options === void 0) { options = {}; }
        var _a = options.format, format = _a === void 0 ? 'any' : _a, _b = options.allowAlpha, allowAlpha = _b === void 0 ? true : _b;
        if (!color) {
            return { isValid: false, message: 'Color value is required' };
        }
        var hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        var rgbRegex = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;
        var rgbaRegex = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([01]|0?\.\d+)\s*\)$/;
        var hslRegex = /^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/;
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
    isIPAddress: function (ip, options) {
        if (options === void 0) { options = {}; }
        var _a = options.version, version = _a === void 0 ? 'any' : _a, _b = options.allowPrivate, allowPrivate = _b === void 0 ? true : _b, _c = options.allowReserved, allowReserved = _c === void 0 ? false : _c;
        if (!ip) {
            return { isValid: false, message: 'IP address is required' };
        }
        var ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
        var ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
        if (version === 'v4' || version === 'any') {
            if (ipv4Regex.test(ip)) {
                var parts = ip.split('.').map(Number);
                if (parts.every(function (part) { return part >= 0 && part <= 255; })) {
                    if (!allowPrivate && (parts[0] === 10 ||
                        (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
                        (parts[0] === 192 && parts[1] === 168))) {
                        return { isValid: false, message: 'Private IP addresses are not allowed' };
                    }
                    if (!allowReserved && (parts[0] === 0 ||
                        parts[0] === 127 ||
                        parts[0] >= 224)) {
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
    isSSN: function (ssn, options) {
        if (options === void 0) { options = {}; }
        var _a = options.country, country = _a === void 0 ? 'US' : _a, _b = options.format, format = _b === void 0 ? 'masked' : _b;
        if (!ssn) {
            return { isValid: false, message: 'SSN is required' };
        }
        var cleanSSN = ssn.replace(/[^\d]/g, '');
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
                var maskedRegex = /^\d{3}-\d{2}-\d{4}$/;
                if (!maskedRegex.test(ssn)) {
                    return { isValid: false, message: 'SSN must be in format XXX-XX-XXXX' };
                }
            }
        }
        return { isValid: true, message: 'Valid SSN' };
    },
    isTime: function (time, options) {
        if (options === void 0) { options = {}; }
        var _a = options.format, format = _a === void 0 ? '24h' : _a, _b = options.allowSeconds, allowSeconds = _b === void 0 ? true : _b, minTime = options.minTime, maxTime = options.maxTime;
        if (!time) {
            return { isValid: false, message: 'Time is required' };
        }
        var time24hRegex = allowSeconds ?
            /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/ :
            /^([01]\d|2[0-3]):([0-5]\d)$/;
        var time12hRegex = allowSeconds ?
            /^(0?\d|1[0-2]):([0-5]\d):([0-5]\d)\s*(AM|PM|am|pm)$/ :
            /^(0?\d|1[0-2]):([0-5]\d)\s*(AM|PM|am|pm)$/;
        if (format === '24h' && !time24hRegex.test(time)) {
            return { isValid: false, message: "Invalid 24-hour time format".concat(allowSeconds ? ' (HH:MM:SS)' : ' (HH:MM)') };
        }
        if (format === '12h' && !time12hRegex.test(time)) {
            return { isValid: false, message: "Invalid 12-hour time format".concat(allowSeconds ? ' (HH:MM:SS AM/PM)' : ' (HH:MM AM/PM)') };
        }
        if (minTime || maxTime) {
            // Convert to 24h format for comparison
            var timeValue = format === '12h' ? convertTo24Hour(time) : time;
            if (minTime && timeValue < minTime) {
                return { isValid: false, message: "Time must be after ".concat(minTime) };
            }
            if (maxTime && timeValue > maxTime) {
                return { isValid: false, message: "Time must be before ".concat(maxTime) };
            }
        }
        return { isValid: true, message: 'Valid time' };
    },
    isLatLng: function (coords, options) {
        var _a, _b;
        if (options === void 0) { options = {}; }
        var _c = options.precision, precision = _c === void 0 ? 6 : _c, _d = options.format, format = _d === void 0 ? 'decimal' : _d;
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
            var latPrecision = ((_a = coords.lat.toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
            var lngPrecision = ((_b = coords.lng.toString().split('.')[1]) === null || _b === void 0 ? void 0 : _b.length) || 0;
            if (latPrecision > precision || lngPrecision > precision) {
                return { isValid: false, message: "Coordinates cannot have more than ".concat(precision, " decimal places") };
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
    isStrongPassword: function (password, options) {
        if (options === void 0) { options = {}; }
        var _a = options.minLength, minLength = _a === void 0 ? 8 : _a, _b = options.requireUppercase, requireUppercase = _b === void 0 ? true : _b, _c = options.requireLowercase, requireLowercase = _c === void 0 ? true : _c, _d = options.requireNumbers, requireNumbers = _d === void 0 ? true : _d, _e = options.requireSpecialChars, requireSpecialChars = _e === void 0 ? true : _e, _f = options.bannedPasswords, bannedPasswords = _f === void 0 ? [] : _f, _g = options.maxRepeatingChars, maxRepeatingChars = _g === void 0 ? 3 : _g, customRegex = options.customRegex;
        if (!password) {
            return { isValid: false, message: 'Password is required', strength: 0 };
        }
        var strength = 0;
        var errors = [];
        // Length check
        if (password.length < minLength) {
            errors.push("Password must be at least ".concat(minLength, " characters long"));
        }
        else {
            strength += 20;
        }
        // Uppercase check
        if (requireUppercase && !/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        else if (requireUppercase) {
            strength += 20;
        }
        // Lowercase check
        if (requireLowercase && !/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        else if (requireLowercase) {
            strength += 20;
        }
        // Numbers check
        if (requireNumbers && !/\d/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        else if (requireNumbers) {
            strength += 20;
        }
        // Special characters check
        if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }
        else if (requireSpecialChars) {
            strength += 20;
        }
        // Banned passwords check
        if (bannedPasswords.includes(password.toLowerCase())) {
            errors.push('This password is not allowed');
            strength = 0;
        }
        // Repeating characters check
        var repeatingCharsRegex = new RegExp("(.)\\1{".concat(maxRepeatingChars, ",}"));
        if (repeatingCharsRegex.test(password)) {
            errors.push("Password cannot contain ".concat(maxRepeatingChars + 1, " or more repeating characters"));
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
            strength: strength
        };
    },
    isNumber: function (value, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var min = options.min, max = options.max, _b = options.integer, integer = _b === void 0 ? false : _b, _c = options.positive, positive = _c === void 0 ? false : _c, _d = options.negative, negative = _d === void 0 ? false : _d, precision = options.precision, _e = options.allowThousandsSeparator, allowThousandsSeparator = _e === void 0 ? true : _e, _f = options.allowScientificNotation, allowScientificNotation = _f === void 0 ? false : _f;
        // Clean the input if it's a string
        var numValue;
        if (typeof value === 'string') {
            // Remove thousands separators if allowed
            var cleanValue = allowThousandsSeparator ? value.replace(/,/g, '') : value;
            // Check for scientific notation
            if (!allowScientificNotation && /e/i.test(cleanValue)) {
                return { isValid: false, message: 'Scientific notation is not allowed' };
            }
            numValue = parseFloat(cleanValue);
        }
        else {
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
            return { isValid: false, message: "Value must be greater than or equal to ".concat(min) };
        }
        if (max !== undefined && numValue > max) {
            return { isValid: false, message: "Value must be less than or equal to ".concat(max) };
        }
        // Precision check
        if (precision !== undefined) {
            var decimalPlaces = ((_a = numValue.toString().split('.')[1]) === null || _a === void 0 ? void 0 : _a.length) || 0;
            if (decimalPlaces > precision) {
                return { isValid: false, message: "Value cannot have more than ".concat(precision, " decimal places") };
            }
        }
        return { isValid: true, message: 'Valid number' };
    },
    isArray: function (array, options) {
        if (options === void 0) { options = {}; }
        var _a = options.minLength, minLength = _a === void 0 ? 0 : _a, _b = options.maxLength, maxLength = _b === void 0 ? Infinity : _b, _c = options.unique, unique = _c === void 0 ? false : _c, itemValidator = options.itemValidator, _d = options.allowNull, allowNull = _d === void 0 ? false : _d, _e = options.allowEmpty, allowEmpty = _e === void 0 ? true : _e, _f = options.sortOrder, sortOrder = _f === void 0 ? 'none' : _f;
        if (!Array.isArray(array)) {
            return { isValid: false, message: 'Value must be an array' };
        }
        if (!allowNull && array.some(function (item) { return item === null; })) {
            return { isValid: false, message: 'Array cannot contain null values' };
        }
        if (!allowEmpty && array.length === 0) {
            return { isValid: false, message: 'Array cannot be empty' };
        }
        if (array.length < minLength) {
            return { isValid: false, message: "Array must contain at least ".concat(minLength, " items") };
        }
        if (array.length > maxLength) {
            return { isValid: false, message: "Array cannot contain more than ".concat(maxLength, " items") };
        }
        if (unique && new Set(array).size !== array.length) {
            return { isValid: false, message: 'Array must contain unique values' };
        }
        // Validate individual items
        if (itemValidator) {
            for (var i = 0; i < array.length; i++) {
                var itemValidation = itemValidator(array[i]);
                if (!itemValidation.isValid) {
                    return {
                        isValid: false,
                        message: "Invalid item at index ".concat(i, ": ").concat(itemValidation.message)
                    };
                }
            }
        }
        // Check sort order
        if (sortOrder !== 'none') {
            for (var i = 1; i < array.length; i++) {
                var prev = array[i - 1];
                var curr = array[i];
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
    isObject: function (obj, options) {
        if (options === void 0) { options = {}; }
        var _a = options.requiredFields, requiredFields = _a === void 0 ? [] : _a, _b = options.optionalFields, optionalFields = _b === void 0 ? [] : _b, _c = options.allowExtra, allowExtra = _c === void 0 ? false : _c, _d = options.fieldValidators, fieldValidators = _d === void 0 ? {} : _d, _e = options.minProperties, minProperties = _e === void 0 ? 0 : _e, _f = options.maxProperties, maxProperties = _f === void 0 ? Infinity : _f;
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            return { isValid: false, message: 'Value must be an object' };
        }
        var objKeys = Object.keys(obj);
        // Check number of properties
        if (objKeys.length < minProperties) {
            return { isValid: false, message: "Object must have at least ".concat(minProperties, " properties") };
        }
        if (objKeys.length > maxProperties) {
            return { isValid: false, message: "Object cannot have more than ".concat(maxProperties, " properties") };
        }
        // Check required fields
        for (var _i = 0, requiredFields_1 = requiredFields; _i < requiredFields_1.length; _i++) {
            var field = requiredFields_1[_i];
            if (!(field in obj)) {
                return { isValid: false, message: "Missing required field: ".concat(field) };
            }
        }
        // Check for extra fields
        if (!allowExtra) {
            var allowedFields_1 = new Set(__spreadArray(__spreadArray([], requiredFields, true), optionalFields, true));
            var extraFields = objKeys.filter(function (key) { return !allowedFields_1.has(key); });
            if (extraFields.length > 0) {
                return { isValid: false, message: "Unknown fields: ".concat(extraFields.join(', ')) };
            }
        }
        // Validate field values
        for (var _g = 0, _h = Object.entries(fieldValidators); _g < _h.length; _g++) {
            var _j = _h[_g], field = _j[0], validator = _j[1];
            if (field in obj) {
                var validation = validator(obj[field]);
                if (!validation.isValid) {
                    return {
                        isValid: false,
                        message: "Invalid value for field ".concat(field, ": ").concat(validation.message)
                    };
                }
            }
        }
        return { isValid: true, message: 'Valid object' };
    },
    isDateInRange: function (date, options) {
        if (options === void 0) { options = {}; }
        var minDate = options.minDate, maxDate = options.maxDate, _a = options.allowWeekends, allowWeekends = _a === void 0 ? true : _a, _b = options.allowHolidays, allowHolidays = _b === void 0 ? true : _b, format = options.format, timezone = options.timezone, _c = options.allowFuture, allowFuture = _c === void 0 ? true : _c, _d = options.allowPast, allowPast = _d === void 0 ? true : _d, minAge = options.minAge, maxAge = options.maxAge;
        // Convert string to Date if necessary
        var dateObj;
        if (typeof date === 'string') {
            if (format) {
                // Here you would implement date parsing based on the format
                // For now, we'll use basic parsing
                dateObj = new Date(date);
            }
            else {
                dateObj = new Date(date);
            }
        }
        else {
            dateObj = date;
        }
        if (isNaN(dateObj.getTime())) {
            return { isValid: false, message: 'Invalid date format' };
        }
        // Timezone adjustment if specified
        if (timezone) {
            // Here you would implement timezone conversion
            // This would require a date library like moment-timezone
        }
        var now = new Date();
        // Future/past checks
        if (!allowFuture && dateObj > now) {
            return { isValid: false, message: 'Future dates are not allowed' };
        }
        if (!allowPast && dateObj < now) {
            return { isValid: false, message: 'Past dates are not allowed' };
        }
        // Range checks
        if (minDate) {
            var minDateObj = typeof minDate === 'string' ? new Date(minDate) : minDate;
            if (dateObj < minDateObj) {
                return { isValid: false, message: "Date must be after ".concat(minDateObj.toISOString()) };
            }
        }
        if (maxDate) {
            var maxDateObj = typeof maxDate === 'string' ? new Date(maxDate) : maxDate;
            if (dateObj > maxDateObj) {
                return { isValid: false, message: "Date must be before ".concat(maxDateObj.toISOString()) };
            }
        }
        // Weekend check
        if (!allowWeekends) {
            var day = dateObj.getDay();
            if (day === 0 || day === 6) {
                return { isValid: false, message: 'Weekends are not allowed' };
            }
        }
        // Age checks
        if (minAge !== undefined || maxAge !== undefined) {
            var ageDate = new Date(dateObj);
            var years = now.getFullYear() - ageDate.getFullYear();
            var monthDiff = now.getMonth() - ageDate.getMonth();
            var dayDiff = now.getDate() - ageDate.getDate();
            var age = years - (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? 1 : 0);
            if (minAge !== undefined && age < minAge) {
                return { isValid: false, message: "Age must be at least ".concat(minAge, " years") };
            }
            if (maxAge !== undefined && age > maxAge) {
                return { isValid: false, message: "Age cannot be more than ".concat(maxAge, " years") };
            }
        }
        return { isValid: true, message: 'Valid date' };
    },
    isValidFileType: function (fileName, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var _b = options.allowedExtensions, allowedExtensions = _b === void 0 ? [] : _b, _c = options.allowedMimeTypes, allowedMimeTypes = _c === void 0 ? [] : _c, _d = options.maxFileNameLength, maxFileNameLength = _d === void 0 ? 255 : _d, _e = options.allowSpaces, allowSpaces = _e === void 0 ? true : _e, _f = options.checkMimeType, checkMimeType = _f === void 0 ? true : _f, _g = options.allowHidden, allowHidden = _g === void 0 ? false : _g;
        if (!fileName) {
            return { isValid: false, message: 'Filename is required' };
        }
        // Check file name length
        if (fileName.length > maxFileNameLength) {
            return { isValid: false, message: "Filename cannot be longer than ".concat(maxFileNameLength, " characters") };
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
            var ext = (_a = fileName.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            if (!ext || !allowedExtensions.includes(ext)) {
                return { isValid: false, message: "File extension must be one of: ".concat(allowedExtensions.join(', ')) };
            }
        }
        // MIME type check would be implemented here if running in a browser environment
        // For Node.js, you would need additional libraries to check MIME types
        return { isValid: true, message: 'Valid file type' };
    }
};
// Helper functions
function convertTo24Hour(time12h) {
    var _a = time12h.split(' '), time = _a[0], modifier = _a[1];
    var _b = time.split(':'), hours = _b[0], minutes = _b[1], seconds = _b[2];
    if (hours === '12') {
        hours = '00';
    }
    if (modifier.toLowerCase() === 'pm') {
        hours = (parseInt(hours, 10) + 12).toString();
    }
    return "".concat(hours, ":").concat(minutes).concat(seconds ? ":".concat(seconds) : '');
}
function convertToDMS(decimal, type) {
    var absolute = Math.abs(decimal);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);
    var direction = type === 'lat'
        ? decimal >= 0 ? 'N' : 'S'
        : decimal >= 0 ? 'E' : 'W';
    return "".concat(degrees, "\u00B0").concat(minutes, "'").concat(seconds, "\"").concat(direction);
}
exports.default = validate;
