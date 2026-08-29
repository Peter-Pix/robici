import Link from 'next/link';

import { pageMeta } from '@/lib/seo';
import { lessons } from '@/data/content/roboctina';

export const metadata = pageMeta.roboctina;


export default function RoboctinaPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-16 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-robik-dark mb-3">
            🎓 Robočtina
          </h1>
          <p className="text-lg text-robik-text/60 mb-4">
            Nauč se mluvit s AI jako s <span className="text-robik-accent font-semibold">kamarádem</span>.
          </p>
          <p className="text-sm text-robik-text/50 max-w-xl mx-auto">
            Robočtina není programovací jazyk. Je to jazyk, který mluví Robíci. A my tě ho naučíme. Neboj se, je to jednoduchý. Stačí se usmát a zeptat se.
          </p>
        </section>

        {/* Proč se učit */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-robik-dark text-center mb-8">
            Proč se učit <span className="text-robik-accent">Robočtinu</span>?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '😊', title: 'Přestaneš se bát AI', text: 'Když pochopíš, jak s ní mluvit, přestane tě děsit. Stane se z ní kamarád, ne nepřítel.' },
              { icon: '💬', title: 'Budeš umět lépe komunikovat', text: 'Robočtina není jen o AI. Je o tom, jak jasně a přátelsky říkat, co chceš.' },
              { icon: '🎨', title: 'Otevřeš si nové možnosti', text: 'S Robočtinou můžeš tvořit, učit se, bavit se. AI se stane tvým nástrojem, ne tvým pánem.' },
              { icon: '🏆', title: 'Získáš diplom', text: 'Každá lekce ti přinese diplom. Až projdeš prvními pěti, staneš se Mistrem Robočtiny. A bonusová šestá tě udělá Robím kamarádem.' },
            ].map((item) => (
              <div key={item.title} className="bg-robik-card rounded-2xl p-5 border border-pastel-blue/20">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="text-sm font-semibold text-robik-dark mb-1">{item.title}</h3>
                <p className="text-xs text-robik-text/60">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lekce */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-robik-dark text-center mb-8">
            Lekce <span className="text-robik-accent">Robočtiny</span>
          </h2>
          <div className="space-y-6">
            {lessons.map((lesson) => (
              <div
                key={lesson.num}
                className={`rounded-2xl p-6 border shadow-sm transition-all ${
                  lesson.locked
                    ? 'bg-robik-bg/50 border-gray-200 opacity-60'
                    : 'bg-robik-card border-pastel-blue/20 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                    lesson.locked ? 'bg-gray-200 text-gray-400' : 'bg-pastel-yellow/50 text-robik-dark'
                  }`}>
                    {lesson.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold mb-1 ${
                      lesson.locked ? 'text-gray-400' : 'text-green-600'
                    }`}>
                      {lesson.badge}
                    </div>
                    <h3 className="text-lg font-semibold text-robik-dark mb-1">{lesson.title}</h3>
                    <p className="text-sm text-robik-text/60 mb-3">{lesson.desc}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-robik-text/50 mb-3">
                      <span>⏱️ {lesson.duration}</span>
                      <span>{lesson.level}</span>
                    </div>
                    {lesson.locked ? (
                      <button disabled className="bg-gray-200 text-gray-400 px-4 py-2 rounded-xl text-sm font-medium cursor-not-allowed">
                        🔒 Odemkni po předchozí lekci
                      </button>
                    ) : (
                      <Link href={lesson.href} className="inline-block bg-robik-accent text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-robik-accent/90 transition-all">
                        Začít lekci →
                      </Link>
                    )}
                    <div className="text-xs text-robik-text/40 mt-2">
                      🎁 Odměna: {lesson.reward}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="mb-16">
          <blockquote className="bg-pastel-yellow/20 rounded-2xl p-6 text-center border border-pastel-yellow/30">
            <p className="text-sm text-robik-text/70 italic mb-3">
              &ldquo;Robočtina mě naučila, že se nemusím bát AI. Pepa je fakt kamarád. I když píše moc dlouhý e-maily.&rdquo;
            </p>
            <cite className="text-xs text-robik-text/50 not-italic">— Tomáš, student, absolvent Robočtiny</cite>
          </blockquote>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-xl font-bold text-robik-dark mb-2">
            Začni svou cestu <span className="text-robik-accent">Robočtinou</span>
          </h2>
          <p className="text-sm text-robik-text/60 mb-6">První lekce je zdarma. Stačí kliknout a začít.</p>
          <Link href="/roboctina/lekce-1" className="inline-block bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
            🎒 Začít učit se
          </Link>
        </section>
      </div>
    </div>
  );
}