// home/@contact/page.tsx
import { getContactSectionData } from '@/api/sanity/landingPage/contact-section';
import Contact from '../sections/Contact';

export default async function ContactPage() {
  const contactData = await getContactSectionData();
  return <Contact contactSection={contactData} />;
}
