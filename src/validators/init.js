
import { extend, setInteractionMode } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

setInteractionMode('lazy');

extend('email', {
  ...email,
  message: 'please enter a valid email address in the format: name@domain.com'
});

extend('required', {
  ...required,
  message: 'Please enter your {_field_}'
});