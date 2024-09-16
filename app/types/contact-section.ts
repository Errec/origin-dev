export interface ContactSection {
  smallTitle: string;
  bigTitle: string;
  ctaPhrase: string;
  businessEnquiries: {
    email: string;
    phone: string;
  };
  openPositions: {
    email: string;
  };
  locations: Array<{
    city: string;
    address: string;
    country: string;
  }>;
}
