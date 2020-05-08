import React, { Children, cloneElement } from "react";
import { Box, Flex } from "theme-ui";
import { ReactComponent as CA } from "../../images/CA.svg";
import { ReactComponent as CE } from "../../images/CE.svg";
import { ReactComponent as TR } from "../../images/TR.svg";
import { ReactComponent as PI } from "../../images/PI.svg";

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

export const CardFace = (props) => {
  const carte = { valeur: props.a.slice(0, 1), sorte: props.a.slice(1, 3) };
  return (
    <Flex p={2} sx={{ width: "100%", alignItems: "baseline" }}>
      <Box sx={{ fontFamily: "murmure", fontSize: 36, pr: 1 }}>
        {carte.valeur !== "X" &&
          carte.valeur !== "Y" &&
          carte.valeur !== "0" &&
          carte.valeur}
        {carte.valeur === "0" && "10"}
        {(carte.valeur === "X" || carte.valeur === "Y") && "Joker"}
      </Box>
      <Box sx={{ width: "25px" }}>
        {carte.sorte === "CA" && <CA />}
        {carte.sorte === "CE" && <CE />}
        {carte.sorte === "PI" && <PI />}
        {carte.sorte === "TR" && <TR />}
      </Box>
    </Flex>
  );
};

export const Sorte = (props) => {
  return (
    <Box sx={{ display: "inline-flex", width: "20px", height: "20px", ml: 1 }}>
      {props.sorte === "CA" && <CA />}
      {props.sorte === "CE" && <CE />}
      {props.sorte === "PI" && <PI />}
      {props.sorte === "TR" && <TR />}
    </Box>
  );
};
