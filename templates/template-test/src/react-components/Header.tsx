import React from "react";

type HeaderProps = {
    title: string;
};

export default function Header({ title }: HeaderProps) {
    return <h1 className="tw-text-3xl tw-font-bold">{title}</h1>;
}
