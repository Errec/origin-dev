import { CustomFormField } from '@/types/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

export const useContactForm = (formFields: CustomFormField[]) => {
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // Handle form submission here
  };

  return {
    form,
    onSubmit,
  };
};
