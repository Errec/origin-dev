'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { FormField as CustomFormField } from '@/types/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import CTAButton from '../ui/CTAButton';

interface ContactFormProps {
  formFields: CustomFormField[];
  submitButtonText: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formFields,
  submitButtonText,
}) => {
  const [showGeneralError, setShowGeneralError] = useState(false);

  const formSchema = z.object(
    formFields.reduce(
      (acc, field) => {
        let validator: z.ZodString | z.ZodOptional<z.ZodString> = z.string();
        if (field.type === 'tel') {
          validator = z.string().optional();
        } else {
          if (field.required) {
            validator = validator.min(1, {
              message: `${field.name} is required.`,
            });
          }
          if (field.type === 'email') {
            validator = (validator as z.ZodString).email({
              message: 'Invalid email address.',
            });
          }
          if (field.type === 'textarea') {
            validator = (validator as z.ZodString).min(10, {
              message: `${field.name} must be at least 10 characters.`,
            });
          }
        }
        return { ...acc, [field.name]: validator };
      },
      {} as Record<string, z.ZodString | z.ZodOptional<z.ZodString>>
    )
  );

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formFields.reduce(
      (acc, field) => ({ ...acc, [field.name]: '' }),
      {} as Record<string, string>
    ),
    mode: 'onBlur',
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission here
  };

  const orderedFieldNames = ['name', 'email', 'products', 'phoneNumber'];
  const orderedFields = orderedFieldNames
    .map((name) => formFields.find((field) => field.name === name))
    .filter((field): field is CustomFormField => field !== undefined);

  const textareaField = formFields.find((field) => field.type === 'textarea');
  const remainingFields = formFields.filter(
    (field) =>
      !orderedFieldNames.includes(field.name) && field.type !== 'textarea'
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, () => setShowGeneralError(true))}
        className="space-y-8 sm:space-y-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-x-4 sm:gap-y-8">
          {orderedFields.concat(remainingFields).map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as keyof FormValues}
              render={({ field: formField }) => (
                <FormItem className="relative pb-6">
                  <FormControl>
                    {field.type === 'select' ? (
                      <Select
                        onValueChange={formField.onChange}
                        defaultValue={formField.value}
                        onOpenChange={() =>
                          form.trigger(field.name as keyof FormValues)
                        }
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent text-white text-sm sm:text-base ${
                              form.formState.errors[
                                field.name as keyof FormValues
                              ]
                                ? 'border-red-500'
                                : ''
                            }`}
                          >
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        className={`border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent text-white text-sm sm:text-base ${
                          form.formState.errors[
                            field.name as keyof FormValues
                          ] && field.type !== 'tel'
                            ? 'border-red-500'
                            : ''
                        }`}
                        {...formField}
                        onBlur={() =>
                          field.type !== 'tel' &&
                          form.trigger(field.name as keyof FormValues)
                        }
                      />
                    )}
                  </FormControl>
                  {field.type !== 'tel' && (
                    <FormMessage className="text-xs sm:text-sm text-red-500 absolute bottom-0 left-0" />
                  )}
                </FormItem>
              )}
            />
          ))}
        </div>
        {textareaField && (
          <FormField
            key={textareaField.name}
            control={form.control}
            name={textareaField.name as keyof FormValues}
            render={({ field: formField }) => (
              <FormItem className="col-span-full relative pb-6">
                <FormControl>
                  <Textarea
                    placeholder={textareaField.placeholder}
                    className={`h-32 sm:h-40 border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent text-white text-sm sm:text-base w-full ${
                      form.formState.errors[
                        textareaField.name as keyof FormValues
                      ]
                        ? 'border-red-500'
                        : ''
                    }`}
                    {...formField}
                    onBlur={() =>
                      form.trigger(textareaField.name as keyof FormValues)
                    }
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm text-red-500 absolute bottom-0 left-0" />
              </FormItem>
            )}
          />
        )}
        <div className="h-6">
          {showGeneralError && (
            <p className="text-white uppercase text-sm font-semibold">
              Please fix the errors in the form before submitting.
            </p>
          )}
        </div>
        <CTAButton text={submitButtonText} type="submit" className="px-0 h-8" />
      </form>
    </Form>
  );
};

export default ContactForm;
