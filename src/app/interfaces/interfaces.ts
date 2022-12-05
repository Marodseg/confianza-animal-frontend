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
  zone: string;
  neutered: boolean | string;
  description: string;
  healthy: boolean | string;
  wormed: boolean | string;
  vaccinated: boolean | string;
  birth_date: Date;
  activity_level: string;
  microchip: boolean | string;
  is_urgent: boolean | string;
  organization_name: string;
  organization_phone: string;
  organization_photo?: string;
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

export interface OrganizationUpdate {
  phone?: string;
  zone?: string;
}

export interface DogCreate {
  name: string;
  age: number;
  gender: string;
  weight: number;
  size: string;
  zone: string;
  neutered: boolean | string;
  description: string;
  healthy: boolean | string;
  wormed: boolean | string;
  vaccinated: boolean | string;
  birth_date?: Date;
  activity_level: string;
  microchip: boolean | string;
  is_urgent: boolean | string;
  raze: string;
}

export interface DogUpdateIn {
  name?: string;
  age?: number;
  gender?: string;
  photos?: string[];
  weight?: number;
  size?: string;
  zone?: string;
  neutered?: boolean;
  description?: string;
  healthy?: boolean;
  wormed?: boolean;
  vaccinated?: boolean;
  birth_date?: Date;
  activity_level?: string;
  microchip?: boolean;
  is_urgent?: boolean;
  raze?: string;
}

export interface CatUpdateIn extends DogUpdateIn {}

export interface Petition {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  date: Date;
  dog: Dog;
  cat: Cat;
  status: string;
  message: string;
  organization_name: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
  dogs: [Dog];
  cats: [Cat];
  active: boolean;
}
