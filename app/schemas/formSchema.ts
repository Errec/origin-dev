import { CustomFormField } from '@/types/contact';
import * as z from 'zod';

export const createFormSchema = (formFields: CustomFormField[]) => {
  return z.object(
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
};
