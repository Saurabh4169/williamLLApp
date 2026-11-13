export interface BusinessInfo {
  name: string;
  shortName: string;
  tagline: string;
  subline: string;
  positioning: string[];
  phone: string;
  phoneRaw: string;
  email: string;
  address: string;
  hours: string;
  emergencyContact: string;
  disclaimer: string;
  officialZoningMapUrl: string;
}

export const BUSINESS_INFO: BusinessInfo = {
  name: "Williams & Williams LLC – Zoning Solutions",
  shortName: "Williams & Williams LLC",
  tagline: "Navigating complex zoning with ease.",
  subline: "Tailored zoning solutions in Chicago.",
  positioning: ["Experienced", "Knowledgeable", "Dedicated"],
  phone: "630-635-7688",
  phoneRaw: "+16306357688",
  email: "dubbs.mgmt@gmail.com",
  address: "[OFFICE ADDRESS] – 10 S. Dearborn Street, Suite 1400, Chicago, IL 60603",
  hours: "[HOURS] – Monday to Friday: 8:00 AM – 5:30 PM CST",
  emergencyContact: "630-635-7688",
  disclaimer: "Information provided is general informational guidance and not legal advice.",
  officialZoningMapUrl: "https://gisapps.chicago.gov/ZoningMapWeb/",
};

