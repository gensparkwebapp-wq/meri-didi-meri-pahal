
/**
 * Converts a File object to a Base64 string.
 * This is necessary for persisting images in localStorage for the demo.
 * In a real production app, you would upload to a cloud storage (S3/Cloudinary) and store the URL.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
