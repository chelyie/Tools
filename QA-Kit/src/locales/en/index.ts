import common from '@locales/en/common.json';
import image from '@locales/en/image.json';
import video from '@locales/en/video.json';

// common: text shared by images and videos; image / video: text only for that file type.
export default {
    ...common,
    ...image,
    ...video
};