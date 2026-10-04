//import { useState } from 'react'
//import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        PORTFOLIO_PROD Online
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
        Patrick's Production Portfolio
      </h1>
      <p className="text-zinc-400 max-w-md text-center text-sm">
        Vite 6 + React 19 + TypeScript + Tailwind CSS v4 setup is clean and ready for Bento Grid architecture.
      </p>
    </div>
  )
}
