export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: string;
      POSTGRES_HOST: 'postgres';
      POSTGRES_PORT: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DATABASE: string;
      JWT_SECRET: string;
    }
  }
}