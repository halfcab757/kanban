import { useEffect, useState } from 'react';

import classes from './Tip.module.css';

const Tip: React.FC<{text: string}> = (props) => {
    console.log('tip function runs');
    // let cssClasses = `${classes.tip} ${classes.fading}`;
    const [cssClasses, setCssClasses] = useState(`${classes.tip} ${classes.fading}`);

    const { text } = props;

    // beware of infinite loop

    // useEffect(() => {
    //     console.log('use effect in tip');

    //     // if (!cssClasses.includes('fading')) {
    //     //     console.log('no fading');
    //     //     setCssClasses(`${classes.tip} ${classes.fading}`)
    //     // }

    //     setTimeout(() => {
    //         setCssClasses(`${classes.tip}`);
    //     }, 1000);

        

    //     // return () => setCssClasses(`${classes.tip}`);
    // }, [text, cssClasses]);

    // if (props.text === 'INVISIBLE') {
    //     cssClasses = `${classes.tip} ${classes.invisible}`
    // }

    return (
        <div className={cssClasses}>
            {props.text}
        </div>
    );
}

export default Tip;
