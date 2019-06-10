import React from "react";
import "./ImageButton.css";
/*eslint-disable */
/**
 * @imageClass
 * @outerClassName
 * @image
 * @icon
 */
export default function ImageButton(props) {
  const size = props.size || 20;
  const defaultStyle = {
    overflow: "hidden",
    width: `${size}px`,
    height: `${size}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  let finalStyle = defaultStyle;
  if (props.borderStyle) finalStyle = { ...finalStyle, ...props.borderStyle };

  const handleOnClick = e => {
    e.preventDefault();
    if (props.onClick) props.onClick(e);
  };
  return (
    <a
      href=""
      style={finalStyle}
      className={`image-button ${props.outerClassName} no-underline`}
      onClick={handleOnClick}
    >
      {props.image ? (
        <img src={props.image} alt={props.image} width={size * 0.8} className={props.imageClass} />
      ) : (
        props.icon
      )}
    </a>
  );
}
