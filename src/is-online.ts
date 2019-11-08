export const isOnline = async (): Promise<boolean> => {
  return new Promise((resolve: Function, reject: Function) => {
    require("dns").resolve("www.google.com", (err: any) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
