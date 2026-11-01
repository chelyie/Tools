import { cloudinaryConfig, isCloudinaryConfigured } from '@config/cloudinary';
import translationEN from '@locales/en';
import type { MediaKind } from '@type/Evidence.type';
import { fillTemplate } from '@utils/text';

/** Uploads a picture or video to Cloudinary (unsigned preset) and returns its https URL. */
export async function uploadMedia(file: File, kind: MediaKind): Promise<string> {
    if (!isCloudinaryConfigured) throw new Error(translationEN.cloudinaryMissing);

    const body = new FormData();
    body.append('file', file);
    body.append('upload_preset', cloudinaryConfig.uploadPreset ?? '');

    const failed = fillTemplate(translationEN.uploadFailed, { name: file.name });
    let response: Response;
    try {
        response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/${kind}/upload`, { method: 'POST', body });
    }
    catch {
        throw new Error(failed);
    }

    const data = await response.json()
        .catch(() => null) as { secure_url?: string; error?: { message?: string } } | null;
    if (!response.ok || !data?.secure_url) {
        throw new Error(data?.error?.message
            ? `${failed} (${data.error.message})`
            : failed);
    }
    return data.secure_url;
}