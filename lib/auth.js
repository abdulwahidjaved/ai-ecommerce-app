// Email validation regex
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation rules
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requiresUppercase: true,
  requiresNumber: true,
  requiresSpecialChar: true,
};

// Validate email
export function validateEmail(email) {
  if (!email || email.trim().length === 0) {
    return { valid: false, error: 'Email is required' };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true };
}

// Validate password strength
export function validatePassword(password) {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    return {
      valid: false,
      error: `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters`,
    };
  }

  if (PASSWORD_REQUIREMENTS.requiresUppercase && !/[A-Z]/.test(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one uppercase letter',
    };
  }

  if (PASSWORD_REQUIREMENTS.requiresNumber && !/[0-9]/.test(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one number',
    };
  }

  if (PASSWORD_REQUIREMENTS.requiresSpecialChar && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one special character (!@#$%^&*)',
    };
  }

  return { valid: true };
}

// Validate name
export function validateName(name) {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Full name is required' };
  }

  if (name.trim().length < 2) {
    return { valid: false, error: 'Full name must be at least 2 characters' };
  }

  if (name.trim().length > 50) {
    return { valid: false, error: 'Full name must be less than 50 characters' };
  }

  return { valid: true };
}

// Get password strength score (0-5)
export function getPasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;

  return Math.min(strength, 5);
}

// Get password strength label
export function getPasswordStrengthLabel(strength) {
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return labels[strength] || 'Unknown';
}

// Get password strength color
export function getPasswordStrengthColor(strength) {
  const colors = ['red', 'orange', 'yellow', 'blue', 'green', 'emerald'];
  return colors[strength] || 'gray';
}
