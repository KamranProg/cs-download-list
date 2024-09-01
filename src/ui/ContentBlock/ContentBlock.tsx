import React, { ReactNode } from "react";

interface ContentBlockProps {
  title?: string;
  titleTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  description?: string | string[];
  children: ReactNode;
  className?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  title,
  titleTag: TitleTag = "h2",
  description,
  children,
  className = "",
}) => {
  const renderDescription = () => {
    if (Array.isArray(description)) {
      return description.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < description.length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return <>{description}</>;
  };

  return (
    <div>
      {title && <TitleTag>{title}</TitleTag>}
      <p>{description && renderDescription()}</p>
      <div className={className}>{children}</div>
    </div>
  );
};

export default ContentBlock;
