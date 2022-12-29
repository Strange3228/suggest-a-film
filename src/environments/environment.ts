// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const ApiKey = '17ad7cb14924fc83efb810edcd1705eb'
const ApiBase = 'https://api.themoviedb.org/3/'
const ApiImage500Base = 'https://image.tmdb.org/t/p/w500/'
const ApiImageOriginalBase = 'https://image.tmdb.org/t/p/original//'
export const environment = {
  production: false,
  ApiKey: ApiKey,
  ApiBase: ApiBase,
  ApiImage500Base: ApiImage500Base,
  ApiImageOriginalBase: ApiImageOriginalBase
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
