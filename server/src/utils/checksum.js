import crypto from "crypto";

const generateChecksum = (buffer) => {
  return crypto
    .createHash("sha256")
    .update(buffer)
    .digest("hex");
};

export default generateChecksum;