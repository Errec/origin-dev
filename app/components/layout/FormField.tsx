'use client';
import AnimatedUnderline from '@/components/ui/AnimatedUnderline';
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
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  field: CustomFormField;
}

export const FormField: React.FC<FormFieldProps> = ({ field }) => {
  const form = useFormContext();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <UIFormField
      control={form.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem
          className={`relative pb-8 ${field.type === 'textarea' ? 'col-span-full' : ''}`}
        >
          <FormControl>
            <div className="relative">
              <label
                htmlFor={field.name}
                className={`absolute left-0 transition-all duration-300 ease-out pointer-events-none ${
                  isFocused || formField.value
                    ? '-top-6 text-xs text-muted-foreground/70'
                    : 'top-2 text-sm text-muted-foreground'
                }`}
              >
                {field.placeholder}
              </label>
              {renderField(field, formField, form, setIsFocused)}
            </div>
          </FormControl>
          <FormMessage className="text-xs sm:text-sm text-[#f44336] font-semibold absolute bottom-0 left-0" />
        </FormItem>
      )}
    />
  );
};

const renderField = (
  field: CustomFormField,
  formField: any,
  form: any,
  setIsFocused: (value: boolean) => void
) => {
  const hasError = !!form.formState.errors[field.name];

  const commonProps = {
    id: field.name,
    onFocus: () => setIsFocused(true),
    onBlur: () => {
      setIsFocused(false);
      form.trigger(field.name);
    },
    className: `border-t-0 border-x-0 rounded-none focus:ring-0 bg-transparent text-foreground text-sm sm:text-base pt-2 transition-all duration-300 ease-out ${
      hasError ? 'border-[#f44336] border-b-2' : 'border-input'
    }`,
  };

  const renderInput = (inputElement: React.ReactNode) => (
    <AnimatedUnderline className="w-full" disabled={hasError}>
      {inputElement}
    </AnimatedUnderline>
  );

  switch (field.type) {
    case 'select':
      return (
        <Select
          onValueChange={(value) => {
            formField.onChange(value);
            setIsFocused(false);
          }}
          defaultValue={formField.value}
          onOpenChange={(open) => {
            setIsFocused(open);
            if (!open) form.trigger(field.name);
          }}
        >
          <FormControl>
            <SelectTrigger {...commonProps} error={hasError}>
              <SelectValue />
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
      return renderInput(
        <Textarea
          {...formField}
          {...commonProps}
          className={`${commonProps.className} h-32 sm:h-40 w-full`}
        />
      );
    default:
      return renderInput(
        <Input type={field.type} {...formField} {...commonProps} />
      );
  }
};
