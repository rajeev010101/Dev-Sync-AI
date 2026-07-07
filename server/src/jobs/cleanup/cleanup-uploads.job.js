import UploadService from "../../modules/uploads/upload.service.js";

export default async function cleanupUploadsJob(job) {
  const { olderThanDays = 30 } = job.data || {};

  return UploadService.cleanupOldUploads({
    olderThanDays,
  });
}