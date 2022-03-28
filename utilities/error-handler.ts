import { EntityNotFoundError } from 'typeorm';

export const INTERNAL_SERVER_ERROR_MESSAGE =
  'Something went wrong, please try again later';

// https://dev.to/sobiodarlington/better-error-handling-with-async-await-2e5m
export const handleAsyncError = (promise) => {
  return promise
    .then((data) => [data, undefined])
    .catch((error) => Promise.resolve([undefined, error]));
};

export const isPostgresTypeOrmDuplicateKeyError = (error) => {
  return error?.code === '23505' ? true : false;
};
