import Navbar from '@components/navbar/Navbar';
import Toggle from '@components/Toggle/Toggle';
import { TEXT_STYLE } from '@constant/textstyle.constant';
import translationEN from '@locales/en';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const labels = {
    brandname: translationEN.brandname,
    picture: translationEN.picture ?? 'Picture',
    video: translationEN.video ?? 'Video',
};

function Main() {
    const location = useLocation();
    const navigate = useNavigate();
    const kind = location.pathname === '/video' ? 'video' : 'picture';

    return (
        <div className="tw_min-h-screen tw_bg-transparent tw_text-ink dark:tw_text-ink-light">
            <Navbar
                leftContent={
                    <span style={TEXT_STYLE.ACCENT}>
                        {labels.brandname}
                    </span>
                }
                centerContent={
                    <Toggle
                        options={[
                            { label: labels.picture, value: 'picture' },
                            { label: labels.video, value: 'video' },
                        ]}
                        value={kind}
                        onChange={(value) => navigate(value === 'video' ? '/video' : '/')}
                    />
                }
            />
            <main className="tw_p-4">
                <Outlet />
            </main>
        </div>
    );
}

export default Main;