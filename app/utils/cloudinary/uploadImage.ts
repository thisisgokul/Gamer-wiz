import axios from "axios";
import { toast } from "sonner";

export const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "gamerwizupload");

  try {
    
    toast.info("Uploading image...",{position:"top-center"});

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    toast.success("Image uploaded successfully!",{position:"top-center"});

    return response.data.url;
  } catch (error) {
    console.error("Image upload failed:", error);
    toast.error("Image upload failed. Please try again.",{position:"top-center"});

    return null;
  }
};
