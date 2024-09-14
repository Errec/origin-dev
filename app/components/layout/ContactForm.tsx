'use client';

import { FormField } from '@/components/layout/FormField';
import CTAButton from '@/components/ui/CTAButton';
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
      <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-x-4 sm:gap-y-8">
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
        <CTAButton text={submitButtonText} type="submit" className="px-0 h-8" />
      </form>
    </FormProvider>
  );
};

export default ContactForm;
