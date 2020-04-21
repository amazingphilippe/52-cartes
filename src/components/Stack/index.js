/** @jsx jsx */
import { forwardRef } from "react";
import { jsx, Flex, Box } from "theme-ui";
import { Children, cloneElement, isValidElement } from "react";

// TODO: Reduce complexity by deprecating isInline and isReversed prop
const Stack = forwardRef(
  (
    {
      direction,
      isInline = false,
      isReversed = false,
      children,
      align,
      justify,
      spacing = 2,
      shouldWrapChildren,
      sx,
      ...rest
    },
    ref
  ) => {
    const _isReversed =
      isReversed || (direction && direction.endsWith("reverse"));
    const _isInline = isInline || (direction && direction.startsWith("row"));
    let _direction;

    if (_isInline) {
      _direction = "row";
    }

    if (_isReversed) {
      _direction = isInline ? "row-reverse" : "column-reverse";
    }

    if (direction) {
      _direction = direction;
    }

    if (!_isInline && !_isReversed && !direction) {
      _direction = "column";
    }

    const validChildrenArray = Children.toArray(children).filter(
      isValidElement
    );

    return (
      <Flex
        sx={{
          alignItems: align,
          justifyContent: justify,
          flexDirection: _direction,
          ...sx,
        }}
        {...rest}
        ref={ref}
      >
        {validChildrenArray.map((child, index) => {
          let isLastChild = validChildrenArray.length === index + 1;
          let spacingProps = _isInline
            ? { [_isReversed ? "ml" : "mr"]: isLastChild ? null : spacing }
            : { [_isReversed ? "mt" : "mb"]: isLastChild ? null : spacing };

          if (shouldWrapChildren) {
            return (
              <Box
                sx={{
                  display: "inline-block",
                  ...spacingProps,
                }}
                key={`stack-box-wrapper-${index}`}
              >
                {child}
              </Box>
            );
          }
          return cloneElement(child, spacingProps);
        })}
      </Flex>
    );
  }
);

export default Stack;
