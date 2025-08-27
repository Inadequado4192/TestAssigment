import React from "react";

export default function Modal(props: {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode | React.ReactNode[]
}) {
    function onClose() {
        props.onClose?.();
    }

    if (!props.open) return null;

    return (
        <div
            className="modal"
            onClick={(e) => e.currentTarget == e.target && onClose()}
        >
            {props.children}
        </div>
    )
}