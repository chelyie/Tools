import Navbar from '@components/navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="tw_p-4">
        <h1 className="tw_text-2xl tw_font-bold tw_mb-4">
          Welcome to QA-Kit
        </h1>
        <p className="tw_text-gray-700">
          This is a sample application using Tailwind CSS and React.
        </p>
      </div>
    </>
  );
}

export default App
