import translationEN from '@locales/en';

export default function ImageFormatThree() {
	return (
		<section className="tw_mx-auto tw_max-w-3xl tw_text-center">
			<h1 className="tw_text-3xl tw_font-bold">
				{translationEN.format3.title}
			</h1>
			<p className="tw_mt-2 tw_text-sm tw_text-gray-500">
				{translationEN.format3.devices}
			</p>
		</section>
	);
}
