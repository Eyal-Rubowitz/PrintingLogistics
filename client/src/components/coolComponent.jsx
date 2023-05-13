import { useState, useEffect } from "react";

const CoolComponent = () => {
    const [count, setCount] = useState(0);
    const [coolStateVar, setCoolStateVar] = useState(false);

    useEffect(() => console.log(`I'm a side effect!`), [coolStateVar]);
    return (
        <div>
            <div>
                Cool counter: {count}
            </div>
            <button id='button-1' onClick={() => setCount(count+1)}>Button1: I increment the count!</button>
            <br /><br />
            <button id='button-2' onClick={() => {setCoolStateVar(!coolStateVar); setCount(count+1)}}>Button2: I increment the count AND do a Side Effect!</button>
        </div>
    );
}

export default CoolComponent;