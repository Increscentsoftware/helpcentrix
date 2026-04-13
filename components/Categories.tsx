import { Monitor, Car } from "lucide-react";

export default function Categories() {
  return (
    <section className="grid md:grid-cols-2 gap-8 px-10 py-16">
      <div className="bg-slate-800 p-8 rounded-xl">
        <Monitor size={40} />
        <h2 className="text-2xl mt-4">Computer Support</h2>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl">
        <Car size={40} />
        <h2 className="text-2xl mt-4">Automobile Support</h2>
      </div>
    </section>
  );
}
