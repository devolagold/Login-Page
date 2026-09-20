document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const signupForm = document.getElementById('signup-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const teamNameInput = document.getElementById('team-name');
  const teamSizeSelect = document.getElementById('team-size');
  const passwordInput = document.getElementById('new-password');
  const confirmPasswordInput = document.getElementById('confirm-password');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const teamNameError = document.getElementById('team-name-error');
  const teamSizeError = document.getElementById('team-size-error');
  const passwordError = document.getElementById('password-error');
  const confirmPasswordError = document.getElementById('confirm-password-error');

  const passwordToggle = document.getElementById('password-toggle');
  const confirmPasswordToggle = document.getElementById('confirm-password-toggle');
  const submitBtn = document.getElementById('submit-btn');
  const successBanner = document.getElementById('success-banner');

  // SVG Icons
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

  const errorIconSvg = `
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="flex-shrink: 0;" aria-hidden="true">
      <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm-1-8a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0V7zm1-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" clip-rule="evenodd"/>
    </svg>
  `;

  // Helper: Setup Password Toggle
  const setupToggle = (button, input) => {
    button.innerHTML = eyeIconSvg;
    button.addEventListener('click', () => {
      const isPressed = button.getAttribute('aria-pressed') === 'true';
      if (isPressed) {
        input.setAttribute('type', 'password');
        button.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-label', 'Show password');
        button.innerHTML = eyeIconSvg;
      } else {
        input.setAttribute('type', 'text');
        button.setAttribute('aria-pressed', 'true');
        button.setAttribute('aria-label', 'Hide password');
        button.innerHTML = eyeOffIconSvg;
      }
    });
  };

  setupToggle(passwordToggle, passwordInput);
  setupToggle(confirmPasswordToggle, confirmPasswordInput);

  // Validation Helpers
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
    setTimeout(() => {
      if (!errorContainer.classList.contains('show')) {
        errorContainer.innerHTML = '';
      }
    }, 200);
  };

  const validateName = () => {
    const val = nameInput.value.trim();
    if (!val) {
      showError(nameInput, nameError, 'Full name is required.');
      return false;
    }
    if (val.length < 2) {
      showError(nameInput, nameError, 'Full name must be at least 2 characters.');
      return false;
    }
    clearError(nameInput, nameError);
    return true;
  };

  const validateEmail = () => {
    if (emailInput.validity.valueMissing || !emailInput.value.trim()) {
      showError(emailInput, emailError, 'Email address is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  };

  const validateTeamName = () => {
    const val = teamNameInput.value.trim();
    if (!val) {
      showError(teamNameInput, teamNameError, 'Team name is required.');
      return false;
    }
    clearError(teamNameInput, teamNameError);
    return true;
  };

  const validateTeamSize = () => {
    if (!teamSizeSelect.value) {
      showError(teamSizeSelect, teamSizeError, 'Please select your team size.');
      return false;
    }
    clearError(teamSizeSelect, teamSizeError);
    return true;
  };

  const validatePassword = () => {
    if (!passwordInput.value) {
      showError(passwordInput, passwordError, 'Password is required.');
      return false;
    }
    if (passwordInput.value.length < 8) {
      showError(passwordInput, passwordError, 'Password must be at least 8 characters.');
      return false;
    }
    clearError(passwordInput, passwordError);
    return true;
  };

  const validateConfirmPassword = () => {
    if (!confirmPasswordInput.value) {
      showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password.');
      return false;
    }
    if (confirmPasswordInput.value !== passwordInput.value) {
      showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
      return false;
    }
    clearError(confirmPasswordInput, confirmPasswordError);
    return true;
  };

  // Event Listeners: Validate on blur
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  teamNameInput.addEventListener('blur', validateTeamName);
  teamSizeSelect.addEventListener('blur', validateTeamSize);
  passwordInput.addEventListener('blur', validatePassword);
  confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

  // Clear errors dynamically on input
  nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('is-invalid') && nameInput.value.trim().length >= 2) {
      clearError(nameInput, nameError);
    }
  });

  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('is-invalid')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(emailInput.value.trim())) {
        clearError(emailInput, emailError);
      }
    }
  });

  teamNameInput.addEventListener('input', () => {
    if (teamNameInput.classList.contains('is-invalid') && teamNameInput.value.trim()) {
      clearError(teamNameInput, teamNameError);
    }
  });

  teamSizeSelect.addEventListener('change', () => {
    if (teamSizeSelect.value) {
      teamSizeSelect.classList.remove('placeholder-active');
      clearError(teamSizeSelect, teamSizeError);
    } else {
      teamSizeSelect.classList.add('placeholder-active');
    }
  });

  passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('is-invalid') && passwordInput.value.length >= 8) {
      clearError(passwordInput, passwordError);
    }
    // If confirm password already has an error, re-check match
    if (confirmPasswordInput.classList.contains('is-invalid') && confirmPasswordInput.value) {
      if (confirmPasswordInput.value === passwordInput.value) {
        clearError(confirmPasswordInput, confirmPasswordError);
      }
    }
  });

  confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.classList.contains('is-invalid')) {
      if (confirmPasswordInput.value === passwordInput.value) {
        clearError(confirmPasswordInput, confirmPasswordError);
      }
    }
  });

  // Form Submission
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isTeamNameValid = validateTeamName();
    const isTeamSizeValid = validateTeamSize();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (!isNameValid || !isEmailValid || !isTeamNameValid || !isTeamSizeValid || !isPasswordValid || !isConfirmValid) {
      // Focus first invalid input
      if (!isNameValid) nameInput.focus();
      else if (!isEmailValid) emailInput.focus();
      else if (!isTeamNameValid) teamNameInput.focus();
      else if (!isTeamSizeValid) teamSizeSelect.focus();
      else if (!isPasswordValid) passwordInput.focus();
      else confirmPasswordInput.focus();
      return;
    }

    // Valid submission - loading state
    setLoadingState(true);
    successBanner.style.display = 'none';

    // Simulate API registration request
    setTimeout(() => {
      setLoadingState(false);
      successBanner.style.display = 'flex';
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      signupForm.reset();
      teamSizeSelect.classList.add('placeholder-active');
      passwordToggle.innerHTML = eyeIconSvg;
      confirmPasswordToggle.innerHTML = eyeIconSvg;
      passwordInput.setAttribute('type', 'password');
      confirmPasswordInput.setAttribute('type', 'password');
      passwordToggle.setAttribute('aria-pressed', 'false');
      confirmPasswordToggle.setAttribute('aria-pressed', 'false');

      // Redirect to sign in page after 2.5 seconds
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2500);
    }, 1500);
  });

  const setLoadingState = (isLoading) => {
    if (isLoading) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      nameInput.disabled = true;
      emailInput.disabled = true;
      teamNameInput.disabled = true;
      teamSizeSelect.disabled = true;
      passwordInput.disabled = true;
      confirmPasswordInput.disabled = true;
      passwordToggle.disabled = true;
      confirmPasswordToggle.disabled = true;
    } else {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      nameInput.disabled = false;
      emailInput.disabled = false;
      teamNameInput.disabled = false;
      teamSizeSelect.disabled = false;
      passwordInput.disabled = false;
      confirmPasswordInput.disabled = false;
      passwordToggle.disabled = false;
      confirmPasswordToggle.disabled = false;
    }
  };
});
