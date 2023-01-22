import { OrganizationState } from '../../interfaces/interfaces';
import { createReducer, on } from '@ngrx/store';
import {
  LOAD_ORGANIZATION,
  LOAD_PETITIONS,
  LOADED_ORGANIZATION,
  LOADED_PETITIONS,
} from '../actions/organization.actions';

export const initialOrganizationState: OrganizationState = {
  organization: undefined,
  loading: false,
  petitions: [],
};

export const organizationReducer = createReducer(
  initialOrganizationState,
  on(LOAD_ORGANIZATION, state => {
    return { ...state, loading: true };
  }),
  on(LOADED_ORGANIZATION, (state, { organization }) => {
    return { ...state, organization, loading: false };
  }),
  on(LOAD_PETITIONS, state => {
    return { ...state, loading: true };
  }),
  on(LOADED_PETITIONS, (state, { petitions }) => {
    return { ...state, petitions, loading: false };
  })
);
