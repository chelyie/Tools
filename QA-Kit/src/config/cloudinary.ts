const env = import.meta.env;

export const cloudinaryConfig = {
    cloudName: env.VITE_CLOUDINARY_CLOUD_NAME,
    uploadPreset: env.VITE_CLOUDINARY_UPLOAD_PRESET
};

/** False until both Cloudinary values are set, so the app still works without file saving. */
export const isCloudinaryConfigured = Boolean(cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset);