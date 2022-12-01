// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// const PROTOCOL = 'https';
// const DOMAIN = 'confianza-animal-backend.onrender.com';
const PROTOCOL = 'http';
const DOMAIN = 'localhost:8000';

export const environment = {
  production: false,
  domain: DOMAIN,
  protocol: PROTOCOL,
  userLogin: `${PROTOCOL}://${DOMAIN}/organizations/login`,
  userRestorePassword: `${PROTOCOL}://${DOMAIN}/auth/reset-password`,
  userProfile: `${PROTOCOL}://${DOMAIN}/organizations/me`,
  userRegister: `${PROTOCOL}://${DOMAIN}/organizations/register`,
  userUploadPhoto: `${PROTOCOL}://${DOMAIN}/organizations/upload/photo`,
  userUpdate: `${PROTOCOL}://${DOMAIN}/organizations/update`,
  userDogs: `${PROTOCOL}://${DOMAIN}/organizations/dogs`,
  userCats: `${PROTOCOL}://${DOMAIN}/organizations/cats`,
  appUser: `${PROTOCOL}://${DOMAIN}/users`,
  provinces: `${PROTOCOL}://${DOMAIN}/filters/provinces`,
  dogRazes: `${PROTOCOL}://${DOMAIN}/filters/dog-raze`,
  catRazes: `${PROTOCOL}://${DOMAIN}/filters/cat-raze`,
  editDog: `${PROTOCOL}://${DOMAIN}/organizations/dog`,
  editCat: `${PROTOCOL}://${DOMAIN}/organizations/cat`,
  getDog: `${PROTOCOL}://${DOMAIN}/animals/dog`,
  getCat: `${PROTOCOL}://${DOMAIN}/animals/cat`,
  createDog: `${PROTOCOL}://${DOMAIN}/organizations/dog`,
  createCat: `${PROTOCOL}://${DOMAIN}/organizations/cat`,
  deleteDog: `${PROTOCOL}://${DOMAIN}/animals/dog`,
  deleteCat: `${PROTOCOL}://${DOMAIN}/animals/cat`,
  dogUploadPhotos: `${PROTOCOL}://${DOMAIN}/animals/dog`,
  catUploadPhotos: `${PROTOCOL}://${DOMAIN}/animals/cat`,
  deleteDogPhoto: `${PROTOCOL}://${DOMAIN}/animals/dog`,
  deleteCatPhoto: `${PROTOCOL}://${DOMAIN}/animals/cat`,
  petitions: `${PROTOCOL}://${DOMAIN}/petitions/organization`,
  statusPetition: `${PROTOCOL}://${DOMAIN}/petitions`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
