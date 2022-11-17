import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';


export default function useBreakPoint() {
    const breakpointList = [
        { px: "1536", bk: 'xl' },
        { px: "1200", bk: 'lg' },
        { px: "900", bk: 'md' }, 
        { px: "600", bk: 'sm' }, 
        { px: "0", bk: 'xs' }
    ]
    let currBreakPoint;

    for (let bk of breakpointList.reverse()) {
        let matches = useMediaQuery(`(min-width:${bk.px}px)`)

        if (matches) {
            currBreakPoint = bk.bk
        }
    }

    return currBreakPoint

}
