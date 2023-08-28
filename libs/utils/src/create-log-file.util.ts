import * as fs from 'fs';
import * as moment from 'moment';
import { ICreateErrorLog } from '@app/interfaces';

/**
 * 🟥 Fail Error Log
 * File Name Format: dist\logs\{YYMM}\error\log-E-{YYYYMMDDHHmmss}.txt (Write)
 */
const createErrorLog = (logs: ICreateErrorLog) => {
  const filePath: string = getFilePath('error');
  const logTime: string = moment().format('YYYY-MM-DD HH:mm:ss').toString();

  // 📌 로그작성 (쓰기)
  fs.writeFileSync(filePath, `[Error]-[${logTime}]\n ${JSON.stringify(logs)}`);
};

/**
 * ✅ Return File Path
 */
const getFilePath = (type: 'success' | 'error'): string => {
  try {
    // 📌 Root & 하위 폴더 경로
    const rootPath: string = __dirname + `\\..\\..\\logs`;
    const monthPath: string = moment().format('YYMM').toString();
    const logPath: string = `${rootPath}\\${monthPath}`;
    const errorPath: string = `${logPath}\\error`;

    // 📌 Log 작성을 위한 폴더(success, error) 확인 및 생성
    if (!fs.existsSync(logPath)) {
      fs.mkdirSync(logPath, { recursive: true });
    }

    if (!fs.existsSync(errorPath)) {
      fs.mkdirSync(errorPath, { recursive: false });
    }

    let filePath: string = '';
    if (type === 'success') {
      filePath = `${logPath}\\log-${type}-${moment().format('YYMMDD').toString()}.txt`;
    } else if (type === 'error') {
      filePath = `${errorPath}\\log-${type}-${moment().format('YYYYMMDDHHmmss').toString()}.txt`;
    }

    return filePath;
  } catch (error) {
    throw error;
  }
};

export { createErrorLog };
