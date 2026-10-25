export interface WorkerTask {
  name: string;
  intervalMs: number;
  run: () => Promise<void>;
}
