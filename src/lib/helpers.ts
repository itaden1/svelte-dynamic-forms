import type { iIndexedObj } from "../interface";

function reIndexComponents(index: number, components: Array<iIndexedObj>) {
    return components.map((c, i) => {
        if (index === 0){
            c.index = i;
        }
        else if (c.index >= index) {
            c.index++;
        }
        return c;
    });
}

export default reIndexComponents;
