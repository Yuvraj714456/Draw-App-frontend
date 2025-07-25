import React from 'react';

const RoomCardShimmer = () => (
  <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="rounded-full bg-gray-300 h-6 w-6"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>      
      <div className="h-4 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
);


const DashboardShimmer = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full mx-auto flex">

        <aside className="w-[280px] bg-white border-r border-gray-200 p-6 flex-col h-screen hidden lg:flex left-0">
          <div className="flex-grow">

            <div className="flex items-center space-x-4 mb-8">
              <div className="animate-pulse rounded-full bg-gray-300 h-12 w-12"></div>
              <div className="space-y-2">
                <div className="animate-pulse h-4 bg-gray-300 rounded w-24"></div>
                <div className="animate-pulse h-4 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
            <div className="animate-pulse h-4 bg-gray-300 rounded w-36 mb-6"></div>
            <div className="animate-pulse h-4 bg-gray-300 rounded w-28 mb-10"></div>
            
            <div className="border-t border-gray-200 pt-8">
                <div className="animate-pulse h-4 bg-gray-300 rounded w-20 mb-6"></div>
                 <div className="flex justify-between items-center mb-4">
                    <div className="animate-pulse h-4 bg-gray-300 rounded w-24"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded w-8"></div>
                </div>
                 <div className="flex justify-between items-center">
                    <div className="animate-pulse h-4 bg-gray-300 rounded w-20"></div>
                    <div className="animate-pulse h-4 bg-gray-300 rounded w-8"></div>
                </div>
            </div>
          </div>

          <div className="animate-pulse h-12 bg-gray-300 rounded-lg w-full"></div>
        </aside>

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-4">
            <div className="animate-pulse h-9 bg-gray-300 rounded w-48"></div>
            <div className="animate-pulse h-10 bg-gray-300 rounded-lg w-36"></div>
          </div>
          <div className="animate-pulse h-4 bg-gray-300 rounded w-24 mb-8"></div>

          <div className="animate-pulse h-11 bg-gray-300 rounded-lg w-72 mb-8"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, index) => (
              <RoomCardShimmer key={index} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};



const HomePageShimmer = () => {
  return (
    <div className="min-h-screen w-full bg-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-screen-xl animate-pulse">
        
        {/* Header */}
        <header className="flex h-16 right-0 justify-between py-4 ">
          <div className="h-8 w-20 rounded-md bg-gray-300"></div>
          <div className="hidden items-center space-x-8 md:flex">
            <div className="h-4 w-24 rounded-md bg-gray-300"></div>
            <div className="h-4 w-24 rounded-md bg-gray-300"></div>
            <div className="h-4 w-24 rounded-md bg-gray-300"></div>
          </div>
          <div className="h-10 w-28 rounded-md bg-gray-300"></div>
        </header>

        {/* --- Hero Section --- */}
        <main className="mt-16 grid grid-cols-1 gap-12 md:mt-24 lg:grid-cols-2 lg:gap-16">
          
          {/* Left Column */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Heading */}
            <div className="space-y-4">
              <div className="h-12 w-3/4 rounded-md bg-gray-300"></div>
              <div className="h-12 w-1/2 rounded-md bg-gray-300"></div>
              <div className="h-12 w-5/6 rounded-md bg-gray-300"></div>
            </div>
            
            {/* Paragraph */}
            <div className="space-y-3 pt-2">
              <div className="h-4 w-full rounded-md bg-gray-300"></div>
              <div className="h-4 w-full rounded-md bg-gray-300"></div>
              <div className="h-4 w-3/4 rounded-md bg-gray-300"></div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 pt-4">
              <div className="h-12 w-48 rounded-md bg-gray-300"></div>
              <div className="h-12 w-40 rounded-md bg-gray-200"></div>
            </div>

            {/* Checkmarks */}
            <div className="flex space-x-6 pt-2">
              <div className="h-4 w-28 rounded-md bg-gray-300"></div>
              <div className="h-4 w-28 rounded-md bg-gray-300"></div>
            </div>
          </div>

          {/* Right Column (Image Placeholder) */}
          <div className="relative h-[450px] w-full rounded-xl bg-gray-200 p-4 shadow-lg">
            {/* Window Bar */}
            <div className="mb-4 flex items-center space-x-2 border-b border-gray-300 pb-3">
              <div className="h-3 w-3 rounded-full bg-gray-300"></div>
              <div className="h-3 w-3 rounded-full bg-gray-300"></div>
              <div className="h-3 w-3 rounded-full bg-gray-300"></div>
              <div className="ml-auto h-6 w-20 rounded-md bg-gray-300"></div>
            </div>
            
            {/* App UI Placeholders */}
            <div className="flex space-x-2">
              <div className="h-8 w-24 rounded-md bg-gray-300"></div>
              <div className="h-8 w-24 rounded-md bg-gray-300"></div>
              <div className="h-8 w-24 rounded-md bg-gray-300"></div>
            </div>

            {/* Main content placeholder */}
            <div className="mt-6 h-64 w-full rounded-lg border border-gray-300 bg-gray-100"></div>
          </div>

        </main>

        {/* --- Lower Section --- */}
        <section className="mt-24 flex justify-center pb-12 md:mt-32">
          <div className="h-10 w-1/2 rounded-md bg-gray-300 lg:w-1/3"></div>
        </section>

      </div>
    </div>
  );
};

export  {DashboardShimmer,HomePageShimmer};