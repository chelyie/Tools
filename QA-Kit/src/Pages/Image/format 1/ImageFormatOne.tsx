import translationEN from '@locales/en';

export default function ImageFormatOne() {
	return (
		<section className="tw_mx-auto tw_max-w-3xl tw_text-center">
			<h1 className="tw_text-3xl tw_font-bold">
				{translationEN.format1.title}
			</h1>
			<p className="tw_mt-2 tw_text-sm tw_text-gray-500">
				{translationEN.format1.devices}
			</p>
		</section>
	);
}
