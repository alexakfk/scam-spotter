function About({onNavigate}) {
    return (
        <div className="page-content">
            <button className="back-button" onClick={() => onNavigate('home')}>
                Back to main page
            </button>
            <h2>About</h2>
            <br></br>
            <p>
                Scam Spotter is a tool that analyzes text messages for common scam indicators.
            </p>
            <br></br>
            <p>
                This tool was created by Alexa Kafka, Claire Cao, Grace Cai, and Emanuel Pimentel for Barnard Colleges'
                COMS3997 Building Usable Security course.
            </p>
            <br></br>
            <p>
                Our aim in this project was to create a tool that would inform users with relevant
                information regarding potential scam messages while preserving the user's agency.
                Our tool does this by analyzing the risk level of an input message, provide
                the users with the heuristics of the message that generated the risk percentage,
                and then allow the user to take their own further action.
            </p>
            <br></br>
            <p>
                We hope that in using this tool, users are able to make educated and informed
                choices in managing potentially harmful messages.
            </p>
            <br></br>
            <p>
                Github repository: <a href="https://github.com/alexakfk/scam-spotter"> 
                https://github.com/alexakfk/scam-spotter </a> 
            </p>
                
        </div>
    );
}
export default About;