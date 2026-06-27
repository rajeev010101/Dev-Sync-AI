import pdf from "pdf-parse";
import mammoth from "mammoth";

class DocumentService {
  async extract(file) {
    if (
      file.mimetype ===
      "application/pdf"
    ) {
      const data =
        await pdf(file.data);

      return data.text;
    }

    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result =
        await mammoth.extractRawText({
          buffer: file.data
        });

      return result.value;
    }

    throw new Error(
      "Unsupported document"
    );
  }
}

export default new DocumentService();