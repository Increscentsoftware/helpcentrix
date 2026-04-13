export default function Pricing() {
  return (
    <section className="text-center py-16">
      <h2 className="text-3xl mb-10">Pricing</h2>
      <div className="flex justify-center gap-8">
        <div className="bg-slate-800 p-6 rounded-xl">
          <p>$5 - Single Question</p>
        </div>
        <div className="bg-blue-500 p-6 rounded-xl">
          <p>$20 - Unlimited</p>
        </div>
      </div>
    </section>
  );
}
