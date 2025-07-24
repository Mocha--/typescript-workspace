declare global {
  const HOOK_SIGNATURE: string;

  declare module '*.txt' {
    const src: string;
    export default src;
  }
}

export {};