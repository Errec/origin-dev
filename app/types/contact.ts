export interface FormField {
  name: string;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  options?: string[];
  required: boolean;
}

export interface ContactPage {
  title: string;
  subtitle: string;
  formFields: FormField[];
  submitButtonText: string;
}
