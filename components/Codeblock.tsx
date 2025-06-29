import { useTheme } from "@joe111/neo-ui";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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

// Language definitions
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

// Simple tokenizer for JavaScript/TypeScript-like languages
const tokenize = (code: string, language: string): Token[] => {
  const tokens: Token[] = [];
  const keywords =
    LANGUAGE_KEYWORDS[language as keyof typeof LANGUAGE_KEYWORDS] ||
    LANGUAGE_KEYWORDS.javascript;

  // Enhanced regex patterns with better JSX attribute detection
  const patterns = {
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

  let remaining = code;
  let position = 0;

  while (remaining.length > 0) {
    let matched = false;

    // Check each pattern in order of priority
    for (const [type, pattern] of Object.entries(patterns)) {
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
        position += matchedText.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Add unmatched character as text
      tokens.push({ type: "text", value: remaining[0] });
      remaining = remaining.slice(1);
      position += 1;
    }
  }

  return tokens;
};

export const Codeblock: React.FC<CodeblockProps> = ({
  code,
  language = "tsx",
  title,
  showLineNumbers = false,
}) => {
  const { theme } = useTheme();

  const lines = code.trim().split("\n");

  // Theme-aware syntax highlighting colors inspired by Palenight
  // Better theme detection - check if background is lighter or darker
  const isDark = (() => {
    const bg = theme.colors.background;
    const text = theme.colors.text;

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
    if (bg.startsWith("#")) {
      return getLuminance(bg) < 0.5;
    }

    // Fallback: check common dark theme colors or text color
    return (
      bg.toLowerCase().includes("dark") ||
      bg === "#000000" ||
      bg === "#121212" ||
      bg === "#1a1a1a" ||
      bg === "#2d2d2d" ||
      text === "#FFFFFF" ||
      text === "#ffffff" ||
      text === "#fff"
    );
  })();

  const syntaxColors = {
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
    text: theme.colors.text, // Default text color
  };

  const styles = StyleSheet.create({
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
    title: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.text,
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
  });

  const renderHighlightedLine = (line: string, lineIndex: number) => {
    if (!line.trim()) {
      return (
        <View key={lineIndex} style={styles.codeLine}>
          <Text style={[styles.token, { color: theme.colors.text }]}> </Text>
        </View>
      );
    }

    const tokens = tokenize(line, language);

    return (
      <View key={lineIndex} style={styles.codeLine}>
        {tokens.map((token, tokenIndex) => (
          <Text
            key={`${lineIndex}-${tokenIndex}`}
            style={[
              styles.token,
              { color: syntaxColors[token.type] || theme.colors.text },
            ]}
          >
            {token.value}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {(title || language) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          <Text style={styles.language}>{language}</Text>
        </View>
      )}
      <ScrollView
        style={styles.scrollView}
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
          <View style={styles.codeContainer}>
            {showLineNumbers && (
              <View style={styles.lineNumbers}>
                {lines.map((_, index) => (
                  <Text key={index} style={styles.lineNumber}>
                    {index + 1}
                  </Text>
                ))}
              </View>
            )}
            <View style={styles.codeContent}>
              {lines.map((line, index) => renderHighlightedLine(line, index))}
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default Codeblock;
