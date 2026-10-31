import Button from '@components/button/Button';
import SelectField from '@components/form/SelectField';
import { DownloadIcon } from '@components/icon/icons';
import { IMAGE_FORMATS } from '@constant/evidence.constant';
import translationEN from '@locales/en';
import type { CollageToolbarProps } from '@type/BugVerification.type';

/** Play / pause controls when there are videos, otherwise the image format picker, plus download. */
export default function CollageToolbar({ hasVideo, format, busy, onFormatChange, onDownload, onPlayAll, onPauseAll }: CollageToolbarProps) {
    let downloadText = translationEN.download;
    if (busy) downloadText = translationEN.recording;
    else if (hasVideo) downloadText = translationEN.downloadVideo;

    return (
        <div className="row">
            {hasVideo
                ? (
                    <>
                        <Button variant="outline" onClick={onPlayAll}>{translationEN.playAll}</Button>
                        <Button variant="outline" onClick={onPauseAll}>{translationEN.pauseAll}</Button>
                    </>
                )
                : <SelectField label={translationEN.imageFormat} value={format} options={IMAGE_FORMATS} onChange={onFormatChange} />}
            <Button icon={<DownloadIcon size={16} />} onClick={onDownload} disabled={busy}>
                {downloadText}
            </Button>
        </div>
    );
}