import fs from "fs/promises";
import path from "path";

export default async function cleanupLogsJob(job) {
  const {
    logDirectory = "logs",
    olderThanDays = 30,
  } = job.data || {};

  const directory = path.resolve(logDirectory);

  const files = await fs.readdir(directory);

  const cutoff = Date.now() - olderThanDays * 24 * 60 * 60 * 1000;

  let deleted = 0;

  for (const file of files) {
    const filePath = path.join(directory, file);

    const stats = await fs.stat(filePath);

    if (stats.mtimeMs < cutoff) {
      await fs.unlink(filePath);
      deleted++;
    }
  }

  return {
    deleted,
  };
}