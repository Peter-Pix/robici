'use client';

export default function NewsletterSignup() {
  return (
    <section className="py-16 px-4 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Páteční porada
        </h2>
        <p className="text-gray-500">
          Každej pátek ti Robíci pošlou, co se tenhle týden stalo. Kdo co provedl, kdo co opravil a kdo zase slíbil nemožný.
        </p>
      </div>

      <form
        className="flex gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="tvuj@email.cz"
          className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          required
        />
        <button
          type="submit"
          className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
        >
          Odebírat
        </button>
      </form>
      <p className="text-xs text-gray-400 text-center mt-3">
        Žádný spam. Jen páteční porada. Max 1× týdně.
      </p>
    </section>
  );
}
