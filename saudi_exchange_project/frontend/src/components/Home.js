import React from 'react';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">مؤشرات البورصة السعودية</h1>
      <iframe
        src="https://www.saudiexchange.sa/wps/portal/tadawul/home"
        title="Saudi Exchange Chart"
        className="w-full h-[600px] border rounded"
      ></iframe>
    </div>
  );
}

export default Home;
