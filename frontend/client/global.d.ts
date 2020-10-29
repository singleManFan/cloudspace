declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
    [key: string]: any;
  }
}

interface UseModel<T> {
  (depsFn?: (model: T) => unknown[]): T;
  data?: T;
}

type ModelHook<T = any, P = any> = (hookArg: P) => T;

type Deps<T> = (model: T) => unknown[];
interface UseModel<T> {
  (depsFn?: Deps<T>): T;
  data?: T;
}

