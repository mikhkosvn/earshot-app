export type WorkerTask = {
  name: string;
  intervalMs: number;
  run: () => Promise<void>;
};
