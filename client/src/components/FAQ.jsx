function FAQ({onNavigate}) {
    return (
        <div className="page-content">
            <button className="back-button" onClick={() => onNavigate('home')}>
                Back to main page
            </button>
            <h2>Frequently Asked Questions</h2>
            <br></br>
            <h4>How does Scam Spotter work?</h4>
            <p>
                Paste a message you're unsure about in the text box
                and hit the 'Analyze Message' button for results.
                The risk percentage along with the heuristics we used to calculate
                it will be displayed on the left panel.
            </p>
            <br></br>
           <h4>Will my data be stored?</h4>
           <p>
                We do not save your data under any circumstance. All messages are 
                analyzed as they are pasted into the web-app and the input box 
                refreshes whenever you reload the site.
           </p>
           <br></br>
           <h4>
                I pasted in a message I'm 99% sure is spam, but it's saying 'Low Risk'. 
                What should I do?
           </h4>
           <p>
                Use your best judgement. We are aware that the system may still occasionally
                report high-risk messages as low-risk and vice versa. We are hoping to 
                improve this issue in future versions of the site as this is a result of 
                the heuristic detection algorithm we chose to utilize for this project.
                We highly encourage everyone to make their own decisions, which is why the 
                tool is intended to be another source of information you may factor into 
                your decision of how to manage a suspicious message.
           </p>
        </div>
    );
}
export default FAQ;