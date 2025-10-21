import React, { useState, useEffect } from "react";

import registry from "./registry.json";
import Header from "../react-components/Header.tsx";

const reactRegistry: Record<string, React.FC<any>> = {
    Header,
};

type Widget = {
    id: string;
    type: keyof typeof registry;
    props: Record<string, any>;
};

export function Renderer({ initial }: { initial: Widget[] }) {
    console.log('dsasda')

    const [widgets, setWidgets] = useState(
        initial.map(w => ({
            ...w,
            props: {
                ...registry[w.type]?.props,
                ...w.props,
            },
        }))
    );

    return (
        <>
            {widgets.map((w) => {
                const Comp = reactRegistry[w.type];
                console.log(Comp);
                return Comp ? (
                    <Comp key={w.id} {...w.props} />
                ) : (
                    <div key={w.id}>Unknown widget {w.type}</div>
                );
            })}
        </>
    );
}
