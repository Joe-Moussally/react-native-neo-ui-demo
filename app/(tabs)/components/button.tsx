import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  ButtonColorKey,
  ButtonSize,
  ButtonVariant,
  Screen,
  Typography,
  useTheme,
} from "@joe111/neo-ui";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Codeblock } from "../../../components";

// Define examples for demonstration - Fixed to only include valid variants
const VARIANTS: ButtonVariant[] = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "soft",
  "text",
];

const SIZES: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"];

const COLORS: ButtonColorKey[] = [
  "primary",
  "secondary",
  "accent",
  "error",
  "success",
  "warning",
  "info",
];

export default function ButtonScreen() {
  const { theme } = useTheme();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const toggleLoading = (key: string) => {
    setLoadingStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    // Auto-reset loading after 2 seconds
    setTimeout(() => {
      setLoadingStates((prev) => ({
        ...prev,
        [key]: false,
      }));
    }, 2000);
  };

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
      <View style={styles.buttonContainer}>{children}</View>
    </View>
  );

  const renderVariantExamples = () => {
    return VARIANTS.map((variant) => (
      <ExampleContainer key={variant} label={`variant="${variant}"`}>
        <Button variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      </ExampleContainer>
    ));
  };

  const renderSizeExamples = () => {
    return SIZES.map((size) => (
      <ExampleContainer key={size} label={`size="${size}"`}>
        <Button size={size}>{size.toUpperCase()}</Button>
      </ExampleContainer>
    ));
  };

  const renderColorExamples = () => {
    return COLORS.map((color) => (
      <ExampleContainer key={color} label={`color="${color}"`}>
        <Button color={color}>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Button>
      </ExampleContainer>
    ));
  };

  const renderStateExamples = () => {
    return [
      { prop: "disabled={true}", disabled: true },
      { prop: "loading={true}", loading: true },
      { prop: "fullWidth={true}", fullWidth: true },
      { prop: "hapticsDisabled={true}", hapticsDisabled: true },
    ].map((state, index) => (
      <ExampleContainer key={index} label={state.prop}>
        <Button {...state}>
          {state.disabled
            ? "Disabled"
            : state.loading
            ? "Loading"
            : state.fullWidth
            ? "Full Width"
            : "No Haptics"}
        </Button>
      </ExampleContainer>
    ));
  };

  const renderIconExamples = () => {
    return [
      {
        label: "startIcon={<Icon />}",
        props: {
          startIcon: <Ionicons name="mail" size={16} />,
        },
        text: "Email",
      },
      {
        label: "endIcon={<Icon />}",
        props: {
          endIcon: <Ionicons name="arrow-forward" size={16} />,
        },
        text: "Next",
      },
      {
        label: "startIcon={<Icon />} endIcon={<Icon />}",
        props: {
          startIcon: <Ionicons name="settings" size={16} />,
          endIcon: <Ionicons name="flash" size={16} />,
        },
        text: "Settings",
      },
    ].map((example, index) => (
      <ExampleContainer key={index} label={example.label}>
        <Button {...example.props}>{example.text}</Button>
      </ExampleContainer>
    ));
  };

  const renderIconButtonExamples = () => {
    return [
      {
        label: "Icon Button - Primary",
        props: {
          variant: "primary" as ButtonVariant,
          size: "md" as ButtonSize,
          style: { aspectRatio: 1, minWidth: 42 },
        },
        icon: <Ionicons name="person" size={20} />,
      },
      {
        label: "Icon Button - Outline",
        props: {
          variant: "outline" as ButtonVariant,
          size: "sm" as ButtonSize,
          style: { aspectRatio: 1, minWidth: 34 },
        },
        icon: <Ionicons name="settings" size={16} />,
      },
      {
        label: "Icon Button - Ghost",
        props: {
          variant: "ghost" as ButtonVariant,
          size: "lg" as ButtonSize,
          style: { aspectRatio: 1, minWidth: 50 },
        },
        icon: <Ionicons name="heart" size={24} />,
      },
      {
        label: "Icon Button - Soft",
        props: {
          variant: "soft" as ButtonVariant,
          size: "md" as ButtonSize,
          style: { aspectRatio: 1, minWidth: 42 },
        },
        icon: <Ionicons name="star" size={20} />,
      },
      {
        label: "Icon Button - Error Color",
        props: {
          variant: "primary" as ButtonVariant,
          color: "error" as ButtonColorKey,
          size: "sm" as ButtonSize,
          style: { aspectRatio: 1, minWidth: 34 },
        },
        icon: <Ionicons name="close" size={16} />,
      },
    ].map((example, index) => (
      <ExampleContainer key={index} label={example.label}>
        <Button {...example.props}>{example.icon}</Button>
      </ExampleContainer>
    ));
  };

  const renderIconButtonSizeExamples = () => {
    return SIZES.map((size) => {
      const iconSizes = {
        xs: 12,
        sm: 16,
        md: 20,
        lg: 24,
        xl: 28,
      };

      const minWidths = {
        xs: 26,
        sm: 34,
        md: 42,
        lg: 50,
        xl: 58,
      };

      return (
        <ExampleContainer key={size} label={`Icon Button size="${size}"`}>
          <Button
            variant="primary"
            size={size}
            style={{
              aspectRatio: 1,
              minWidth: minWidths[size],
            }}
          >
            <Ionicons name="add" size={iconSizes[size]} />
          </Button>
        </ExampleContainer>
      );
    });
  };

  const renderCombinedExamples = () => {
    const examples = [
      {
        variant: "primary",
        size: "lg",
        color: "success",
        desc: "Large Success Primary",
      },
      {
        variant: "outline",
        size: "sm",
        color: "error",
        desc: "Small Error Outline",
      },
      {
        variant: "ghost",
        size: "md",
        color: "info",
        desc: "Medium Info Ghost",
      },
    ];

    return examples.map((ex, index) => (
      <ExampleContainer
        key={index}
        label={`variant="${ex.variant}" size="${ex.size}" color="${ex.color}"`}
      >
        <Button
          variant={ex.variant as ButtonVariant}
          size={ex.size as ButtonSize}
          color={ex.color as ButtonColorKey}
        >
          {ex.desc}
        </Button>
      </ExampleContainer>
    ));
  };

  return (
    <Screen title="Button">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Section title="Basic Usage">
          <Codeblock
            title="Import and Basic Button"
            code={`import { Button } from '@joe111/neo-ui';

<Button>Click me</Button>`}
          />
        </Section>

        <Section title="Variants">
          {renderVariantExamples()}
          <Codeblock
            title="Variant Examples"
            code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="soft">Soft</Button>
<Button variant="text">Text</Button>`}
          />
        </Section>

        <Section title="Variants with Colors">
          <ExampleContainer label="Soft variants with different colors">
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              <Button variant="soft" color="error">
                Soft Error
              </Button>
              <Button variant="soft" color="success">
                Soft Success
              </Button>
              <Button variant="soft" color="warning">
                Soft Warning
              </Button>
              <Button variant="soft" color="info">
                Soft Info
              </Button>
            </View>
          </ExampleContainer>

          <ExampleContainer label="Outline variants with different colors">
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              <Button variant="outline" color="error">
                Outline Error
              </Button>
              <Button variant="outline" color="success">
                Outline Success
              </Button>
              <Button variant="outline" color="warning">
                Outline Warning
              </Button>
              <Button variant="outline" color="info">
                Outline Info
              </Button>
            </View>
          </ExampleContainer>

          <ExampleContainer label="Ghost variants with different colors">
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              <Button variant="ghost" color="error">
                Ghost Error
              </Button>
              <Button variant="ghost" color="success">
                Ghost Success
              </Button>
              <Button variant="ghost" color="warning">
                Ghost Warning
              </Button>
              <Button variant="ghost" color="accent">
                Ghost Accent
              </Button>
            </View>
          </ExampleContainer>

          <ExampleContainer label="Text variants with different colors">
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              <Button variant="text" color="error">
                Text Error
              </Button>
              <Button variant="text" color="success">
                Text Success
              </Button>
              <Button variant="text" color="warning">
                Text Warning
              </Button>
              <Button variant="text" color="secondary">
                Text Secondary
              </Button>
            </View>
          </ExampleContainer>

          <Codeblock
            title="Variant + Color Combinations"
            code={`// Soft variants with semantic colors
<Button variant="soft" color="error">Soft Error</Button>
<Button variant="soft" color="success">Soft Success</Button>
<Button variant="soft" color="warning">Soft Warning</Button>
<Button variant="soft" color="info">Soft Info</Button>

// Outline variants with semantic colors
<Button variant="outline" color="error">Outline Error</Button>
<Button variant="outline" color="success">Outline Success</Button>
<Button variant="outline" color="warning">Outline Warning</Button>
<Button variant="outline" color="info">Outline Info</Button>

// Ghost variants with different colors
<Button variant="ghost" color="error">Ghost Error</Button>
<Button variant="ghost" color="success">Ghost Success</Button>
<Button variant="ghost" color="warning">Ghost Warning</Button>
<Button variant="ghost" color="accent">Ghost Accent</Button>

// Text variants with different colors
<Button variant="text" color="error">Text Error</Button>
<Button variant="text" color="success">Text Success</Button>
<Button variant="text" color="warning">Text Warning</Button>
<Button variant="text" color="secondary">Text Secondary</Button>`}
          />
        </Section>

        <Section title="Sizes">
          {renderSizeExamples()}
          <Codeblock
            title="Size Examples"
            code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
          />
        </Section>

        <Section title="Colors">
          {renderColorExamples()}
          <Codeblock
            title="Color Examples"
            code={`<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="accent">Accent</Button>
<Button color="error">Error</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="info">Info</Button>`}
          />
        </Section>

        <Section title="States">
          {renderStateExamples()}
          <Codeblock
            title="State Examples"
            code={`<Button disabled={true}>Disabled</Button>
<Button loading={true}>Loading</Button>
<Button fullWidth={true}>Full Width</Button>
<Button hapticsDisabled={true}>No Haptics</Button>`}
          />
        </Section>

        <Section title="With Icons">
          {renderIconExamples()}
          <Codeblock
            title="Icon Examples"
            code={`import { Ionicons } from '@expo/vector-icons';

<Button startIcon={<Ionicons name="mail" size={16} />}>
  Email
</Button>

<Button endIcon={<Ionicons name="arrow-forward" size={16} />}>
  Next
</Button>

<Button 
  startIcon={<Ionicons name="settings" size={16} />}
  endIcon={<Ionicons name="flash" size={16} />}
>
  Settings
</Button>`}
          />
        </Section>

        <Section title="Icon Buttons">
          {renderIconButtonExamples()}
          <Codeblock
            title="Icon Button Examples"
            code={`// Icon buttons with square aspect ratio
<Button 
  variant="primary" 
  size="md" 
  style={{ aspectRatio: 1, minWidth: 42 }}
>
  <Ionicons name="person" size={20} />
</Button>

<Button 
  variant="outline" 
  size="sm" 
  style={{ aspectRatio: 1, minWidth: 34 }}
>
  <Ionicons name="settings" size={16} />
</Button>`}
          />
        </Section>

        <Section title="Icon Button Sizes">
          {renderIconButtonSizeExamples()}
          <Codeblock
            title="Icon Button Size Examples"
            code={`// Different sizes with appropriate icon sizes
<Button variant="primary" size="xs" style={{ aspectRatio: 1, minWidth: 26 }}>
  <Ionicons name="add" size={12} />
</Button>

<Button variant="primary" size="sm" style={{ aspectRatio: 1, minWidth: 34 }}>
  <Ionicons name="add" size={16} />
</Button>

<Button variant="primary" size="md" style={{ aspectRatio: 1, minWidth: 42 }}>
  <Ionicons name="add" size={20} />
</Button>`}
          />
        </Section>

        <Section title="Combined Examples">
          {renderCombinedExamples()}
          <Codeblock
            title="Combined Props Examples"
            code={`// Combining variant, size, and color
<Button variant="primary" size="lg" color="success">
  Large Success Primary
</Button>

<Button variant="outline" size="sm" color="error">
  Small Error Outline
</Button>

<Button variant="ghost" size="md" color="info">
  Medium Info Ghost
</Button>`}
          />
        </Section>

        <Section title="Interactive Examples">
          <ExampleContainer label="Interactive Loading Button">
            <Button
              variant="primary"
              loading={loadingStates.save}
              onPress={() => toggleLoading("save")}
              startIcon={
                !loadingStates.save ? (
                  <Ionicons name="save" size={16} />
                ) : undefined
              }
            >
              {loadingStates.save ? "Saving..." : "Save Document"}
            </Button>
          </ExampleContainer>

          <ExampleContainer label="Interactive Error Button">
            <Button
              variant="primary"
              color="error"
              loading={loadingStates.delete}
              onPress={() => toggleLoading("delete")}
              startIcon={
                !loadingStates.delete ? (
                  <Ionicons name="trash" size={16} />
                ) : undefined
              }
            >
              {loadingStates.delete ? "Deleting..." : "Delete Item"}
            </Button>
          </ExampleContainer>

          <ExampleContainer label="Full Width Submit Button">
            <Button
              variant="primary"
              color="success"
              size="lg"
              loading={loadingStates.submit}
              onPress={() => toggleLoading("submit")}
              fullWidth
            >
              {loadingStates.submit ? "Submitting..." : "Submit Form"}
            </Button>
          </ExampleContainer>

          <Codeblock
            title="Interactive Button Examples"
            code={`const [loading, setLoading] = useState(false);

const handlePress = () => {
  setLoading(true);
  // Simulate async operation
  setTimeout(() => setLoading(false), 2000);
};

<Button
  variant="primary"
  loading={loading}
  onPress={handlePress}
  startIcon={!loading ? <Ionicons name="save" size={16} /> : undefined}
>
  {loading ? "Saving..." : "Save Document"}
</Button>`}
          />
        </Section>
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
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
});
