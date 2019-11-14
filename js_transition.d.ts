declare const DEBUG:any;

declare interface DefaultObejct {
  [key:string]:any;
}

declare interface Window {
  browserHistory:import('history').History<any>;
  CODEMAOCONFIG:any;
}