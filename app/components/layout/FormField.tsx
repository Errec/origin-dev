'use client';

import {
  FormControl,
  FormItem,
  FormMessage,
  FormField as UIFormField,
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
import { CustomFormField } from '@/types/contact';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  field: CustomFormField;
}

export const FormField: React.FC<FormFieldProps> = ({ field }) => {
  const form = useFormContext();

  return (
    <UIFormField
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem
          className={`relative pb-6 ${field.type === 'textarea' ? 'col-span-full' : ''}`}
        >
          <FormControl>{renderField(field, formField, form)}</FormControl>
          <FormMessage className="text-xs sm:text-sm text-red-500 absolute bottom-0 left-0" />
        </FormItem>
      )}
    />
  );
};

const renderField = (field: CustomFormField, formField: any, form: any) => {
  switch (field.type) {
    case 'select':
      return (
        <Select
          onValueChange={formField.onChange}
          defaultValue={formField.value}
          onOpenChange={() => form.trigger(field.name)}
        >
          <FormControl>
            <SelectTrigger
              className={`border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent text-white text-sm sm:text-base ${
                form.formState.errors[field.name] ? 'border-red-500' : ''
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
      );
    case 'textarea':
      return (
        <Textarea
          placeholder={field.placeholder}
          className={`h-32 sm:h-40 border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent text-white text-sm sm:text-base w-full ${
            form.formState.errors[field.name] ? 'border-red-500' : ''
          }`}
          {...formField}
          onBlur={() => form.trigger(field.name)}
        />
      );
    default:
      return (
        <Input
          type={field.type}
          placeholder={field.placeholder}
          className={`border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent text-white text-sm sm:text-base ${
            form.formState.errors[field.name] ? 'border-red-500' : ''
          }`}
          {...formField}
          onBlur={() => form.trigger(field.name)}
        />
      );
  }
};
