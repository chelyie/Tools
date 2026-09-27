import AppRouter from './router/AppRouter';
import CursorGlow from '@components/effects/CursorGlow';

function App() {
  return (
    <div className="tw_min-h-screen tw_bg-pink-50 dark:tw_bg-pink-950 tw_text-ink dark:tw_text-ink-light">
      <CursorGlow />
      <div className="tw_relative tw_z-10">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;