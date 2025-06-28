import { useTheme } from "@joe111/neo-ui";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface CodeblockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export const Codeblock: React.FC<CodeblockProps> = ({
  code,
  language = "tsx",
  title,
  showLineNumbers = false,
}) => {
  const { theme } = useTheme();

  const lines = code.trim().split("\n");

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
      color: theme.colors.text,
      fontFamily: "monospace",
      lineHeight: 18,
    },
  });

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
              {lines.map((line, index) => (
                <Text key={index} style={styles.codeLine}>
                  {line || " "}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default Codeblock;
