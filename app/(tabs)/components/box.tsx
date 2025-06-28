import {
  Box,
  BoxVariant,
  Screen,
  ThemeColor,
  ThemeSpacing,
  Typography,
  useTheme,
} from "@joe111/neo-ui";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Codeblock } from "../../../components";

// Define examples for demonstration
const VARIANTS: BoxVariant[] = [
  "solid",
  "soft",
  "outline",
  "filledOutline",
  "transparent",
];

const COLORS: ThemeColor[] = [
  "primary",
  "secondary",
  "accent",
  "error",
  "success",
  "warning",
  "info",
];

const SPACINGS: ThemeSpacing[] = ["xs", "sm", "md", "lg", "xl", "xxl"];

export default function BoxScreen() {
  const { theme } = useTheme();

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.section}>
      <Typography variant="h2" style={styles.sectionTitle}>
        {title}
      </Typography>
      {children}
    </View>
  );

  const ExampleContainer = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.exampleContainer}>
      <Typography
        variant="bodySmall"
        color={theme.colors.textSecondary}
        style={styles.label}
      >
        {label}
      </Typography>
      <View style={styles.boxContainer}>{children}</View>
    </View>
  );

  const renderVariantExamples = () => {
    return (
      <>
        {VARIANTS.map((variant) => (
          <ExampleContainer key={variant} label={`variant="${variant}"`}>
            <Box
              variant={variant}
              color={
                variant === "transparent"
                  ? "primary"
                  : variant === "filledOutline"
                  ? "secondary"
                  : "primary"
              }
              padding="md"
              style={
                variant === "transparent"
                  ? { borderWidth: 1, borderColor: theme.colors.border }
                  : undefined
              }
            >
              <Typography
                variant="body"
                color={
                  variant === "solid" ? theme.colors.background : undefined
                }
              >
                {variant === "filledOutline"
                  ? "Filled Outline Box"
                  : variant.charAt(0).toUpperCase() + variant.slice(1) + " Box"}
              </Typography>
            </Box>
          </ExampleContainer>
        ))}

        <Codeblock
          title="Box Variant Examples"
          code={`import { Box, Typography } from '@joe111/neo-ui';

// Solid variant (filled background)
<Box variant="solid" color="primary" padding="md">
  <Typography variant="body" color="white">
    Solid Box
  </Typography>
</Box>

// Soft variant (subtle background)
<Box variant="soft" color="primary" padding="md">
  <Typography variant="body">
    Soft Box
  </Typography>
</Box>

// Outline variant (border only)
<Box variant="outline" color="primary" padding="md">
  <Typography variant="body">
    Outline Box
  </Typography>
</Box>

// Filled outline variant (background + border)
<Box variant="filledOutline" color="secondary" padding="md">
  <Typography variant="body">
    Filled Outline Box
  </Typography>
</Box>

// Transparent variant (no background)
<Box variant="transparent" color="primary" padding="md">
  <Typography variant="body">
    Transparent Box
  </Typography>
</Box>`}
        />
      </>
    );
  };

  const renderColorExamples = () => {
    return (
      <>
        {COLORS.map((color) => (
          <ExampleContainer key={color} label={`color="${color}"`}>
            <Box color={color} variant="solid" padding="sm">
              <Typography variant="bodySmall" color={theme.colors.background}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Typography>
            </Box>
          </ExampleContainer>
        ))}

        <Codeblock
          title="Box Color Examples"
          code={`// Different theme colors
<Box color="primary" variant="solid" padding="sm">
  <Typography variant="bodySmall" color="white">Primary</Typography>
</Box>

<Box color="secondary" variant="solid" padding="sm">
  <Typography variant="bodySmall" color="white">Secondary</Typography>
</Box>

<Box color="accent" variant="solid" padding="sm">
  <Typography variant="bodySmall" color="white">Accent</Typography>
</Box>

<Box color="success" variant="solid" padding="sm">
  <Typography variant="bodySmall" color="white">Success</Typography>
</Box>

<Box color="error" variant="solid" padding="sm">
  <Typography variant="bodySmall" color="white">Error</Typography>
</Box>

<Box color="warning" variant="solid" padding="sm">
  <Typography variant="bodySmall" color="white">Warning</Typography>
</Box>

<Box color="info" variant="solid" padding="sm">
  <Typography variant="bodySmall" color="white">Info</Typography>
</Box>`}
        />
      </>
    );
  };

  const renderBorderRadiusExamples = () => {
    const radiusValues = [0, 4, 8, 12, 16, 24];

    return (
      <>
        {radiusValues.map((radius) => (
          <ExampleContainer key={radius} label={`borderRadius={${radius}}`}>
            <Box
              variant="solid"
              color="accent"
              padding="md"
              borderRadius={radius}
            >
              <Typography variant="bodySmall" color={theme.colors.background}>
                Radius {radius}
              </Typography>
            </Box>
          </ExampleContainer>
        ))}

        <Codeblock
          title="Border Radius Examples"
          code={`// Different border radius values
<Box variant="solid" color="accent" padding="md" borderRadius={0}>
  <Typography variant="bodySmall" color="white">Radius 0</Typography>
</Box>

<Box variant="solid" color="accent" padding="md" borderRadius={4}>
  <Typography variant="bodySmall" color="white">Radius 4</Typography>
</Box>

<Box variant="solid" color="accent" padding="md" borderRadius={8}>
  <Typography variant="bodySmall" color="white">Radius 8</Typography>
</Box>

<Box variant="solid" color="accent" padding="md" borderRadius={12}>
  <Typography variant="bodySmall" color="white">Radius 12</Typography>
</Box>

<Box variant="solid" color="accent" padding="md" borderRadius={16}>
  <Typography variant="bodySmall" color="white">Radius 16</Typography>
</Box>

<Box variant="solid" color="accent" padding="md" borderRadius={24}>
  <Typography variant="bodySmall" color="white">Radius 24</Typography>
</Box>`}
        />
      </>
    );
  };

  const renderPaddingExamples = () => {
    return (
      <>
        {SPACINGS.map((spacing) => (
          <ExampleContainer key={spacing} label={`padding="${spacing}"`}>
            <Box variant="outline" color="primary" padding={spacing}>
              <Typography variant="bodySmall">
                {spacing.toUpperCase()}
              </Typography>
            </Box>
          </ExampleContainer>
        ))}

        <Codeblock
          title="Padding Examples"
          code={`// Different padding sizes
<Box variant="outline" color="primary" padding="xs">
  <Typography variant="bodySmall">XS</Typography>
</Box>

<Box variant="outline" color="primary" padding="sm">
  <Typography variant="bodySmall">SM</Typography>
</Box>

<Box variant="outline" color="primary" padding="md">
  <Typography variant="bodySmall">MD</Typography>
</Box>

<Box variant="outline" color="primary" padding="lg">
  <Typography variant="bodySmall">LG</Typography>
</Box>

<Box variant="outline" color="primary" padding="xl">
  <Typography variant="bodySmall">XL</Typography>
</Box>

<Box variant="outline" color="primary" padding="xxl">
  <Typography variant="bodySmall">XXL</Typography>
</Box>`}
        />
      </>
    );
  };

  const renderMarginExamples = () => {
    return (
      <>
        {SPACINGS.slice(0, 4).map((spacing) => (
          <ExampleContainer key={spacing} label={`margin="${spacing}"`}>
            <View style={styles.marginDemo}>
              <Box variant="soft" color="accent" padding="sm" margin={spacing}>
                <Typography variant="bodySmall">
                  {spacing.toUpperCase()}
                </Typography>
              </Box>
            </View>
          </ExampleContainer>
        ))}

        <Codeblock
          title="Margin Examples"
          code={`// Different margin sizes (shown with background container)
<View style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: 4 }}>
  <Box variant="soft" color="accent" padding="sm" margin="xs">
    <Typography variant="bodySmall">XS</Typography>
  </Box>
</View>

<View style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: 4 }}>
  <Box variant="soft" color="accent" padding="sm" margin="sm">
    <Typography variant="bodySmall">SM</Typography>
  </Box>
</View>

<View style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: 4 }}>
  <Box variant="soft" color="accent" padding="sm" margin="md">
    <Typography variant="bodySmall">MD</Typography>
  </Box>
</View>

<View style={{ backgroundColor: 'rgba(0,0,0,0.05)', padding: 4 }}>
  <Box variant="soft" color="accent" padding="sm" margin="lg">
    <Typography variant="bodySmall">LG</Typography>
  </Box>
</View>`}
        />
      </>
    );
  };

  const renderGapExamples = () => {
    return (
      <>
        {["xs", "sm", "md", "lg"].map((spacing) => (
          <ExampleContainer key={spacing} label={`gap="${spacing}"`}>
            <Box
              variant="outline"
              color="secondary"
              padding="sm"
              gap={spacing as ThemeSpacing}
            >
              <Typography variant="bodySmall">Item 1</Typography>
              <Typography variant="bodySmall">Item 2</Typography>
              <Typography variant="bodySmall">Item 3</Typography>
            </Box>
          </ExampleContainer>
        ))}

        <Codeblock
          title="Gap Examples"
          code={`// Different gap sizes between children
<Box variant="outline" color="secondary" padding="sm" gap="xs">
  <Typography variant="bodySmall">Item 1</Typography>
  <Typography variant="bodySmall">Item 2</Typography>
  <Typography variant="bodySmall">Item 3</Typography>
</Box>

<Box variant="outline" color="secondary" padding="sm" gap="sm">
  <Typography variant="bodySmall">Item 1</Typography>
  <Typography variant="bodySmall">Item 2</Typography>
  <Typography variant="bodySmall">Item 3</Typography>
</Box>

<Box variant="outline" color="secondary" padding="sm" gap="md">
  <Typography variant="bodySmall">Item 1</Typography>
  <Typography variant="bodySmall">Item 2</Typography>
  <Typography variant="bodySmall">Item 3</Typography>
</Box>

<Box variant="outline" color="secondary" padding="sm" gap="lg">
  <Typography variant="bodySmall">Item 1</Typography>
  <Typography variant="bodySmall">Item 2</Typography>
  <Typography variant="bodySmall">Item 3</Typography>
</Box>`}
        />
      </>
    );
  };

  const renderFlexDirectionExamples = () => {
    const directions = ["column", "row", "column-reverse", "row-reverse"];

    return (
      <>
        {directions.map((direction) => (
          <ExampleContainer
            key={direction}
            label={`flexDirection="${direction}"`}
          >
            <Box
              variant="soft"
              color="info"
              padding="sm"
              gap="xs"
              flexDirection={direction as any}
            >
              <Box variant="solid" color="primary" padding="xs">
                <Typography variant="bodySmall" color={theme.colors.background}>
                  1
                </Typography>
              </Box>
              <Box variant="solid" color="secondary" padding="xs">
                <Typography variant="bodySmall" color={theme.colors.background}>
                  2
                </Typography>
              </Box>
              <Box variant="solid" color="accent" padding="xs">
                <Typography variant="bodySmall" color={theme.colors.background}>
                  3
                </Typography>
              </Box>
            </Box>
          </ExampleContainer>
        ))}

        <Codeblock
          title="Flex Direction Examples"
          code={`// Column direction (default)
<Box variant="soft" color="info" padding="sm" gap="xs" flexDirection="column">
  <Box variant="solid" color="primary" padding="xs">
    <Typography variant="bodySmall" color="white">1</Typography>
  </Box>
  <Box variant="solid" color="secondary" padding="xs">
    <Typography variant="bodySmall" color="white">2</Typography>
  </Box>
  <Box variant="solid" color="accent" padding="xs">
    <Typography variant="bodySmall" color="white">3</Typography>
  </Box>
</Box>

// Row direction
<Box variant="soft" color="info" padding="sm" gap="xs" flexDirection="row">
  <Box variant="solid" color="primary" padding="xs">
    <Typography variant="bodySmall" color="white">1</Typography>
  </Box>
  <Box variant="solid" color="secondary" padding="xs">
    <Typography variant="bodySmall" color="white">2</Typography>
  </Box>
  <Box variant="solid" color="accent" padding="xs">
    <Typography variant="bodySmall" color="white">3</Typography>
  </Box>
</Box>

// Column reverse
<Box variant="soft" color="info" padding="sm" gap="xs" flexDirection="column-reverse">
  {/* Items will appear in reverse order */}
</Box>

// Row reverse
<Box variant="soft" color="info" padding="sm" gap="xs" flexDirection="row-reverse">
  {/* Items will appear in reverse order */}
</Box>`}
        />
      </>
    );
  };

  const renderFlexExamples = () => {
    return (
      <>
        {[1, 2, 3].map((flexValue) => (
          <ExampleContainer key={flexValue} label={`flex={${flexValue}}`}>
            <View style={{ flexDirection: "row", height: 60 }}>
              <Box
                variant="solid"
                color="primary"
                padding="xs"
                flex={flexValue}
              >
                <Typography variant="bodySmall" color={theme.colors.background}>
                  Flex {flexValue}
                </Typography>
              </Box>
              <Box variant="solid" color="secondary" padding="xs" flex={1}>
                <Typography variant="bodySmall" color={theme.colors.background}>
                  Flex 1
                </Typography>
              </Box>
            </View>
          </ExampleContainer>
        ))}

        <Codeblock
          title="Flex Examples"
          code={`// Flex values control how much space components take
<View style={{ flexDirection: "row", height: 60 }}>
  <Box variant="solid" color="primary" padding="xs" flex={1}>
    <Typography variant="bodySmall" color="white">Flex 1</Typography>
  </Box>
  <Box variant="solid" color="secondary" padding="xs" flex={1}>
    <Typography variant="bodySmall" color="white">Flex 1</Typography>
  </Box>
</View>

<View style={{ flexDirection: "row", height: 60 }}>
  <Box variant="solid" color="primary" padding="xs" flex={2}>
    <Typography variant="bodySmall" color="white">Flex 2</Typography>
  </Box>
  <Box variant="solid" color="secondary" padding="xs" flex={1}>
    <Typography variant="bodySmall" color="white">Flex 1</Typography>
  </Box>
</View>

<View style={{ flexDirection: "row", height: 60 }}>
  <Box variant="solid" color="primary" padding="xs" flex={3}>
    <Typography variant="bodySmall" color="white">Flex 3</Typography>
  </Box>
  <Box variant="solid" color="secondary" padding="xs" flex={1}>
    <Typography variant="bodySmall" color="white">Flex 1</Typography>
  </Box>
</View>`}
        />
      </>
    );
  };

  const renderCombinedExamples = () => {
    const examples = [
      {
        label: "Card Layout",
        props: {
          variant: "soft" as BoxVariant,
          color: "surface" as ThemeColor,
          padding: "lg" as ThemeSpacing,
          gap: "md" as ThemeSpacing,
          borderRadius: 12,
        },
        content: (
          <>
            <Typography variant="h3">Card Title</Typography>
            <Typography variant="body" color={theme.colors.textSecondary}>
              This is a card layout using the Box component with padding and
              gap.
            </Typography>
            <Box flexDirection="row" gap="sm">
              <Box
                variant="solid"
                color="primary"
                padding="sm"
                flex={1}
                borderRadius={8}
              >
                <Typography variant="bodySmall" color={theme.colors.background}>
                  Action 1
                </Typography>
              </Box>
              <Box
                variant="outline"
                color="secondary"
                padding="sm"
                flex={1}
                borderRadius={8}
              >
                <Typography variant="bodySmall">Action 2</Typography>
              </Box>
            </Box>
          </>
        ),
      },
      {
        label: "Filled Outline Card",
        props: {
          variant: "filledOutline" as BoxVariant,
          color: "primary" as ThemeColor,
          padding: "lg" as ThemeSpacing,
          gap: "md" as ThemeSpacing,
          borderRadius: 16,
        },
        content: (
          <>
            <Typography variant="h3">Filled Outline Style</Typography>
            <Typography variant="body" color={theme.colors.textSecondary}>
              This variant combines surface background with colored border.
            </Typography>
            <Box flexDirection="row" gap="sm">
              <Box
                variant="filledOutline"
                color="success"
                padding="sm"
                flex={1}
                borderRadius={8}
              >
                <Typography variant="bodySmall">Success</Typography>
              </Box>
              <Box
                variant="filledOutline"
                color="error"
                padding="sm"
                flex={1}
                borderRadius={8}
              >
                <Typography variant="bodySmall">Error</Typography>
              </Box>
            </Box>
          </>
        ),
      },
      {
        label: "Alert Box",
        props: {
          variant: "solid" as BoxVariant,
          color: "warning" as ThemeColor,
          padding: "md" as ThemeSpacing,
          gap: "sm" as ThemeSpacing,
          borderRadius: 16,
        },
        content: (
          <>
            <Typography
              variant="bodyLarge"
              weight="semibold"
              color={theme.colors.background}
            >
              Warning!
            </Typography>
            <Typography variant="body" color={theme.colors.background}>
              This is an important message that needs attention.
            </Typography>
          </>
        ),
      },
      {
        label: "Form Section",
        props: {
          variant: "transparent" as BoxVariant,
          color: "primary" as ThemeColor,
          padding: "lg" as ThemeSpacing,
          gap: "md" as ThemeSpacing,
        },
        content: (
          <>
            <Typography variant="h3">Form Section</Typography>
            <Box
              variant="soft"
              color="surface"
              padding="md"
              gap="sm"
              borderRadius={0}
            >
              <Typography variant="body">Field 1</Typography>
              <Typography variant="body">Field 2</Typography>
              <Typography variant="body">Field 3</Typography>
            </Box>
          </>
        ),
      },
    ];

    return (
      <>
        {examples.map((example, index) => (
          <ExampleContainer key={index} label={example.label}>
            <Box {...example.props}>{example.content}</Box>
          </ExampleContainer>
        ))}

        <Codeblock
          title="Combined Layout Examples"
          code={`// Card Layout
<Box
  variant="soft"
  color="surface"
  padding="lg"
  gap="md"
  borderRadius={12}
>
  <Typography variant="h3">Card Title</Typography>
  <Typography variant="body" color={theme.colors.textSecondary}>
    This is a card layout using the Box component with padding and gap.
  </Typography>
  <Box flexDirection="row" gap="sm">
    <Box variant="solid" color="primary" padding="sm" flex={1} borderRadius={8}>
      <Typography variant="bodySmall" color="white">Action 1</Typography>
    </Box>
    <Box variant="outline" color="secondary" padding="sm" flex={1} borderRadius={8}>
      <Typography variant="bodySmall">Action 2</Typography>
    </Box>
  </Box>
</Box>

// Alert Box
<Box
  variant="solid"
  color="warning"
  padding="md"
  gap="sm"
  borderRadius={16}
>
  <Typography variant="bodyLarge" weight="semibold" color="white">
    Warning!
  </Typography>
  <Typography variant="body" color="white">
    This is an important message that needs attention.
  </Typography>
</Box>

// Filled Outline Card
<Box
  variant="filledOutline"
  color="primary"
  padding="lg"
  gap="md"
  borderRadius={16}
>
  <Typography variant="h3">Filled Outline Style</Typography>
  <Typography variant="body" color={theme.colors.textSecondary}>
    This variant combines surface background with colored border.
  </Typography>
  <Box flexDirection="row" gap="sm">
    <Box variant="filledOutline" color="success" padding="sm" flex={1} borderRadius={8}>
      <Typography variant="bodySmall">Success</Typography>
    </Box>
    <Box variant="filledOutline" color="error" padding="sm" flex={1} borderRadius={8}>
      <Typography variant="bodySmall">Error</Typography>
    </Box>
  </Box>
</Box>`}
        />
      </>
    );
  };

  return (
    <Screen title="Box">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Section title="Basic Usage">
          <Codeblock
            title="Import and Basic Box"
            code={`import { Box, Typography } from '@joe111/neo-ui';

// Basic box with content
<Box variant="soft" color="primary" padding="md">
  <Typography variant="body">Box Content</Typography>
</Box>`}
          />
        </Section>

        <Section title="Variants">{renderVariantExamples()}</Section>

        <Section title="Colors">{renderColorExamples()}</Section>

        <Section title="Border Radius">{renderBorderRadiusExamples()}</Section>

        <Section title="Padding">{renderPaddingExamples()}</Section>

        <Section title="Margin">{renderMarginExamples()}</Section>

        <Section title="Gap">{renderGapExamples()}</Section>

        <Section title="Flex Direction">
          {renderFlexDirectionExamples()}
        </Section>

        <Section title="Flex">{renderFlexExamples()}</Section>

        <Section title="Combined Examples">{renderCombinedExamples()}</Section>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  exampleContainer: {
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  label: {
    marginBottom: 4,
  },
  boxContainer: {
    // Basic container for examples
  },
  marginDemo: {
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 4,
    borderRadius: 4,
  },
});
