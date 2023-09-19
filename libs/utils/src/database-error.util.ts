import { ERROR_CODE } from '@app/common/error';

export const getDBErrorCode = (err: any) => {
  switch (err.code) {
    case '23502':
      return ERROR_CODE.NOTNULL_ERROR;
    case '23503':
      return ERROR_CODE.FOREIGNKEY_ERROR;
    case '23505':
      return ERROR_CODE.DUPLICATED_ERROR;
    default:
      return ERROR_CODE.DB_ERROR;
  }
};
