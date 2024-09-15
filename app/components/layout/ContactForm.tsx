'use client';

import { FormField } from '@/components/layout/FormField';
import SubmitButton from '@/components/ui/SubmitButton';
import { useContactForm } from '@/hooks/useContactForm';
import { CustomFormField } from '@/types/contact';
import React, { useState } from 'react';
import { FormProvider } from 'react-hook-form';

interface ContactFormProps {
  formFields: CustomFormField[];
  submitButtonText: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formFields,
  submitButtonText,
}) => {
  const [showGeneralError, setShowGeneralError] = useState(false);
  const { form, onSubmit } = useContactForm(formFields);

  const handleSubmit = form.handleSubmit(onSubmit, () =>
    setShowGeneralError(true)
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-x-6 sm:gap-y-10">
          {formFields.map((field) => (
            <FormField key={field.name} field={field} />
          ))}
        </div>
        <div className="h-2">
          {showGeneralError && (
            <p className="text-white uppercase text-sm font-semibold">
              Please try again.
              <br />
              Fix the errors in the form before submitting.
            </p>
          )}
        </div>
        <SubmitButton
          coverText="SEND US YOUR IDEA!"
          buttonText={submitButtonText}
        />
      </form>
    </FormProvider>
  );
};

export default ContactForm;
