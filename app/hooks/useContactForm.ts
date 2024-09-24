import { CustomFormField } from '@/types/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

export const useContactForm = (formFields: CustomFormField[]) => {
  const formSchema = z.object(
    formFields.reduce<Record<string, z.ZodString | z.ZodOptional<z.ZodString>>>(
      (acc, field) => {
        let validator: z.ZodString | z.ZodOptional<z.ZodString>;

        if (field.type === 'select') {
          validator = z
            .string()
            .min(1, { message: `${field.name} is required.` });
        } else if (field.type === 'tel') {
          validator = z.string().optional();
        } else {
          validator = z.string();
          if (field.required) {
            validator = validator.min(1, {
              message: `${field.name} is required.`,
            });
          }
          if (field.type === 'email') {
            validator = z.string().email({ message: 'Invalid email address.' });
          }
          if (field.type === 'textarea') {
            validator = z.string().min(10, {
              message: `${field.name} must be at least 10 characters.`,
            });
          }
        }
        return { ...acc, [field.name]: validator };
      },
      {}
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // Handle form submission here
  };

  return {
    form,
    onSubmit,
  };
};
