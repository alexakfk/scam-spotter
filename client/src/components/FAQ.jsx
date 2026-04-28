function FAQ({onNavigate}) {
    return (
        <div className="page-content">
            <button className="back-button" onClick={() => onNavigate('home')}>
                Back to main page
            </button>
            <h2>Frequently Asked Questions</h2>
            <h4>How does Scam Spotter work?</h4>
            <p>...</p>
        </div>
    );
}
export default FAQ;