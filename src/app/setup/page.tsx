import SetupAdmin from '../setup-admin';

export default function SetupPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Application Setup</h1>
      
      <div className="max-w-2xl mx-auto">
        <SetupAdmin />
      </div>
      
      <div className="text-center mt-8 text-sm text-gray-500">
        <p>Only use this page during initial setup.</p>
      </div>
    </div>
  );
} 