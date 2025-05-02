import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  return <div>{children}</div>;
}
