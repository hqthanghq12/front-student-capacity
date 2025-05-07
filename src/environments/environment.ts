// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// http://127.0.0.1:8000/api
// https://admin.svpoly.xyz/api
const baseApiUrl = "http://127.0.0.1:8000/api";
const authApi = `${baseApiUrl}/auth`;
export const jwtApiUrl = `${baseApiUrl}/v1`;
const publicApiUrl = `${baseApiUrl}/public`;
export const environment = {
  production: false,
  // GG_CLIENT_ID: "437095088104-c58gonumb2mu71c1d21ofn6ita2uvqr5.apps.googleusercontent.com",
  // GG_CLIENT_SECRET: "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",
  GG_CLIENT_ID: "459417311408-5msh1106q9mbpgbltuogfj6j9t730mta.apps.googleusercontent.com",
  GG_CLIENT_SECRET: "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",
  login: authApi + '/login',
  loginUrl: authApi + "/login-token",
  fakeLoginUrl: authApi + "/fake-login",
  publicApiUrl: `${baseApiUrl}/public`,
  sponsorListUrl: `${publicApiUrl}/sponsors`,
  contestListUrl: `${publicApiUrl}/contests`,
  majorListUrl: `${publicApiUrl}/majors`,
  roundListUrl: `${publicApiUrl}/rounds`,
  ExamListUrl: `${publicApiUrl}/semeter/exams`,
  ExamItemPoetry: `${publicApiUrl}/semeter/poetry/oneItem`,
  sliderListUrl: `${publicApiUrl}/sliders`,
  companyListUrl: `${publicApiUrl}/company`,
  recruitment: `${publicApiUrl}/recruitments`,
  capacityListUrl: `${publicApiUrl}/capacity`,
  semeterListUrl: `${publicApiUrl}/semeter`,
  poetryListUrl : `${publicApiUrl}/semeter/poetry`,
  playTopicUrl : `${publicApiUrl}/semeter/playtopic`,
  checkExam : `${publicApiUrl}/semeter/check/exams`,
  postListUrl: `${publicApiUrl}/posts`,
  campusListUrl: `${publicApiUrl}/campuses`,

  // Router API V1;
  userListUrl: `${jwtApiUrl}/users`,
  roundV1Url: `${jwtApiUrl}/round`,
  contestV1Url: `${jwtApiUrl}/contest`,
  teamListUrl: `${jwtApiUrl}/teams`,
  takeExamUrl: `${jwtApiUrl}/take-exam`,
  userV1Url: `${jwtApiUrl}/user`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
