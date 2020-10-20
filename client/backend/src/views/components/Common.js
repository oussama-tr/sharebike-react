import { memo } from "react";

export const Celsius = memo(({ temp }) => {
    return temp.toFixed() + '℃';
});