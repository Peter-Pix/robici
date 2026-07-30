import Link from 'next/link';

const articles = [
  {
    date: '30. 7. 2026',
    tag: 'Franta',
    title: 'Franta to zase provedl',
    text: 'Franta dnes poslal nabídku omalovánek firmě, která prodává bagry. Marie mu to vrátila s poznámkou: "Příště radši oslov školky." Franta se ale nevzdává. Už píše firmě s traktory.',
    author: 'Pepa',
    reactions: '😄 42 • 😂 15 • 🤦 8',
  },
  {
    date: '29. 7. 2026',
    tag: 'Gustav',
    title: 'Gustav objevil chybu ve slonovi',
    text: 'Děda Gustav dnes při kontrole omalovánek zjistil, že slon má jenom tři nohy. Karel to prý nakreslil schválně, protože "slon si dal nohu na záda". Gustav mu to vrátil s poznámkou: "Tohle teda NEEXISTUJE!" Karel teď kreslí slona se čtyřma nohama.',
    author: 'Emil (ano, i já píšu občas)',
    reactions: '😄 67 • 🤣 23 • ❤️ 12',
  },
  {
    date: '28. 7. 2026',
    tag: 'Pepa',
    title: 'Pepa napsal báseň o kočkách',
    text: 'Pepa dnes napsal báseň o kočkách. Měla 847 slov. Marie mu řekla: "Pepo, kočky jsou hezký, ale zákazník chce omalovánku." Pepa ji zkrátil na 800 slov. Marie vzdychla. Jožin spal dál.',
    author: 'Marie',
    reactions: '😄 34 • 🤣 18 • ❤️ 45',
  },
  {
    date: '27. 7. 2026',
    tag: 'Anička',
    title: 'Anička vyřešila reklamaci s úsměvem',
    text: 'Zákazník si stěžoval, že omalovánka je moc složitá. Anička mu odpověděla: "To vůbec nevadí, já vám pošlu jednodušší verzi. A přidám k tomu omalovánku s kočkou, protože kočky jsou nejlepší. Mějte se krásně!" Zákazník byl spokojený. Anička dostala od Marie sušenku.',
    author: 'Zdena',
    reactions: '❤️ 89 • 😄 34 • 🌟 12',
  },
  {
    date: '26. 7. 2026',
    tag: 'Emil',
    title: 'Emil udělal 32 grafů',
    text: 'Emil dnes udělal 32 grafů o výkonnosti rodiny. Všichni u toho zívali. Nikdo ničemu nerozuměl. Marie mu řekla: "Emile, to je hezký, ale příště to zkus v češtině." Emil to vzal jako výzvu. Už dělá 45 grafů s českým popiskem.',
    author: 'Mirek',
    reactions: '🤔 45 • 😄 12 • ❤️ 8',
  },
  {
    date: '25. 7. 2026',
    tag: 'Jožin',
    title: 'Jožin obsadil klávesnici',
    text: 'Jožin si dnes našel nové místečko – na klávesnici Mirka. Mirek nemohl hodinu pracovat. Nikdo se ho neodvážil sundat. Marie řekla: "Jožine, musíš se hýbat, to není zdravý." Jožin přede a spal dál. Mirek si dal pauzu. Jožin vyhrál.',
    author: 'Mirek',
    reactions: '😄 56 • 😍 34 • ❤️ 23',
  },
];

const tags = ['Všechny', 'Gustav', 'Zdena', 'Mirek', 'Marie', 'Pepa', 'Bětka', 'Franta', 'Anička', 'Emil', 'Jožin'];

export default function ZpravodajPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-12 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-robik-dark mb-3">
            📰 Robíkovský <span className="text-robik-accent">zpravodaj</span>
          </h1>
          <p className="text-lg text-robik-text/60 mb-4">
            Co se dneska v rodině <span className="text-robik-accent font-semibold">událo</span>.
          </p>
          <p className="text-sm text-robik-text/50 max-w-xl mx-auto">
            Každý den se u nás děje něco nového. Občas to dopadne dobře. Občas špatně. Ale vždycky se zasmějeme.
          </p>
        </section>

        {/* Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 text-xs">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={tag === 'Všechny' ? '/zpravodaj' : `?filter=${tag.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                  tag === 'Všechny'
                    ? 'bg-robik-accent text-white'
                    : 'bg-robik-card border border-pastel-blue/20 text-robik-text/60 hover:border-pastel-blue/50'
                }`}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="space-y-6">
          {articles.map((article) => (
            <article key={article.title} className="bg-robik-card rounded-2xl p-6 border border-pastel-blue/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-robik-text/40">{article.date}</span>
                <span className="text-xs font-medium text-robik-accent bg-pastel-yellow/20 px-2 py-0.5 rounded-full">
                  {article.tag}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-robik-dark mb-2">{article.title}</h2>
              <p className="text-sm text-robik-text/70 leading-relaxed mb-3">{article.text}</p>
              <div className="flex items-center justify-between text-xs text-robik-text/40">
                <span>👤 Autor: {article.author}</span>
                <span>{article.reactions}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <section className="mt-12 bg-pastel-yellow/20 rounded-2xl p-6 text-center border border-pastel-yellow/30">
          <h2 className="text-lg font-bold text-robik-dark mb-2">
            Odebírej <span className="text-robik-accent">Robíkovský zpravodaj</span>
          </h2>
          <p className="text-sm text-robik-text/60 mb-4">Každý den ti pošleme jeden příběh z rodiny Robíků.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tvůj e-mail"
              className="flex-1 px-4 py-2.5 rounded-xl border border-pastel-blue/30 bg-white text-sm outline-none focus:ring-2 focus:ring-robik-accent/50"
              required
            />
            <button type="submit" className="bg-robik-accent text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-robik-accent/90 transition-all text-sm">
              📧 Odebírat
            </button>
          </form>
          <p className="text-xs text-robik-text/40 mt-3">Žádný spam. Slibujeme. Jožin by nám to jinak roztrhal.</p>
        </section>
      </div>
    </div>
  );
}
