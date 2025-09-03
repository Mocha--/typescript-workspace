export interface Resume {
  name: string;
  summary: string;
  contact: Contact;
  skills: string[];
  experiences: Experience[];
  educations: Education[];
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  achievements: string[];
}

export interface Education {
  school: string;
  degree: string;
  subject: string;
  startDate: Date;
  endDate: Date | null;
  location: string;
}

export interface Contact {
  email: string;
  phone: string;
  address: string;
}
