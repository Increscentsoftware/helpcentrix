export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-slate-900">
      <h1 className="text-2xl font-bold text-blue-400">HelpCentrix</h1>
      <div className="space-x-6">
        <button>Home</button>
        <button>Categories</button>
        <button>Pricing</button>
        <button className="bg-blue-500 px-4 py-2 rounded-lg">Login</button>
      </div>
    </div>
  );
}
