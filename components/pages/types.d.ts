declare module '@smooth-ui/core-sc';
declare type PromiseResult<T> = T extends Promise<infer U> ? U : T;
