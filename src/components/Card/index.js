import React, { Children, cloneElement } from "react";
import { Box } from "theme-ui";

export const Card = (props) => {
  const child = Children.only(props.children);

  return (
    <Box
      ratio={9 / 14}
      sx={{
        position: "relative",
        display: "flex",
        "&:before": {
          height: 0,
          content: `""`,
          display: "block",
          pb: `${(1 / (9 / 14)) * 100}%`,
        },
        ...props.styles,
      }}
      {...props}
    >
      {cloneElement(child, {
        sx: {
          ...child.props.sx,
          position: "absolute",
          width: "full",
          height: "full",
          top: 0,
          left: 0,
        },
      })}
    </Box>
  );
};
