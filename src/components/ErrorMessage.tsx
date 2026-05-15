

import React from "react";

type Props = {
    children?: React.ReactNode;
};

export const ErrorMessage: React.FC<Props> = ({ children }) => {
    return <p className="text-red-500">{children}</p>;
};
