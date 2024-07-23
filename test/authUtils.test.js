const { validateEmail } = require('../src/utils/auth');

describe('Email Validation', () => {
  it('should return true for a valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('should return false for an invalid email', () => {
    expect(validateEmail('test')).toBe(false);
  });
});
