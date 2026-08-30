document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('current-password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const passwordToggle = document.getElementById('password-toggle');
  const submitBtn = document.getElementById('submit-btn');
  const successBanner = document.getElementById('success-banner');

  // SVG Icons for Password Toggle
  const eyeIconSvg = `
    <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  `;

  const eyeOffIconSvg = `
    <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  `;

  // SVG Icon for Error Alert
  const errorIconSvg = `
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="flex-shrink: 0;" aria-hidden="true">
      <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm-1-8a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0V7zm1-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" clip-rule="evenodd"/>
    </svg>
  `;

  // Initialize toggle icon
  passwordToggle.innerHTML = eyeIconSvg;

  // Toggle Password Visibility
  passwordToggle.addEventListener('click', () => {
    const isPressed = passwordToggle.getAttribute('aria-pressed') === 'true';
    
    if (isPressed) {
      // Hide Password
      passwordInput.setAttribute('type', 'password');
      passwordToggle.setAttribute('aria-pressed', 'false');
      passwordToggle.setAttribute('aria-label', 'Show password');
      passwordToggle.innerHTML = eyeIconSvg;
    } else {
      // Show Password
      passwordInput.setAttribute('type', 'text');
      passwordToggle.setAttribute('aria-pressed', 'true');
      passwordToggle.setAttribute('aria-label', 'Hide password');
      passwordToggle.innerHTML = eyeOffIconSvg;
    }
  });

  // Validation Helpers
  const validateEmail = () => {
    if (emailInput.validity.valueMissing) {
      showError(emailInput, emailError, 'Email address is required.');
      return false;
    }
    
    if (emailInput.validity.typeMismatch) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      return false;
    }
    
    // Custom regex check for stricter matching (e.g. standard email format domain suffix check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      return false;
    }

    clearError(emailInput, emailError);
    return true;
  };

  const validatePassword = () => {
    if (passwordInput.validity.valueMissing) {
      showError(passwordInput, passwordError, 'Password is required.');
      return false;
    }

    if (passwordInput.value.length < 6) {
      showError(passwordInput, passwordError, 'Password must be at least 6 characters.');
      return false;
    }

    clearError(passwordInput, passwordError);
    return true;
  };

  const showError = (input, errorContainer, message) => {
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    errorContainer.innerHTML = `${errorIconSvg} <span>${message}</span>`;
    errorContainer.classList.add('show');
  };

  const clearError = (input, errorContainer) => {
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    errorContainer.classList.remove('show');
    // Keep message until transition finishes for styling consistency
    setTimeout(() => {
      if (!errorContainer.classList.contains('show')) {
        errorContainer.innerHTML = '';
      }
    }, 200);
  };

  // Event Listeners for Real-Time Validation
  // Validate on blur / exiting a field
  emailInput.addEventListener('blur', validateEmail);
  passwordInput.addEventListener('blur', validatePassword);

  // Clear errors immediately on input typing
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('is-invalid')) {
      // Re-evaluate on input only if already in invalid state, to clear error dynamically
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput.value.trim() !== '' && emailRegex.test(emailInput.value)) {
        clearError(emailInput, emailError);
      }
    }
  });

  passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('is-invalid')) {
      if (passwordInput.value.length >= 6) {
        clearError(passwordInput, passwordError);
      }
    }
  });

  // Form Submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Trigger validation for all fields
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      // Focus the first invalid element to assist keyboard/screen-readers
      if (!isEmailValid) {
        emailInput.focus();
      } else {
        passwordInput.focus();
      }
      return;
    }

    // Form is valid - Proceed with simulation
    setLoadingState(true);
    successBanner.style.display = 'none';

    // Simulate API authorization request
    setTimeout(() => {
      setLoadingState(false);
      
      // Visual feedback success
      successBanner.style.display = 'flex';
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // Reset form
      loginForm.reset();
      passwordToggle.innerHTML = eyeIconSvg;
      passwordInput.setAttribute('type', 'password');
      passwordToggle.setAttribute('aria-pressed', 'false');
      
      // Clear success banner after 5 seconds
      setTimeout(() => {
        successBanner.style.animation = 'slideDown var(--transition-normal) reverse';
        setTimeout(() => {
          successBanner.style.display = 'none';
          successBanner.style.animation = '';
        }, 250);
      }, 5000);
      
    }, 1500);
  });

  const setLoadingState = (isLoading) => {
    if (isLoading) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      emailInput.disabled = true;
      passwordInput.disabled = true;
      passwordToggle.disabled = true;
    } else {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      emailInput.disabled = false;
      passwordInput.disabled = false;
      passwordToggle.disabled = false;
    }
  };
});
