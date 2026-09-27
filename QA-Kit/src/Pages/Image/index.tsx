import {useNavigate} from 'react-router-dom';
import translationEN from '@locales/en';
import ImageCard from './ImageCard';

export default function Image() {
    const navigate = useNavigate();
    const picture_subtext = translationEN.picture_subtext;
    const description = translationEN.image_description;

    const handleSelectFormat = (format: 'format1' | 'format2' | 'format3') => {
        navigate(`/picture/${format}`);
    };

    return (
        <div className="tw_w-full tw_space-y-6 tw_text-center tw_mx-auto tw_max-w-7xl tw_px-2 sm:tw_px-4">
            <div className="tw_text-[39px] tw_font-bold">
                {picture_subtext}
            </div>
            <div className="tw_text-xs tw_text-gray-500">
                {description}
            </div>
            <div className="tw_mt-[30px]">
                <ImageCard onSelectFormat={handleSelectFormat} />
            </div>
        </div>
    );
}