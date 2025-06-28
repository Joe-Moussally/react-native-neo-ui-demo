import { Ionicons } from "@expo/vector-icons";
import {
  Rating,
  RatingSize,
  Screen,
  Typography,
  useTheme,
} from "@joe111/neo-ui";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Codeblock } from "../../../components";

// Define examples for demonstration
const SIZES: RatingSize[] = ["small", "medium", "large"];

export default function RatingScreen() {
  const { theme } = useTheme();
  const [value] = useState<number>(2);
  const [controlledValue, setControlledValue] = useState<number | null>(3);

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
      <View style={styles.ratingContainer}>{children}</View>
    </View>
  );

  const renderBasicExamples = () => {
    return (
      <>
        <ExampleContainer label="Controlled">
          <Rating
            name="simple-controlled"
            value={controlledValue}
            onChange={(event, newValue) => {
              setControlledValue(newValue);
            }}
          />
        </ExampleContainer>
        <ExampleContainer label="Uncontrolled">
          <Rating
            name="simple-uncontrolled"
            onChange={(event, newValue) => {
              console.log(newValue);
            }}
            defaultValue={2}
          />
        </ExampleContainer>
        <ExampleContainer label="Read only">
          <Rating name="read-only" value={value} readOnly />
        </ExampleContainer>
        <ExampleContainer label="Disabled">
          <Rating name="disabled" value={value} disabled />
        </ExampleContainer>
        <ExampleContainer label="No rating given">
          <Rating name="no-value" value={null} />
        </ExampleContainer>
      </>
    );
  };

  const renderSizeExamples = () => {
    return SIZES.map((size) => (
      <ExampleContainer key={size} label={`size="${size}"`}>
        <Rating name={`size-${size}`} defaultValue={2} size={size} />
      </ExampleContainer>
    ));
  };

  const renderCustomIconExamples = () => {
    return (
      <>
        <ExampleContainer label="Custom icon and color">
          <Rating
            name="customized-color"
            defaultValue={2}
            getLabelText={(value: number) =>
              `${value} Heart${value !== 1 ? "s" : ""}`
            }
            icon={<Ionicons name="heart" />}
            emptyIcon={<Ionicons name="heart-outline" />}
          />
        </ExampleContainer>
        <ExampleContainer label="10 stars">
          <Rating name="customized-10" defaultValue={2} max={10} />
        </ExampleContainer>
        <ExampleContainer label="Custom thumbs icon">
          <Rating
            name="customized-thumbs"
            defaultValue={2}
            max={3}
            icon={<Ionicons name="thumbs-up" />}
            emptyIcon={<Ionicons name="thumbs-up-outline" />}
          />
        </ExampleContainer>
      </>
    );
  };

  const renderRadioGroupExample = () => {
    const customIcons: { [index: string]: { icon: string; label: string } } = {
      1: {
        icon: "sad",
        label: "Very Dissatisfied",
      },
      2: {
        icon: "sad-outline",
        label: "Dissatisfied",
      },
      3: {
        icon: "remove",
        label: "Neutral",
      },
      4: {
        icon: "happy-outline",
        label: "Satisfied",
      },
      5: {
        icon: "happy",
        label: "Very Satisfied",
      },
    };

    return (
      <ExampleContainer label="Radio group (highlightSelectedOnly)">
        <Rating
          name="highlight-selected-only"
          defaultValue={2}
          getLabelText={(value: number) => customIcons[value].label}
          highlightSelectedOnly
          icon={<Ionicons name="happy" />}
          emptyIcon={<Ionicons name="happy-outline" />}
        />
      </ExampleContainer>
    );
  };

  const renderCombinedExamples = () => {
    return (
      <>
        <ExampleContainer label="Large + Custom icon">
          <Rating
            name="combined-1"
            defaultValue={4}
            size="large"
            icon={<Ionicons name="star" />}
            emptyIcon={<Ionicons name="star-outline" />}
          />
        </ExampleContainer>
        <ExampleContainer label="Small + Max 3 + Hearts">
          <Rating
            name="combined-2"
            defaultValue={2}
            max={3}
            size="small"
            icon={<Ionicons name="heart" />}
            emptyIcon={<Ionicons name="heart-outline" />}
          />
        </ExampleContainer>
        <ExampleContainer label="Custom + Disabled">
          <Rating
            name="combined-3"
            defaultValue={4}
            disabled
            icon={<Ionicons name="diamond" />}
            emptyIcon={<Ionicons name="diamond-outline" />}
          />
        </ExampleContainer>
      </>
    );
  };

  return (
    <Screen>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Typography variant="h1" style={styles.title}>
          Rating
        </Typography>
        <Typography variant="body" color={theme.colors.textSecondary}>
          Ratings provide insight regarding others&apos; opinions and
          experiences, and can allow the user to submit a rating of their own.
        </Typography>

        <Codeblock
          title="Basic Usage"
          code={`import { Rating } from '@joe111/neo-ui';

// Controlled
const [value, setValue] = useState<number | null>(3);

<Rating
  name="simple-controlled"
  value={value}
  onChange={(event, newValue) => setValue(newValue)}
/>

// Uncontrolled
<Rating
  name="simple-uncontrolled"
  defaultValue={2}
  onChange={(event, newValue) => console.log(newValue)}
/>

// Read only
<Rating name="read-only" value={4} readOnly />`}
        />

        <Section title="Basic Rating">
          <Codeblock
            title="Basic Rating Examples"
            code={`// Controlled rating
const [controlledValue, setControlledValue] = useState<number | null>(3);

<Rating
  name="simple-controlled"
  value={controlledValue}
  onChange={(event, newValue) => {
    setControlledValue(newValue);
  }}
/>

// Uncontrolled rating
<Rating
  name="simple-uncontrolled"
  onChange={(event, newValue) => {
    console.log(newValue);
  }}
  defaultValue={2}
/>

// Read only rating
<Rating name="read-only" value={2} readOnly />

// Disabled rating
<Rating name="disabled" value={2} disabled />

// No rating given
<Rating name="no-value" value={null} />`}
          />
          {renderBasicExamples()}
        </Section>

        <Section title="Sizes">
          <Codeblock
            title="Rating Sizes"
            code={`// Available sizes: small, medium, large
<Rating name="size-small" defaultValue={2} size="small" />
<Rating name="size-medium" defaultValue={2} size="medium" />
<Rating name="size-large" defaultValue={2} size="large" />`}
          />
          {renderSizeExamples()}
        </Section>

        <Section title="Customization">
          <Codeblock
            title="Custom Icons and Settings"
            code={`import { Ionicons } from '@expo/vector-icons';

// Custom icon and color
<Rating
  name="customized-color"
  defaultValue={2}
  getLabelText={(value: number) =>
    \`\${value} Heart\${value !== 1 ? "s" : ""}\`
  }
  icon={<Ionicons name="heart" />}
  emptyIcon={<Ionicons name="heart-outline" />}
/>

// 10 stars instead of default 5
<Rating name="customized-10" defaultValue={2} max={10} />

// Custom thumbs icon with max 3
<Rating
  name="customized-thumbs"
  defaultValue={2}
  max={3}
  icon={<Ionicons name="thumbs-up" />}
  emptyIcon={<Ionicons name="thumbs-up-outline" />}
/>`}
          />
          {renderCustomIconExamples()}
        </Section>

        <Section title="Radio Group">
          <Codeblock
            title="Highlight Selected Only"
            code={`// Radio group behavior - only selected item is highlighted
const customIcons: { [index: string]: { icon: string; label: string } } = {
  1: { icon: "sad", label: "Very Dissatisfied" },
  2: { icon: "sad-outline", label: "Dissatisfied" },
  3: { icon: "remove", label: "Neutral" },
  4: { icon: "happy-outline", label: "Satisfied" },
  5: { icon: "happy", label: "Very Satisfied" },
};

<Rating
  name="highlight-selected-only"
  defaultValue={2}
  getLabelText={(value: number) => customIcons[value].label}
  highlightSelectedOnly
  icon={<Ionicons name="happy" />}
  emptyIcon={<Ionicons name="happy-outline" />}
/>`}
          />
          {renderRadioGroupExample()}
        </Section>

        <Section title="Combined Examples">
          <Codeblock
            title="Advanced Usage"
            code={`// Large size with custom star icons
<Rating
  name="combined-1"
  defaultValue={4}
  size="large"
  icon={<Ionicons name="star" />}
  emptyIcon={<Ionicons name="star-outline" />}
/>

// Small size with max 3 hearts
<Rating
  name="combined-2"
  defaultValue={2}
  max={3}
  size="small"
  icon={<Ionicons name="heart" />}
  emptyIcon={<Ionicons name="heart-outline" />}
/>

// Custom diamond icons with disabled state
<Rating
  name="combined-3"
  defaultValue={4}
  disabled
  icon={<Ionicons name="diamond" />}
  emptyIcon={<Ionicons name="diamond-outline" />}
/>`}
          />
          {renderCombinedExamples()}
        </Section>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 8,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  exampleContainer: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    fontFamily: "monospace",
  },
  ratingContainer: {
    paddingVertical: 8,
  },
});
