import multer from "multer";

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,

        message: "Resume file cannot exceed 5MB",
      });
    }
  }

  if (err.message === "Only PDF files are allowed") {
    return res.status(400).json({
      success: false,

      message: "Only PDF files are allowed",
    });
  }

  return res.status(500).json({
    success: false,

    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
