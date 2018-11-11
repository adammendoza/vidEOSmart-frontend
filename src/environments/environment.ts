// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:9000',
  RECAPCHA: '6LezqiIUAAAAAEQVVIWPmIYMBFJEsN0OVaE2tU3b',
  MAX_FILE_ATTACHMENT_SIZE: 10485760, // 10 MB
  HASH_KEY: '2c3b743f-e467-4fba-a5ed-15a3b6d8144c'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
