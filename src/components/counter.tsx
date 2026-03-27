'use client'

import { BaseSyntheticEvent, ChangeEvent, useEffect, useEffectEvent, useRef, useState } from "react";

type CounterProp = {
    count: number;
}


export default function Counter(props: CounterProp) {
    const [count, setCount] = useState(props.count);
    const inputRef = useRef<HTMLInputElement>(null);
    let clickCount = useRef(0);
    useEffect(() => {
        console.log("Count", count);
    }, [count]);
    useEffect(()=>{
        const handler=setInterval(()=>{
            logHandler();
        },5000)
        return ()=>{
           clearInterval(handler);
        }
    },[])
    const logHandler=useEffectEvent(()=>{
         console.log("count",count);
    })
    function increase() {
        console.log("increasing count");
        // setCount(count+1);
        setCount((prevCount) => prevCount + 1);
        setCount((prevCount) => prevCount + 1);
        clickCount.current++;
        console.log("clickCount:",clickCount.current);

        //    console.log("Count",count);
    }
    function decrease() {
        console.log("decreasing count");
        setCount(count - 1);
    }
    function update(event: ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
        setCount(event.target.valueAsNumber);
    }
    function updateButton() {
        setCount(inputRef.current?.valueAsNumber || 0);
    }
    return (
        <div>
            <h4>Count : {count}</h4>
            <div>
                <button onClick={increase}>++</button> &nbsp;
                <button onClick={() => setCount(count - 1)}>--</button>
            </div>
            <div>
                <input type="number" value={count} onChange={update} />
            </div>
            <div>
                <input ref={inputRef} type="number" placeholder="Enter the new count" /> &nbsp;
                <button onClick={updateButton}>Update Count</button>
            </div>
        </div>
    )
}