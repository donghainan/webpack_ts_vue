/*
 * @Author: hainan.dong 
 * @Date: 2020-07-16 20:57:14 
 * @Last Modified by: hainan.dong
 * @Last Modified time: 2020-07-16 20:59:49
 */
let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export const nativeBrage = function (eventName: string, params: object) {
  if (isiOS) {
    window
      // @ts-ignore
      .webkit
      .messageHandlers
      .AppModel
      .postMessage({ body: eventName, params: params });
  } else if (isAndroid) {
    window
      // @ts-ignore
      .Android
      .callNative(JSON.stringify({ methodName: eventName, data: params }));
  }
}