export const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
export const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);

export const CONSTANTS = {
  vehicle:'vehicle',
  booking: 'my-booking',
}