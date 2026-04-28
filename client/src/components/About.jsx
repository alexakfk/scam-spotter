function About({onNavigate}) {
    return (
        <div className="page-content">
            <button className="back-button" onClick={() => onNavigate('home')}>
                Back to main page
            </button>
            <h2>About</h2>
            <p>Scam Spotter is a tool that analyzes text messages for common scam indicators. </p>
        </div>
    );
}
export default About;