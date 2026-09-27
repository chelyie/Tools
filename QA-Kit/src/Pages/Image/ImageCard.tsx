import Card from '@components/card/Card';
import translationEN from '@locales/en';

interface ImageCardProps {
    onSelectFormat?: (format: 'format1' | 'format2' | 'format3') => void;
}

export default function ImageCard({onSelectFormat}: ImageCardProps) {
    return (
        <div className="tw_grid tw_w-full tw_grid-cols-1 sm:tw_grid-cols-2 lg:tw_grid-cols-3 tw_gap-6 tw_items-stretch">
            <Card
                interactive
                title={translationEN.format1.title}
                subtitle={translationEN.format1.devices}
                className="tw_w-full tw_min-h-56 tw_h-full tw_text-center tw_items-center tw_justify-center"
                onClick={() => onSelectFormat?.('format1')}
            />
            <Card
                interactive
                title={translationEN.format2.title}
                subtitle={translationEN.format2.devices}
                className="tw_w-full tw_min-h-56 tw_h-full tw_text-center tw_items-center tw_justify-center"
                onClick={() => onSelectFormat?.('format2')}
            />
            <Card
                interactive
                title={translationEN.format3.title}
                subtitle={translationEN.format3.devices}
                className="tw_w-full tw_min-h-56 tw_h-full tw_text-center tw_items-center tw_justify-center"
                onClick={() => onSelectFormat?.('format3')}
            />
        </div>
    );
}