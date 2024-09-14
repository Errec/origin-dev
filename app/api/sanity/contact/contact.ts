import { sanityClient } from '@/lib/sanity-client';
import { ContactPage } from '@/types/contact';

export async function getContactPageData(): Promise<ContactPage> {
  try {
    const query = `
      *[_type == "contact"][0] {
        title,
        subtitle,
        formFields[] {
          name,
          label,
          placeholder,
          type,
          options,
          required
        },
        submitButtonText
      }
    `;
    const result = await sanityClient.fetch(query);
    return result;
  } catch (error) {
    console.error('Error fetching contact page data:', error);
    throw error;
  }
}
