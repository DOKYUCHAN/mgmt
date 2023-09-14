import { IDataResult } from '@app/interfaces';

const convertSaved = (saved: any) => {
  const result: IDataResult<any> = { count: 0, rows: [] };

  if (!saved) {
    return result;
  }

  if (!Array.isArray(saved)) {
    result.count = 1;
    result.rows = [saved];
  } else {
    result.count = saved.length;
    result.rows = saved;
  }

  return result;
};

export { convertSaved };
