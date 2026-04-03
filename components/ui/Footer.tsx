export default function Footer() {
  return (
    <footer
      className="w-full py-16 sm:py-24 px-5 sm:px-8 lg:px-12"
      style={{
        background: 'var(--cement)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <h3
              className="text-3xl tracking-[0.2em] font-bold mb-4"
              style={{ fontFamily: "var(--font-bebas)", color: 'var(--dark)' }}
            >
              DRAPE
            </h3>
            <p
              className="text-sm leading-relaxed max-w-xs opacity-50"
              style={{ color: 'var(--dark)' }}
            >
              Minimalist fashion. Every thread, intentional. Designed for those who wear the quiet.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              {['IG', 'TW', 'PI'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold tracking-widest transition-all hover:bg-white/10 hover:border-wood/50"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: 'var(--dark)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4
              className="text-[10px] tracking-[0.25em] uppercase mb-6 font-bold"
              style={{ fontFamily: "var(--font-mono)", color: 'var(--wood)' }}
            >
              Shop
            </h4>
            <ul className="space-y-3">
              {['All Products', 'Tees', 'Shirts', 'Pants', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <a
                    href="#shop"
                    className="text-sm opacity-40 transition-all hover:opacity-100 hover:text-wood"
                    style={{ color: 'var(--dark)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4
              className="text-[10px] tracking-[0.25em] uppercase mb-6 font-bold"
              style={{ fontFamily: "var(--font-mono)", color: 'var(--wood)' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {['About', 'Journal', 'Sustainability', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={item === 'About' ? '#about' : item === 'Contact' ? '#contact' : '#'}
                    className="text-sm opacity-40 transition-all hover:opacity-100 hover:text-white"
                    style={{ color: '#FFFFFF' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4
              className="text-[10px] tracking-[0.25em] uppercase mb-6 font-bold"
              style={{ fontFamily: "var(--font-mono)", color: 'var(--wood)' }}
            >
              Support
            </h4>
            <ul className="space-y-3">
              {['FAQ', 'Shipping', 'Returns', 'Size Guide', 'Track Order'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm opacity-40 transition-all hover:opacity-100 hover:text-white"
                    style={{ color: '#FFFFFF' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row justify-between items-center pt-10 gap-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex flex-col items-center md:items-start gap-4">
            <p
              className="text-[11px] tracking-wider opacity-30"
              style={{ fontFamily: "var(--font-mono)", color: '#FFFFFF' }}
            >
              © 2026 DRAPE. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-2">
              {/* Payment Icons - Bright White & Even Sized */}
              {/* Visa */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z" />
              </svg>
              {/* Mastercard */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.343 18.031c.058.049.12.098.181.146-1.177.783-2.59 1.238-4.107 1.238C3.32 19.416 0 16.096 0 12c0-4.095 3.32-7.416 7.416-7.416 1.518 0 2.931.456 4.105 1.238-.06.051-.12.098-.165.15C9.6 7.489 8.595 9.688 8.595 12c0 2.311 1.001 4.51 2.748 6.031zm5.241-13.447c-1.52 0-2.931.456-4.105 1.238.06.051.12.098.165.15C14.4 7.489 15.405 9.688 15.405 12c0 2.31-1.001 4.507-2.748 6.031-.058.049-.12.098-.181.146 1.177.783 2.588 1.238 4.107 1.238C20.68 19.416 24 16.096 24 12c0-4.094-3.32-7.416-7.416-7.416zM12 6.174c-.096.075-.189.15-.28.231C10.156 7.764 9.169 9.765 9.169 12c0 2.236.987 4.236 2.551 5.595.09.08.185.158.28.232.096-.074.189-.152.28-.232 1.563-1.359 2.551-3.359 2.551-5.595 0-2.235-.987-4.236-2.551-5.595-.09-.08-.184-.156-.28-.231z" />
              </svg>
              {/* Stripe */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
              </svg>
              {/* Google Pay */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.963 7.235A3.963 3.963 0 00.422 9.419a3.963 3.963 0 000 3.559 3.963 3.963 0 003.541 2.184c1.07 0 1.97-.352 2.627-.957.748-.69 1.18-1.71 1.18-2.916a4.722 4.722 0 00-.07-.806H3.964v1.526h2.14a1.835 1.835 0 01-.79 1.205c-.356.241-.814.379-1.35.379-1.034 0-1.911-.697-2.225-1.636a2.375 2.375 0 010-1.517c.314-.94 1.191-1.636 2.225-1.636a2.152 2.152 0 011.52.594l1.132-1.13a3.808 3.808 0 00-2.652-1.033zm6.501.55v6.9h.886V11.89h1.465c.603 0 1.11-.196 1.522-.588a1.911 1.911 0 00.635-1.464 1.92 1.92 0 00-.635-1.456 2.125 2.125 0 00-1.522-.598zm2.427.85a1.156 1.156 0 01.823.365 1.176 1.176 0 010 1.686 1.171 1.171 0 01-.877.357H11.35V8.635h1.487a1.156 1.156 0 01.054 0zm4.124 1.175c-.842 0-1.477.308-1.907.925l.781.491c.288-.417.68-.626 1.175-.626a1.255 1.255 0 01.856.323 1.009 1.009 0 01.366.785v.202c-.34-.193-.774-.289-1.3-.289-.617 0-1.11.145-1.479.434-.37.288-.554.677-.554 1.165a1.476 1.476 0 00.525 1.156c.35.308.785.463 1.305.463.61 0 1.098-.27 1.465-.81h.038v.655h.848v-2.909c0-.61-.19-1.09-.568-1.44-.38-.35-.896-.525-1.551-.525zm2.263.154l1.946 4.422-1.098 2.38h.915L24 9.963h-.965l-1.368 3.391h-.02l-1.406-3.39zm-2.146 2.368c.494 0 .88.11 1.156.33 0 .372-.147.696-.44.973a1.413 1.413 0 01-.997.414 1.081 1.081 0 01-.69-.232.708.708 0 01-.293-.578c0-.257.12-.47.363-.647.24-.173.54-.26.9-.26Z" />
              </svg>
              {/* Razorpay */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z" />
              </svg>
            </div>
          </div>
          <p
            className="text-[11px] tracking-wider opacity-20"
            style={{ fontFamily: "var(--font-mono)", color: '#FFFFFF' }}
          >
            Built by XyberFlow — The Agentic Tech Partner
          </p>
        </div>
      </div>
    </footer>
  )
}

