// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const ApiKey = '17ad7cb14924fc83efb810edcd1705eb'
const ApiAccessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJzdWIiOiI2M2FjNzRmMzdlZjM4MTFmNThjOTQ4ZjYiLCJhdWQiOiIxN2FkN2NiMTQ5MjRmYzgzZWZiODEwZWRjZDE3MDVlYiIsImp0aSI6IjUzOTQ4MDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiLCJhcGlfd3JpdGUiXSwibmJmIjoxNjcyNzM3NDQzfQ.HtZmfuMDN6UxUvL-JHdO59S35NN21vFwbTKUiKMENZE"
const AccountId = '63ac74f37ef3811f58c948f6'
const ApiBase = 'https://api.themoviedb.org/3/'
const ApiImage500Base = 'https://image.tmdb.org/t/p/w500/'
const ApiImageOriginalBase = 'https://image.tmdb.org/t/p/original//'
export const environment = {
  production: false,
  ApiKey: ApiKey,
  ApiBase: ApiBase,
  ApiAccessToken: ApiAccessToken,
  ApiImage500Base: ApiImage500Base,
  ApiImageOriginalBase: ApiImageOriginalBase,
  AccountId: AccountId
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
