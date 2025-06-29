import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { Codeblock } from "./Codeblock";

interface LazyCodeblockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  placeholder?: React.ReactNode;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const LazyCodeblock: React.FC<LazyCodeblockProps> = ({
  code,
  language,
  title,
  showLineNumbers,
  placeholder = (
    <View
      style={{ height: 100, backgroundColor: "#f0f0f0", borderRadius: 8 }}
    />
  ),
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  const ref = useRef<View>(null);

  useEffect(() => {
    const checkVisibility = () => {
      if (ref.current) {
        ref.current.measure((x, y, width, height, pageX, pageY) => {
          const screenHeight = SCREEN_HEIGHT;
          const isInViewport = pageY < screenHeight && pageY + height > -100;

          if (isInViewport && !hasRendered) {
            setIsVisible(true);
            setHasRendered(true);
          }
        });
      }
    };

    // Check visibility initially and on scroll
    const timer = setTimeout(checkVisibility, 100);

    return () => clearTimeout(timer);
  }, [hasRendered]);

  return (
    <View ref={ref}>
      {isVisible ? (
        <Codeblock
          code={code}
          language={language}
          title={title}
          showLineNumbers={showLineNumbers}
        />
      ) : (
        placeholder
      )}
    </View>
  );
};
