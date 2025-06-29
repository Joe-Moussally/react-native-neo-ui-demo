import { useTheme } from "@joe111/neo-ui";
import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface CodeblockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

// Token types for syntax highlighting
type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "operator"
  | "punctuation"
  | "function"
  | "variable"
  | "property"
  | "tag"
  | "attribute"
  | "text";

interface Token {
  type: TokenType;
  value: string;
}

// Language definitions - moved outside and memoized
const LANGUAGE_KEYWORDS = {
  javascript: [
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "do",
    "break",
    "continue",
    "switch",
    "case",
    "default",
    "try",
    "catch",
    "finally",
    "throw",
    "new",
    "this",
    "super",
    "class",
    "extends",
    "import",
    "export",
    "from",
    "as",
    "default",
    "async",
    "await",
    "true",
    "false",
    "null",
    "undefined",
    "typeof",
    "instanceof",
    "in",
    "of",
  ],
  typescript: [
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "do",
    "break",
    "continue",
    "switch",
    "case",
    "default",
    "try",
    "catch",
    "finally",
    "throw",
    "new",
    "this",
    "super",
    "class",
    "extends",
    "import",
    "export",
    "from",
    "as",
    "default",
    "async",
    "await",
    "true",
    "false",
    "null",
    "undefined",
    "typeof",
    "instanceof",
    "in",
    "of",
    "interface",
    "type",
    "enum",
    "public",
    "private",
    "protected",
    "readonly",
    "static",
    "abstract",
    "implements",
    "namespace",
    "declare",
  ],
  jsx: [
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "do",
    "break",
    "continue",
    "switch",
    "case",
    "default",
    "try",
    "catch",
    "finally",
    "throw",
    "new",
    "this",
    "super",
    "class",
    "extends",
    "import",
    "export",
    "from",
    "as",
    "default",
    "async",
    "await",
    "true",
    "false",
    "null",
    "undefined",
    "typeof",
    "instanceof",
    "in",
    "of",
    "React",
  ],
  tsx: [
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "do",
    "break",
    "continue",
    "switch",
    "case",
    "default",
    "try",
    "catch",
    "finally",
    "throw",
    "new",
    "this",
    "super",
    "class",
    "extends",
    "import",
    "export",
    "from",
    "as",
    "default",
    "async",
    "await",
    "true",
    "false",
    "null",
    "undefined",
    "typeof",
    "instanceof",
    "in",
    "of",
    "interface",
    "type",
    "enum",
    "public",
    "private",
    "protected",
    "readonly",
    "static",
    "abstract",
    "implements",
    "namespace",
    "declare",
    "React",
  ],
};

// Memoized patterns to avoid recreation
const PATTERNS = {
  comment: /\/\/.*|\/\*[\s\S]*?\*\//,
  string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/,
  number: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
  jsxTag: /<\/?[A-Za-z][A-Za-z0-9]*(?=[\s>\/])/,
  jsxAttribute: /\b[a-zA-Z][a-zA-Z0-9]*(?=\s*=)/,
  function: /\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()/,
  property: /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/,
  operator: /[+\-*/%=!<>&|^~?:]+|&&|\|\|/,
  punctuation: /[{}[\]();,<>\/]/,
  word: /\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/,
  whitespace: /\s+/,
};

// Memoized tokenizer with better performance
const tokenizeCode = (code: string, language: string): Token[] => {
  const tokens: Token[] = [];
  const keywords =
    LANGUAGE_KEYWORDS[language as keyof typeof LANGUAGE_KEYWORDS] ||
    LANGUAGE_KEYWORDS.javascript;

  let remaining = code;

  while (remaining.length > 0) {
    let matched = false;

    // Check each pattern in order of priority
    for (const [type, pattern] of Object.entries(PATTERNS)) {
      const match = remaining.match(pattern);
      if (match && match.index === 0) {
        const matchedText = match[0];

        if (type === "word") {
          // Check if it's a keyword
          if (keywords.includes(matchedText)) {
            tokens.push({ type: "keyword", value: matchedText });
          } else {
            tokens.push({ type: "variable", value: matchedText });
          }
        } else if (type === "property") {
          // For property access, add the dot as punctuation and property name
          tokens.push({ type: "punctuation", value: "." });
          tokens.push({ type: "property", value: match[1] });
        } else if (type === "jsxTag") {
          tokens.push({ type: "tag", value: matchedText });
        } else if (type === "jsxAttribute") {
          tokens.push({ type: "attribute", value: matchedText });
        } else if (type === "whitespace") {
          tokens.push({ type: "text", value: matchedText });
        } else {
          tokens.push({ type: type as TokenType, value: matchedText });
        }

        remaining = remaining.slice(matchedText.length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Add unmatched character as text
      tokens.push({ type: "text", value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
};

// Memoized theme detection function
const getIsDarkTheme = (
  backgroundColor: string,
  textColor: string
): boolean => {
  // Convert hex to RGB and calculate luminance
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const getLuminance = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;

    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // If we can calculate luminance, use that
  if (backgroundColor.startsWith("#")) {
    return getLuminance(backgroundColor) < 0.5;
  }

  // Fallback: check common dark theme colors or text color
  return (
    backgroundColor.toLowerCase().includes("dark") ||
    backgroundColor === "#000000" ||
    backgroundColor === "#121212" ||
    backgroundColor === "#1a1a1a" ||
    backgroundColor === "#2d2d2d" ||
    textColor === "#FFFFFF" ||
    textColor === "#ffffff" ||
    textColor === "#fff"
  );
};

// Memoized syntax colors calculation
const getSyntaxColors = (isDark: boolean, textColor: string) => ({
  keyword: isDark ? "#C792EA" : "#6B46C1", // Purple - keywords (const, let, function)
  string: isDark ? "#C3E88D" : "#16A34A", // Green - strings
  comment: isDark ? "#546E7A" : "#64748B", // Muted gray - comments
  number: isDark ? "#F78C6C" : "#DC2626", // Orange/Red - numbers
  operator: isDark ? "#89DDFF" : "#0EA5E9", // Cyan/Blue - operators (+, -, =)
  punctuation: isDark ? "#89DDFF" : "#475569", // Cyan/Gray - punctuation ({, }, [, ])
  function: isDark ? "#82AAFF" : "#2563EB", // Blue - function names
  variable: isDark ? "#EEFFFF" : "#1F2937", // Light/Dark - variable names
  property: isDark ? "#F07178" : "#BE185D", // Pink/Magenta - object properties
  tag: isDark ? "#F07178" : "#DC2626", // Pink/Red - JSX tags (<div>)
  attribute: isDark ? "#FFCB6B" : "#CA8A04", // Yellow/Amber - JSX attributes (className, onClick)
  text: textColor, // Default text color
});

export const Codeblock: React.FC<CodeblockProps> = React.memo(
  ({ code, language = "tsx", title, showLineNumbers = false }) => {
    const { theme } = useTheme();
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Animation values
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    const modalOpacity = useSharedValue(0);

    // Memoize expensive calculations
    const lines = useMemo(() => code.trim().split("\n"), [code]);

    const isDark = useMemo(
      () => getIsDarkTheme(theme.colors.background, theme.colors.text),
      [theme.colors.background, theme.colors.text]
    );

    const syntaxColors = useMemo(
      () => getSyntaxColors(isDark, theme.colors.text),
      [isDark, theme.colors.text]
    );

    // Memoize tokenized lines
    const tokenizedLines = useMemo(
      () => lines.map((line) => tokenizeCode(line, language)),
      [lines, language]
    );

    const openFullscreen = useCallback(() => {
      setIsFullscreen(true);
      scale.value = withSpring(0.95, { damping: 15 });
      opacity.value = withTiming(0.8, { duration: 200 });
      modalOpacity.value = withTiming(1, { duration: 300 });
    }, [scale, opacity, modalOpacity]);

    const closeFullscreen = useCallback(() => {
      modalOpacity.value = withTiming(0, { duration: 200 });
      scale.value = withSpring(1, { damping: 15 });
      opacity.value = withTiming(1, { duration: 200 });

      // Close modal after animation
      setTimeout(() => {
        runOnJS(setIsFullscreen)(false);
      }, 200);
    }, [modalOpacity, scale, opacity]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
      };
    });

    const modalAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: modalOpacity.value,
      };
    });

    // Memoize styles to prevent recreation
    const styles = useMemo(
      () =>
        StyleSheet.create({
          container: {
            backgroundColor: theme.colors.surface,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.colors.border,
            marginVertical: 8,
            overflow: "hidden",
          },
          header: {
            backgroundColor: theme.colors.surfaceVariant,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          leftHeader: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          },
          title: {
            fontSize: 14,
            fontWeight: "600",
            color: theme.colors.text,
            marginRight: 8,
          },
          language: {
            fontSize: 12,
            color: theme.colors.textSecondary,
            backgroundColor: theme.colors.background,
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 4,
            fontFamily: "monospace",
          },
          viewCodeButton: {
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
            flexDirection: "row",
            alignItems: "center",
          },
          viewCodeButtonText: {
            fontSize: 12,
            fontWeight: "600",
            color: theme.colors.background,
          },
          scrollView: {
            maxHeight: 300,
          },
          codeContainer: {
            flexDirection: "row",
            padding: 12,
          },
          lineNumbers: {
            paddingRight: 12,
            borderRightWidth: 1,
            borderRightColor: theme.colors.border,
            marginRight: 12,
          },
          lineNumber: {
            fontSize: 12,
            color: theme.colors.textSecondary,
            fontFamily: "monospace",
            lineHeight: 18,
            textAlign: "right",
            minWidth: 20,
          },
          codeContent: {
            flex: 1,
          },
          codeLine: {
            fontSize: 12,
            fontFamily: "monospace",
            lineHeight: 18,
            flexDirection: "row",
            flexWrap: "wrap",
          },
          token: {
            fontSize: 12,
            fontFamily: "monospace",
          },
          // Fullscreen styles
          modalOverlay: {
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            justifyContent: "center",
            alignItems: "center",
          },
          fullscreenContainer: {
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            backgroundColor: theme.colors.surface,
            paddingTop: StatusBar.currentHeight || 44,
          },
          fullscreenHeader: {
            backgroundColor: theme.colors.surfaceVariant,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          fullscreenTitle: {
            fontSize: 18,
            fontWeight: "600",
            color: theme.colors.text,
          },
          closeButton: {
            backgroundColor: theme.colors.error,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
          },
          closeButtonText: {
            fontSize: 14,
            fontWeight: "600",
            color: theme.colors.background,
          },
          fullscreenScrollView: {
            flex: 1,
          },
          fullscreenCodeContainer: {
            flexDirection: "row",
            padding: 16,
            minHeight: "100%",
          },
          fullscreenLineNumbers: {
            paddingRight: 16,
            borderRightWidth: 1,
            borderRightColor: theme.colors.border,
            marginRight: 16,
          },
          fullscreenLineNumber: {
            fontSize: 14,
            color: theme.colors.textSecondary,
            fontFamily: "monospace",
            lineHeight: 22,
            textAlign: "right",
            minWidth: 30,
          },
          fullscreenCodeContent: {
            flex: 1,
          },
          fullscreenCodeLine: {
            fontSize: 14,
            fontFamily: "monospace",
            lineHeight: 22,
            flexDirection: "row",
            flexWrap: "wrap",
          },
          fullscreenToken: {
            fontSize: 14,
            fontFamily: "monospace",
          },
        }),
      [theme]
    );

    // Memoized render function for highlighted lines
    const renderHighlightedLine = useCallback(
      (tokens: Token[], lineIndex: number, isFullscreenMode = false) => {
        if (!tokens.length) {
          return (
            <View
              key={lineIndex}
              style={
                isFullscreenMode ? styles.fullscreenCodeLine : styles.codeLine
              }
            >
              <Text
                style={[
                  isFullscreenMode ? styles.fullscreenToken : styles.token,
                  { color: theme.colors.text },
                ]}
              >
                {" "}
              </Text>
            </View>
          );
        }

        return (
          <View
            key={lineIndex}
            style={
              isFullscreenMode ? styles.fullscreenCodeLine : styles.codeLine
            }
          >
            {tokens.map((token, tokenIndex) => (
              <Text
                key={`${lineIndex}-${tokenIndex}`}
                style={[
                  isFullscreenMode ? styles.fullscreenToken : styles.token,
                  { color: syntaxColors[token.type] || theme.colors.text },
                ]}
              >
                {token.value}
              </Text>
            ))}
          </View>
        );
      },
      [styles, syntaxColors, theme.colors.text]
    );

    const renderCodeContent = useCallback(
      (isFullscreenMode = false) => (
        <ScrollView
          style={
            isFullscreenMode ? styles.fullscreenScrollView : styles.scrollView
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          <ScrollView
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            <View
              style={
                isFullscreenMode
                  ? styles.fullscreenCodeContainer
                  : styles.codeContainer
              }
            >
              {showLineNumbers && (
                <View
                  style={
                    isFullscreenMode
                      ? styles.fullscreenLineNumbers
                      : styles.lineNumbers
                  }
                >
                  {lines.map((_, index) => (
                    <Text
                      key={index}
                      style={
                        isFullscreenMode
                          ? styles.fullscreenLineNumber
                          : styles.lineNumber
                      }
                    >
                      {index + 1}
                    </Text>
                  ))}
                </View>
              )}
              <View
                style={
                  isFullscreenMode
                    ? styles.fullscreenCodeContent
                    : styles.codeContent
                }
              >
                {tokenizedLines.map((tokens, index) =>
                  renderHighlightedLine(tokens, index, isFullscreenMode)
                )}
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      ),
      [styles, showLineNumbers, lines, tokenizedLines, renderHighlightedLine]
    );

    return (
      <>
        <Animated.View style={[styles.container, animatedStyle]}>
          <View style={styles.header}>
            <View style={styles.leftHeader}>
              {title && <Text style={styles.title}>{title}</Text>}
              <Text style={styles.language}>{language.toUpperCase()}</Text>
            </View>
            <TouchableOpacity
              style={styles.viewCodeButton}
              onPress={openFullscreen}
            >
              <Text style={styles.viewCodeButtonText}>View Code</Text>
            </TouchableOpacity>
          </View>
          {renderCodeContent(false)}
        </Animated.View>

        <Modal
          visible={isFullscreen}
          animationType="none"
          statusBarTranslucent
          onRequestClose={closeFullscreen}
        >
          <Animated.View style={[styles.modalOverlay, modalAnimatedStyle]}>
            <View style={styles.fullscreenContainer}>
              <View style={styles.fullscreenHeader}>
                <View style={styles.leftHeader}>
                  <Text style={styles.fullscreenTitle}>
                    {title || "Code Preview"} • {language.toUpperCase()}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeFullscreen}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
              {renderCodeContent(true)}
            </View>
          </Animated.View>
        </Modal>
      </>
    );
  }
);

export default Codeblock;
