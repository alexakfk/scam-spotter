function Header({onNavigate, currentPage}) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-top">
          <div />
        <button className="header-brand" onClick={() => onNavigate('home')}>
          <svg className="header-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 3L5 10v10c0 9.55 6.4 18.48 15 20.5 8.6-2.02 15-10.95 15-20.5V10L20 3z"
              fill="rgba(255,255,255,0.15)"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M15 20l4 4 8-8"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1>Scam Spotter</h1>
        </button>

        <nav className = "header-nav">
            <button
              onClick={() => onNavigate('about')}
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}>
              About
            </button>

            <button
              onClick={() => onNavigate('faq')}
              className={`nav-link ${currentPage === 'faq' ? 'active' : ''}`}>
              FAQ
            </button>
        </nav>
      </div>

        <p>Paste a suspicious message to analyze it for common scam indicators</p>
      </div>
    </header>
  );
}

export default Header;
