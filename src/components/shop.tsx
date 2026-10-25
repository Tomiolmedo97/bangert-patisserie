import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import {
  CATEGORIES,
  SIZES,
  cakeById,
  cakes,
  desde,
  formatArs,
  linePrice,
  sizeById,
  type Cake,
  type SizeId,
} from "@/data/cakes";
import { useCart } from "@/store/cart";
import { Logo } from "@/components/logo";

const IG = "https://www.instagram.com/bangert.patisserie/";

const MARQUEE = [
  "Chocotorta",
  "Rogel",
  "Marquise",
  "Lemon pie",
  "Pistacho",
  "Selva negra",
  "Flores",
  "Cheesecake",
  "Red velvet",
  "Brownie",
];

function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const finish = () => setHydrated(true);
    if (useCart.persist.hasHydrated()) finish();
    return useCart.persist.onFinishHydration(finish);
  }, []);
  return hydrated;
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);
}

export function Shop() {
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("Todas");
  const [active, setActive] = useState<Cake | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [notice, setNotice] = useState("");

  useReveal();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const bar = document.getElementById("scroll-progress");
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      const hero = document.getElementById("hero-photo");
      if (hero && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
        hero.style.transform = `translate3d(0, ${window.scrollY * 0.16}px, 0) scale(1.06)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const locked = open || active;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, active]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (active) setActive(null);
      else setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, setOpen]);

  const count = hydrated ? lines.reduce((sum, line) => sum + line.qty, 0) : 0;
  const visible = filter === "Todas" ? cakes : cakes.filter((cake) => cake.category === filter);

  return (
    <div className={`min-h-dvh bg-paper text-ink ${count > 0 ? "pb-24 sm:pb-0" : ""}`}>
      <div className="grain" aria-hidden="true" />
      <div
        id="scroll-progress"
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-cocoa"
        style={{ transform: "scaleX(0)" }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-30 transition-[background-color,border-color] duration-200 ${
          scrolled ? "border-b border-line bg-paper/90 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#inicio" className="tap" aria-label="Bangert Pâtisserie, inicio">
            <Logo className="h-16 w-16" />
          </a>
          <nav className="flex items-center gap-1 sm:gap-4">
            <a href="#carta" className="tap hidden px-3 py-2 text-sm text-stone sm:inline">
              Carta
            </a>
            <a href="#encargo" className="tap hidden px-3 py-2 text-sm text-stone sm:inline">
              Encargo
            </a>
            <button
              type="button"
              className="tap inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-3.5 text-sm"
              onClick={() => setOpen(true)}
              aria-label={`Abrir pedido, ${count} tortas`}
            >
              <ShoppingBag className="size-4" />
              <span className="tabular-nums">{count}</span>
            </button>
          </nav>
        </div>
      </header>

      <main id="inicio">
        <section className="mx-auto grid max-w-6xl items-end gap-8 px-4 pt-28 pb-10 sm:px-6 sm:pt-32 lg:grid-cols-12 lg:gap-12 lg:pb-16">
          <div className="lg:col-span-5">
            <p className="hero-word text-xs uppercase tracking-[0.28em] text-cocoa" style={{ animationDelay: "40ms" }}>
              San Miguel · Buenos Aires
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.02] text-balance sm:text-6xl">
              <span className="hero-word" style={{ animationDelay: "120ms" }}>
                Tortas
              </span>{" "}
              <span className="hero-word" style={{ animationDelay: "200ms" }}>
                para
              </span>{" "}
              <span className="hero-word" style={{ animationDelay: "280ms" }}>
                la
              </span>{" "}
              <span className="hero-word" style={{ animationDelay: "360ms" }}>
                mesa,
              </span>
              <span className="mt-1 block font-display italic text-cocoa">
                <span className="hero-word" style={{ animationDelay: "460ms" }}>
                  hechas
                </span>{" "}
                <span className="hero-word" style={{ animationDelay: "540ms" }}>
                  a
                </span>{" "}
                <span className="hero-word" style={{ animationDelay: "620ms" }}>
                  mano.
                </span>
              </span>
            </h1>
            <p className="hero-word mt-5 max-w-md text-base leading-relaxed text-pretty text-stone" style={{ animationDelay: "720ms" }}>
              Celeste Bangert, egresada de la EAG. Pastelería artesanal por encargo, con retiro en San Miguel.
            </p>
            <div className="hero-word mt-7 flex flex-wrap gap-3" style={{ animationDelay: "820ms" }}>
              <a
                href="#carta"
                className="tap inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-paper"
              >
                Ver la carta
              </a>
              <a
                href={IG}
                target="_blank"
                rel="noreferrer"
                className="tap inline-flex min-h-11 items-center rounded-full border border-line bg-card px-5 text-sm"
              >
                Instagram
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl bg-line">
              <img
                id="hero-photo"
                src="/cakes/hero.jpg"
                alt="Chocotorta, rogel y torta de flores sobre una mesa de yeso"
                className="aspect-[16/10] w-full object-cover will-change-transform"
              />
            </div>
          </div>
        </section>

        <div className="overflow-hidden border-y border-line py-3">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <p key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {MARQUEE.map((item) => (
                  <span key={`${copy}-${item}`} className="px-4 text-xs uppercase tracking-[0.22em] text-stone">
                    {item}
                    <span className="ml-8 text-blush">·</span>
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>

        <section className="mx-auto grid max-w-6xl gap-px bg-line px-0 py-0 sm:grid-cols-3">
          {[
            ["48 h", "de anticipación para casi toda la carta."],
            ["San Miguel", "retiro coordinado. No hay local a la calle."],
            ["EAG", "Celeste se formó en la Escuela Argentina de Gastronomía."],
          ].map(([title, copy], index) => (
            <div key={title} className={`reveal reveal-delay-${index} bg-paper px-6 py-8`}>
              <p className="font-display text-2xl">{title}</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-pretty text-stone">{copy}</p>
            </div>
          ))}
        </section>

        <section id="carta" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cocoa">La carta</p>
              <h2 className="mt-2 font-display text-4xl text-balance sm:text-5xl">Doce tortas, una mesa.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-pretty text-stone">
              Precios de referencia para encargar. El valor final se confirma por mensaje antes de hornear.
            </p>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filtrar carta">
            {CATEGORIES.map((category) => {
              const selected = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(category)}
                  className={`tap min-h-11 shrink-0 rounded-full px-4 text-sm transition-colors duration-200 ${
                    selected ? "bg-ink text-paper" : "bg-card text-stone"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <ul className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((cake) => (
              <li key={cake.id}>
                <article className="group">
                  <button
                    type="button"
                    className="tap block w-full text-left"
                    onClick={() => setActive(cake)}
                  >
                    <div className="overflow-hidden rounded-2xl bg-line">
                      <img
                        src={cake.image}
                        alt={cake.name}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-3 flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-2xl">{cake.name}</h3>
                      <p className="shrink-0 text-sm tabular-nums text-stone">
                        desde {formatArs(desde(cake.price12))}
                      </p>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-pretty text-stone">{cake.blurb}</p>
                  </button>
                  <button
                    type="button"
                    className="tap mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-cocoa"
                    onClick={() => {
                      useCart.getState().add(cake.id, "12", 1);
                      setNotice(`${cake.name} sumada al pedido`);
                      window.setTimeout(() => setNotice(""), 1600);
                    }}
                  >
                    <Plus className="size-4" />
                    Sumar 12 porciones
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section id="encargo" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.22em] text-cocoa">Cómo encargar</p>
              <h2 className="mt-2 font-display text-4xl text-balance">Armás el pedido. Lo confirmamos por Instagram.</h2>
              <ol className="mt-8 space-y-5 text-sm leading-relaxed">
                <li className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-display text-xl text-cocoa">01</span>
                  <span>Elegí torta, tamaño y cantidad. El carrito queda guardado en este dispositivo.</span>
                </li>
                <li className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-display text-xl text-cocoa">02</span>
                  <span>Dejá tu nombre, el día de retiro y una nota si hay dedicatoria o alergia.</span>
                </li>
                <li className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-display text-xl text-cocoa">03</span>
                  <span>Copiá el pedido y mandalo a @bangert.patisserie. Ahí se cierra fecha y valor.</span>
                </li>
              </ol>
            </div>
            <div className="reveal reveal-delay-2 overflow-hidden rounded-3xl">
              <img
                src="/cakes/flores.jpg"
                alt="Torta de buttercream marfil con flores de azúcar"
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <Logo alt="Bangert Pâtisserie" className="h-40 w-40" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-pretty text-stone">
              Pastelería artesanal · San Miguel, Buenos Aires. Consultas por Instagram, también en @celuubangert.
            </p>
          </div>
          <a href={IG} target="_blank" rel="noreferrer" className="tap text-sm underline decoration-line underline-offset-4">
            @bangert.patisserie
          </a>
        </div>
      </footer>

      {count > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 p-3 backdrop-blur-md sm:hidden">
          <button
            type="button"
            className="tap flex min-h-12 w-full items-center justify-between rounded-full bg-ink px-5 text-sm text-paper"
            onClick={() => setOpen(true)}
          >
            <span>Ver pedido</span>
            <span className="tabular-nums">{count}</span>
          </button>
        </div>
      ) : null}

      {notice ? (
        <p className="fixed bottom-20 left-1/2 z-30 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-paper sm:bottom-6">
          {notice}
        </p>
      ) : null}

      <CartDrawer />
      {active ? <CakeSheet cake={active} onClose={() => setActive(null)} /> : null}
    </div>
  );
}

function CartDrawer() {
  const hydrated = useHydrated();
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const clear = useCart((s) => s.clear);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  const detailed = useMemo(
    () =>
      (hydrated ? lines : [])
        .map((line) => {
          const cake = cakeById(line.cakeId);
          if (!cake) return null;
          const unit = linePrice(cake.price12, line.size);
          return { ...line, cake, unit, total: unit * line.qty };
        })
        .filter((line): line is NonNullable<typeof line> => line !== null),
    [hydrated, lines],
  );

  const total = detailed.reduce((sum, line) => sum + line.total, 0);

  async function copyOrder() {
    const body = [
      "Pedido Bangert Pâtisserie",
      name ? `Nombre: ${name}` : "Nombre: (sin completar)",
      date ? `Retiro: ${date}` : "Retiro: a coordinar",
      note ? `Nota: ${note}` : "",
      "",
      ...detailed.map(
        (line) =>
          `- ${line.cake.name} · ${sizeById(line.size).label} × ${line.qty} — ${formatArs(line.total)} (referencia)`,
      ),
      "",
      `Total de referencia: ${formatArs(total)}`,
      "Confirmo por Instagram @bangert.patisserie",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    window.open(IG, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={`fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      <button
        type="button"
        className={`absolute inset-0 bg-ink/30 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        aria-label="Cerrar pedido"
        onClick={() => setOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu pedido"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-2xl">Tu pedido</h2>
          <button type="button" className="tap grid size-11 place-items-center" onClick={() => setOpen(false)} aria-label="Cerrar">
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {detailed.length === 0 ? (
            <p className="text-sm leading-relaxed text-stone">
              Todavía no hay tortas. Sumá alguna de la carta y el pedido queda acá.
            </p>
          ) : (
            <ul className="space-y-4">
              {detailed.map((line) => (
                <li key={`${line.cakeId}-${line.size}`} className="grid grid-cols-[4.5rem_1fr] gap-3">
                  <img src={line.cake.image} alt="" className="aspect-square w-full rounded-xl object-cover" />
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{line.cake.name}</p>
                        <p className="text-sm text-stone">{sizeById(line.size).label}</p>
                      </div>
                      <p className="text-sm tabular-nums">{formatArs(line.total)}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="tap grid size-11 place-items-center rounded-full border border-line"
                        aria-label="Quitar una"
                        onClick={() => setQty(line.cakeId, line.size, line.qty - 1)}
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-6 text-center text-sm tabular-nums">{line.qty}</span>
                      <button
                        type="button"
                        className="tap grid size-11 place-items-center rounded-full border border-line"
                        aria-label="Sumar una"
                        onClick={() => setQty(line.cakeId, line.size, line.qty + 1)}
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {detailed.length > 0 ? (
            <form className="mt-6 space-y-3 border-t border-line pt-5" onSubmit={(event) => event.preventDefault()}>
              <label className="block text-sm">
                Nombre
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1 min-h-11 w-full rounded-xl border border-line bg-card px-3"
                  autoComplete="name"
                />
              </label>
              <label className="block text-sm">
                Día de retiro
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="mt-1 min-h-11 w-full rounded-xl border border-line bg-card px-3"
                />
              </label>
              <label className="block text-sm">
                Nota
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  placeholder="Dedicatoria, relleno de la torta Flores, alergias…"
                  className="mt-1 w-full rounded-xl border border-line bg-card px-3 py-2"
                />
              </label>
            </form>
          ) : null}
        </div>
        <div className="border-t border-line px-5 py-4">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="text-sm text-stone">Referencia</span>
            <span className="font-display text-2xl tabular-nums">{formatArs(total)}</span>
          </div>
          <button
            type="button"
            disabled={detailed.length === 0}
            onClick={() => void copyOrder()}
            className="tap min-h-12 w-full rounded-full bg-ink text-sm text-paper disabled:opacity-40"
          >
            {copied ? "Pedido copiado · abrir Instagram" : "Copiar pedido y escribir"}
          </button>
          {detailed.length > 0 ? (
            <button type="button" className="tap mt-2 min-h-11 w-full text-sm text-stone" onClick={clear}>
              Vaciar
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function CakeSheet({ cake, onClose }: { cake: Cake; onClose: () => void }) {
  const [size, setSize] = useState<SizeId>("12");
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const setOpen = useCart((s) => s.setOpen);
  const price = linePrice(cake.price12, size) * qty;

  return (
    <div className="fixed inset-0 z-40">
      <button type="button" className="absolute inset-0 bg-ink/30" aria-label="Cerrar ficha" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cake-title"
        className="absolute inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto rounded-t-3xl bg-paper sm:inset-y-6 sm:left-1/2 sm:w-[min(920px,calc(100%-2rem))] sm:-translate-x-1/2 sm:rounded-3xl"
      >
        <div className="grid sm:grid-cols-2">
          <img src={cake.image} alt={cake.name} className="aspect-[4/3] w-full object-cover sm:aspect-auto sm:h-full" />
          <div className="px-5 py-5 sm:px-7 sm:py-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cocoa">{cake.category}</p>
                <h2 id="cake-title" className="mt-1 font-display text-4xl">
                  {cake.name}
                </h2>
              </div>
              <button type="button" className="tap grid size-11 place-items-center" onClick={onClose} aria-label="Cerrar">
                <X className="size-5" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-pretty">{cake.description}</p>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-stone">{cake.notes}</p>

            <fieldset className="mt-6">
              <legend className="text-sm">Tamaño</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {SIZES.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSize(option.id)}
                    className={`tap min-h-11 rounded-xl border px-2 text-sm ${
                      size === option.id ? "border-ink bg-ink text-paper" : "border-line bg-card"
                    }`}
                  >
                    {option.label.replace(" porciones", "")}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button type="button" className="tap grid size-11 place-items-center rounded-full border border-line" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="Menos">
                  <Minus className="size-4" />
                </button>
                <span className="w-6 text-center tabular-nums">{qty}</span>
                <button type="button" className="tap grid size-11 place-items-center rounded-full border border-line" onClick={() => setQty((n) => n + 1)} aria-label="Más">
                  <Plus className="size-4" />
                </button>
              </div>
              <p className="font-display text-2xl tabular-nums">{formatArs(price)}</p>
            </div>

            <button
              type="button"
              className="tap mt-5 min-h-12 w-full rounded-full bg-cocoa text-sm text-paper"
              onClick={() => {
                add(cake.id, size, qty);
                setOpen(true);
                onClose();
              }}
            >
              Sumar al pedido
            </button>
            <p className="mt-3 text-center text-xs text-stone">Importe de referencia. Se confirma antes de preparar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
