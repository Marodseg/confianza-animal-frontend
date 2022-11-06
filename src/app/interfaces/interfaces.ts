export interface Register {
  name: string;
  email: string;
  password: string;
  phone: string;
  zone: string;
}

export interface RegisterResponse {
  name: string;
  email: string;
  phone: string;
  zone: string;
}

export interface LoginResponse {
  token: string;
}

export interface RestorePasswordResponse {
  message: string;
}

export interface Animal {
  id: string;
  name: string;
  age: number;
  gender: string;
  photos: string[];
  weight: number;
  size: string;
  neutered: boolean;
  description: string;
  healthy: boolean;
  wormed: boolean;
  vaccinated: boolean;
  birth_date: Date;
  activity_level: string;
  microchip: boolean;
  is_urgent: boolean;
  organization_name: string;
  organization_phone: string;
  organization_photo: string;
}

export interface Dog extends Animal {
  raze: string;
}

export interface Cat extends Animal {
  raze: string;
}

export interface Organization {
  name: string;
  email: string;
  phone: string;
  photo?: string;
  zone: string;
  dogs?: [Dog];
  cats?: [Cat];
}
