export default async function About() {
    
    await new Promise(resolve=>setTimeout(resolve,3000));
    return (
        <div className="alert alert-info">
            <h4>Next.js Training Application</h4>
            <p>Application to demonstrate the feature of React and Next.js</p>
        </div>
    )
}