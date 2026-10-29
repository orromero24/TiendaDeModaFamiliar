import { FormEvent, ReactNode, useMemo, useState } from "react"

type IconName =
  | "arrow"
  | "bag"
  | "chevron"
  | "close"
  | "facebook"
  | "heart"
  | "instagram"
  | "menu"
  | "search"
  | "user"

const images = {
  hero: "https://images.unsplash.com/photo-1663518756516-5e8ce39e412f?auto=format&fit=crop&w=1600&q=88",
  family: "https://images.unsplash.com/photo-1665302606498-94756c22cfd7?auto=format&fit=crop&w=1200&q=85",
  kids: "https://images.unsplash.com/photo-1615916196035-62bcc6d720f5?auto=format&fit=crop&w=900&q=85",
  girls: "https://images.unsplash.com/photo-1724365309223-89899d9e9845?auto=format&fit=crop&w=900&q=85",
  women: "https://images.unsplash.com/photo-1608482624067-b20f8b0cb08c?auto=format&fit=crop&w=900&q=85",
  men: "https://images.unsplash.com/photo-1674851993957-f5d6cacd5e1b?auto=format&fit=crop&w=900&q=85",
  cardigan: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=900&q=85",
  knit: "https://images.unsplash.com/photo-1621198059871-0d5f9b449233?auto=format&fit=crop&w=900&q=85",
  shirt: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?auto=format&fit=crop&w=900&q=85",
  denim: "https://images.unsplash.com/photo-1586084611164-a9accaeab607?auto=format&fit=crop&w=900&q=85",
}

const categories = [
  { name: "Niños", image: images.kids, position: "center 30%" },
  { name: "Niñas", image: images.girls, position: "center 20%" },
  { name: "Damas", image: images.women, position: "center 24%" },
  { name: "Caballeros", image: images.men, position: "center 22%" },
]

const products = [
  { id: 1, name: "Conjunto Olivia", category: "Damas", price: 149900, oldPrice: 189900, image: images.cardigan, rating: 4.9, tag: "-21%" },
  { id: 2, name: "Suéter Nube", category: "Niñas", price: 89900, oldPrice: null, image: images.knit, rating: 4.8, tag: "Nuevo" },
  { id: 3, name: "Camiseta Esencial", category: "Caballeros", price: 69900, oldPrice: 84900, image: images.shirt, rating: 4.7, tag: "-18%" },
  { id: 4, name: "Jean Clásico", category: "Niños", price: 109900, oldPrice: null, image: images.denim, rating: 4.9, tag: "Favorito" },
]

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bag: <><path d="M6 8h12l1 13H5L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    facebook: <path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1Z" />,
  }
  return <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">{paths[name]}</svg>
}

function Link({
  children,
  className = "",
  href = "#",
  onClick,
}: {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
}) {
  return <a className={className} href={href} onClick={onClick}>{children}</a>
}

function Button({
  children,
  className = "",
  onClick,
  type = "button",
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit"
}) {
  return <button className={className} onClick={onClick} type={type}>{children}</button>
}

function Title({ as = "h2", children, className = "" }: { as?: "h1" | "h2" | "h3"; children: ReactNode; className?: string }) {
  const Tag = as
  return <Tag className={className}>{children}</Tag>
}

const currency = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })

export default function App() {
  const [cartCount, setCartCount] = useState(2)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [subscribed, setSubscribed] = useState(false)

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === "Todos" || product.category === activeCategory
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <div className="min-h-screen bg-brand-cream text-brand-blue">
      <div className="bg-brand-blue px-5 py-2.5 text-center text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
        Envío gratis por compras superiores a $180.000
      </div>

      <header className="sticky top-0 z-50 border-b border-brand-blue/10 bg-brand-cream/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-5 py-4 lg:px-10">
          <Button className="grid h-10 w-10 place-items-center lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "close" : "menu"} size={23} />
            <span className="sr-only">Abrir menú</span>
          </Button>

          <Link className="mr-auto shrink-0 lg:mr-3" href="#">
            <img alt="Estreno, bodega mayorista de moda fresca" className="h-12 w-32 object-contain sm:w-40 lg:h-14 lg:w-44" src="/logo-estreno.png" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {categories.map((category) => (
              <Link className="nav-link" href="#categorias" key={category.name}>{category.name}</Link>
            ))}
            <Link className="nav-link text-brand-orange" href="#tienda">Ofertas</Link>
          </nav>

          <label className="hidden h-11 min-w-56 flex-1 items-center gap-3 rounded-full border border-stone-300 bg-white px-4 xl:flex">
            <Icon name="search" size={18} />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar prendas..."
              value={query}
            />
          </label>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button className="icon-button hidden sm:grid">
              <Icon name="user" size={21} />
              <span className="sr-only">Mi cuenta</span>
            </Button>
            <Button className="icon-button relative" onClick={() => document.querySelector("#tienda")?.scrollIntoView({ behavior: "smooth" })}>
              <Icon name="bag" size={22} />
              <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">{cartCount}</span>
              <span className="sr-only">Carrito</span>
            </Button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-brand-blue/10 bg-brand-cream px-5 py-5 lg:hidden">
            <label className="mb-5 flex h-12 items-center gap-3 rounded-full border border-stone-300 bg-white px-4">
              <Icon name="search" size={18} />
              <input className="w-full bg-transparent text-sm outline-none" onChange={(event) => setQuery(event.target.value)} placeholder="Buscar prendas..." value={query} />
            </label>
            <nav className="grid gap-1">
              {[...categories.map((item) => item.name), "Ofertas"].map((name) => (
                <Link className="flex items-center justify-between border-b border-stone-200 py-3 text-sm font-semibold" href={name === "Ofertas" ? "#tienda" : "#categorias"} key={name}>
                  {name}<Icon name="chevron" size={17} />
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="hero-grid mx-auto grid max-w-[1440px] overflow-hidden bg-brand-yellow-soft lg:min-h-[680px] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative z-10 flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-20 lg:py-24">
            <p className="eyebrow mb-6">Nueva colección · 2025</p>
            <Title as="h1" className="max-w-xl font-serif text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.82] font-medium tracking-[-0.065em]">
              Un estreno <em className="font-normal text-brand-orange">para cada</em> historia.
            </Title>
            <p className="mt-8 max-w-md text-base leading-7 text-stone-600">
              Moda cómoda, auténtica y hecha para disfrutar en familia. Descubre los esenciales de esta temporada.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link className="primary-button" href="#tienda">Comprar ahora <Icon name="arrow" size={18} /></Link>
              <Link className="text-link" href="#categorias">Ver colección</Link>
            </div>
            <div className="mt-14 flex gap-8 border-t border-brand-blue/15 pt-5 text-xs font-semibold uppercase tracking-wider">
              <span>+800 referencias</span><span>30 días para cambios</span>
            </div>
          </div>
          <div className="relative min-h-[500px] overflow-hidden lg:min-h-full">
            <img alt="Familia vistiendo la nueva colección de Almacén Estreno" className="absolute inset-0 h-full w-full object-cover object-[center_25%]" src={images.hero} />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold backdrop-blur-md">Colección Tierra · Edición limitada</div>
          </div>
        </section>

        <section className="section-shell py-20 lg:py-28" id="categorias">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-3">Para toda la familia</p>
              <Title className="section-title">Encuentra tu estilo</Title>
            </div>
            <Link className="text-link hidden sm:flex" href="#tienda">Ver todo <Icon name="arrow" size={17} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            {categories.map((category, index) => (
              <Link className={`category-card group ${index % 2 ? "mt-8 lg:mt-12" : ""}`} href="#tienda" key={category.name} onClick={() => setActiveCategory(category.name)}>
                <img alt={`Moda para ${category.name.toLowerCase()}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" src={category.image} style={{ objectPosition: category.position }} />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white sm:p-6">
                  <span className="font-serif text-2xl sm:text-4xl">{category.name}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/60 transition group-hover:bg-brand-yellow group-hover:text-brand-blue"><Icon name="arrow" size={17} /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28" id="tienda">
          <div className="section-shell">
            <div className="mb-8 text-center">
              <p className="eyebrow mb-3">Lo más buscado</p>
              <Title className="section-title">Favoritos de temporada</Title>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-stone-500">Prendas versátiles para acompañar cada momento, seleccionadas por calidad y comodidad.</p>
            </div>
            <div className="no-scrollbar mb-10 flex justify-start gap-2 overflow-x-auto pb-2 sm:justify-center">
              {["Todos", "Niños", "Niñas", "Damas", "Caballeros"].map((category) => (
                <Button className={`filter-pill ${activeCategory === category ? "active" : ""}`} key={category} onClick={() => setActiveCategory(category)}>{category}</Button>
              ))}
            </div>
            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
                {visibleProducts.map((product) => (
                  <article className="product-card group" key={product.id}>
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                      <img alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" src={product.image} />
                      <span className="absolute left-3 top-3 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">{product.tag}</span>
                      <Button className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 transition hover:bg-brand-blue hover:text-white">
                        <Icon name="heart" size={17} /><span className="sr-only">Guardar {product.name}</span>
                      </Button>
                      <Button className="add-button" onClick={() => setCartCount((count) => count + 1)}>Añadir al carrito</Button>
                    </div>
                    <div className="pt-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">{product.category}</p>
                      <Title as="h3" className="font-serif text-xl font-semibold">{product.name}</Title>
                      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-bold">{currency.format(product.price)}</span>
                        {product.oldPrice && <span className="text-xs text-stone-400 line-through">{currency.format(product.oldPrice)}</span>}
                        <span className="ml-auto text-xs font-semibold text-stone-500"><span className="text-brand-orange">★</span> {product.rating}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-stone-100 px-6 py-16 text-center">
                <Title as="h3" className="font-serif text-3xl">No encontramos resultados</Title>
                <p className="mt-2 text-sm text-stone-500">Prueba con otra búsqueda o explora todas las categorías.</p>
                <Button className="mt-6 text-link" onClick={() => { setQuery(""); setActiveCategory("Todos") }}>Limpiar filtros</Button>
              </div>
            )}
          </div>
        </section>

        <section className="section-shell pb-20 lg:pb-28">
          <div className="grid overflow-hidden bg-brand-blue text-white lg:grid-cols-2">
            <img alt="Familia compartiendo un momento con estilo" className="h-[380px] w-full object-cover object-[center_35%] lg:h-full" src={images.family} />
            <div className="flex flex-col justify-center px-7 py-14 sm:px-14 lg:min-h-[520px] lg:px-20">
              <p className="eyebrow mb-5 text-stone-300">Somos de aquí</p>
              <Title className="font-serif text-4xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">Vestimos los momentos que se vuelven recuerdos.</Title>
              <p className="mt-6 max-w-lg text-sm leading-7 text-stone-300">Desde hace más de 20 años acompañamos a familias colombianas con moda honesta, cercana y pensada para durar.</p>
              <Link className="mt-8 inline-flex w-fit items-center gap-2 border-b border-white pb-1 text-xs font-bold uppercase tracking-widest" href="#">Conoce nuestra historia <Icon name="arrow" size={17} /></Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-yellow text-brand-blue">
        <div className="section-shell grid gap-12 py-16 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1.4fr] lg:py-20">
          <div>
            <img alt="Logo Estreno" className="h-auto w-56 object-contain object-left" src="/logo-estreno.png" />
            <p className="mt-5 max-w-xs text-sm leading-6 text-brand-blue/75">Moda para cada integrante de la familia, con la calidad y cercanía de siempre.</p>
            <div className="mt-6 flex gap-3">
              <Link className="social-button" href="#"><Icon name="instagram" size={18} /><span className="sr-only">Instagram</span></Link>
              <Link className="social-button" href="#"><Icon name="facebook" size={18} /><span className="sr-only">Facebook</span></Link>
            </div>
          </div>
          <div>
            <Title as="h3" className="footer-title">Ayuda</Title>
            <div className="footer-links"><Link href="#">Envíos y entregas</Link><Link href="#">Cambios y devoluciones</Link><Link href="#">Guía de tallas</Link><Link href="#">Preguntas frecuentes</Link></div>
          </div>
          <div>
            <Title as="h3" className="footer-title">Nosotros</Title>
            <div className="footer-links"><Link href="#">Nuestra historia</Link><Link href="#">Tiendas</Link><Link href="#">Contacto</Link><Link href="#">Trabaja con nosotros</Link></div>
          </div>
          <div>
            <Title as="h3" className="font-serif text-3xl">Un estreno en tu correo</Title>
            <p className="mt-3 text-sm leading-6 text-brand-blue/75">Recibe novedades, inspiración y descuentos exclusivos.</p>
            {subscribed ? (
              <p className="mt-6 border-b border-brand-blue pb-3 text-sm font-bold">Gracias por ser parte de la familia.</p>
            ) : (
              <form className="mt-6 flex border-b border-brand-blue" onSubmit={handleSubscribe}>
                <input aria-label="Correo electrónico" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-brand-blue/60" placeholder="Tu correo electrónico" required type="email" />
                <Button className="grid w-11 place-items-center" type="submit"><Icon name="arrow" size={20} /><span className="sr-only">Suscribirme</span></Button>
              </form>
            )}
            <p className="mt-7 text-[10px] font-bold uppercase tracking-widest">Pagos seguros · Visa · Mastercard · PSE</p>
          </div>
        </div>
        <div className="border-t border-brand-blue/20">
          <div className="section-shell flex flex-col gap-3 py-5 text-[10px] font-semibold uppercase tracking-wider sm:flex-row sm:items-center sm:justify-between">
            <p>© 2025 Almacén Estreno</p>
            <div className="flex gap-5"><Link href="#">Privacidad</Link><Link href="#">Términos</Link></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
