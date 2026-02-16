import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center p-4">
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold tracking-tighter">ALEX CHEN</h1>
        <div className="space-x-6 text-sm text-gray-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl -z-10"></div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Hello, I'm <br /> Alex Chen.
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Full-Stack Developer crafting clean, performant, and user-centric digital experiences.
        </p>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
          View Projects
        </button>
      </main>
    </div>
  );
}

export default App;
