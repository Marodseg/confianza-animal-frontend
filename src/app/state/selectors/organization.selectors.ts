import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectLoadingOrganization = (state: AppState) =>
  state.organization.loading;
export const selectLoadingOrganizationItem = createSelector(
  selectLoadingOrganization,
  loading => loading
);

export const selectOrganization = (state: AppState) =>
  state.organization.organization;
export const selectOrganizationItems = createSelector(
  selectOrganization,
  organization => organization
);

export const selectPetitions = (state: AppState) =>
  state.organization.petitions;
export const selectPetitionsItems = createSelector(
  selectPetitions,
  petitions => petitions
);
