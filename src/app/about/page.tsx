// import { headers } from "next/headers";
export const revalidate= 60;
export default async function About() {

    console.log("Rendering about...");

    // const contentTypeHeader = (await headers()).get("Content-Type");
    // console.log("contentTypeHeader", contentTypeHeader);

    await new Promise(resolve => setTimeout(resolve, 3000));
    return (
        <div className="alert alert-info">
            <h4>Next.js Training Application</h4>
            <p>Application to demonstrate the feature of React and Next.js</p>
        </div>
    )
}

// export const dynamic = 'force-dynamic';