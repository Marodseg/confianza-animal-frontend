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
  years: number;
  months: number;
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

export interface DogUpdateIn {
  id?: string;
  name?: string;
  years?: number;
  months?: number;
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
  user_message: string;
  organization_message?: string;
  organization_name: string;
  visible: boolean;
  info_updated: boolean;
  docu_updated: boolean;
  home_type: string;
  home_type_bool: boolean;
  free_time: string;
  free_time_bool: boolean;
  previous_experience: string;
  previous_experience_bool: boolean;
  frequency_travel: string;
  frequency_travel_bool: boolean;
  kids: string;
  kids_bool: boolean;
  other_animals: string;
  other_animals_bool: boolean;
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

// NGRX Interfaces
export interface DogsState {
  dogs: Dog[];
  loading: boolean;
}
export interface CatsState {
  cats: Cat[];
  loading: boolean;
}
export interface FiltersState {
  provinces: string[];
  dogRazes: string[];
  catRazes: string[];
}
export interface OrganizationState {
  organization?: Organization;
  loading: boolean;
  petitions: Petition[];
}
