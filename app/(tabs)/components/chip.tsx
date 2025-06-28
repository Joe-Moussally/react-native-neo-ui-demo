import { Ionicons } from "@expo/vector-icons";
import {
  Chip,
  ChipSize,
  ChipVariant,
  Screen,
  ThemeColor,
  Typography,
  useTheme,
} from "@joe111/neo-ui";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Codeblock } from "../../../components";

// Define examples for demonstration
const VARIANTS: ChipVariant[] = ["solid", "soft", "outline", "ghost"];
const SIZES: ChipSize[] = ["xs", "sm", "md", "lg"];
const COLORS: ThemeColor[] = [
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "error",
  "info",
];

export default function ChipScreen() {
  const { theme } = useTheme();
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [tags, setTags] = useState([
    "React Native",
    "TypeScript",
    "UI Components",
    "Design System",
  ]);

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
      <View style={styles.chipContainer}>{children}</View>
    </View>
  );

  const renderVariantExamples = () => {
    return VARIANTS.map((variant) => (
      <ExampleContainer key={variant} label={`variant="${variant}"`}>
        <Chip
          variant={variant}
          label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Chip`}
        />
      </ExampleContainer>
    ));
  };

  const renderSizeExamples = () => {
    return SIZES.map((size) => (
      <ExampleContainer key={size} label={`size="${size}"`}>
        <Chip size={size} label={`${size.toUpperCase()} Size`} />
      </ExampleContainer>
    ));
  };

  const renderColorExamples = () => {
    return COLORS.map((color) => (
      <ExampleContainer key={color} label={`color="${color}"`}>
        <Chip
          color={color}
          variant="soft"
          label={color.charAt(0).toUpperCase() + color.slice(1)}
        />
      </ExampleContainer>
    ));
  };

  const renderIconExamples = () => {
    const examples = [
      {
        label: "startIcon={<Ionicons />}",
        props: {
          startIcon: <Ionicons name="star" />,
          label: "Featured",
        },
      },
      {
        label: "endIcon={<Ionicons />}",
        props: {
          endIcon: <Ionicons name="chevron-down" />,
          label: "Dropdown",
        },
      },
      {
        label: "Both icons",
        props: {
          startIcon: <Ionicons name="person" />,
          endIcon: <Ionicons name="close" />,
          label: "User Tag",
        },
      },
      {
        label: "deletable={true}",
        props: {
          deletable: true,
          label: "Deletable",
          onDelete: () => console.log("Delete pressed"),
        },
      },
    ];

    return examples.map((example, index) => (
      <ExampleContainer key={index} label={example.label}>
        <Chip {...example.props} />
      </ExampleContainer>
    ));
  };

  const renderStateExamples = () => {
    const states = [
      {
        prop: "disabled={true}",
        disabled: true,
        label: "Disabled",
      },
      {
        prop: "selected={true}",
        selected: true,
        label: "Selected",
      },
    ];

    return states.map((state, index) => (
      <ExampleContainer key={index} label={state.prop}>
        <Chip {...state} />
      </ExampleContainer>
    ));
  };

  const renderInteractiveExamples = () => {
    const toggleSelection = (chipId: string) => {
      setSelectedChips((prev) =>
        prev.includes(chipId)
          ? prev.filter((id) => id !== chipId)
          : [...prev, chipId]
      );
    };

    const removeTag = (tagToRemove: string) => {
      setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
    };

    return (
      <>
        <ExampleContainer label="Interactive Chips">
          <View style={styles.chipsGrid}>
            {["Option 1", "Option 2", "Option 3", "Option 4"].map((option) => (
              <Chip
                key={option}
                label={option}
                variant="outline"
                selected={selectedChips.includes(option)}
                onPress={() => toggleSelection(option)}
                margin="xs"
              />
            ))}
          </View>
        </ExampleContainer>

        <ExampleContainer label="Tag Management">
          <View style={styles.chipsGrid}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                variant="soft"
                color="secondary"
                deletable
                onDelete={() => removeTag(tag)}
                margin="xs"
              />
            ))}
          </View>
        </ExampleContainer>

        <ExampleContainer label="Category Filters">
          <View style={styles.chipsGrid}>
            <Chip
              startIcon={<Ionicons name="code" />}
              label="Development"
              variant="solid"
              color="primary"
              margin="xs"
            />
            <Chip
              startIcon={<Ionicons name="color-palette" />}
              label="Design"
              variant="solid"
              color="accent"
              margin="xs"
            />
            <Chip
              startIcon={<Ionicons name="rocket" />}
              label="Marketing"
              variant="solid"
              color="success"
              margin="xs"
            />
          </View>
        </ExampleContainer>
      </>
    );
  };

  const renderCombinedExamples = () => {
    const examples = [
      {
        label: "User Mention",
        props: {
          startIcon: <Ionicons name="person" />,
          label: "@johndoe",
          variant: "soft" as ChipVariant,
          color: "primary" as ThemeColor,
          size: "sm" as ChipSize,
        },
      },
      {
        label: "Status Badge",
        props: {
          startIcon: <Ionicons name="checkmark-circle" />,
          label: "Completed",
          variant: "solid" as ChipVariant,
          color: "success" as ThemeColor,
          size: "xs" as ChipSize,
        },
      },
      {
        label: "Warning Alert",
        props: {
          startIcon: <Ionicons name="warning" />,
          label: "Attention Required",
          variant: "outline" as ChipVariant,
          color: "warning" as ThemeColor,
          endIcon: <Ionicons name="chevron-forward" />,
        },
      },
    ];

    return examples.map((example, index) => (
      <ExampleContainer key={index} label={example.label}>
        <Chip {...example.props} />
      </ExampleContainer>
    ));
  };

  return (
    <Screen title="Chip">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Typography
          variant="body"
          color={theme.colors.textSecondary}
          style={styles.description}
        >
          Chips are compact elements that represent an input, attribute, or
          action.
        </Typography>

        <Codeblock
          title="Basic Usage"
          code={`import { Chip } from '@joe111/neo-ui';

<Chip label="Basic Chip" />
<Chip label="Primary" variant="solid" color="primary" />
<Chip label="With Icon" startIcon={<Icon name="star" />} />`}
        />

        <Section title="Variants">
          <Codeblock
            title="Variants"
            code={`// Available variants: solid, soft, outline, ghost
<Chip variant="solid" label="Solid Chip" />
<Chip variant="soft" label="Soft Chip" />
<Chip variant="outline" label="Outline Chip" />
<Chip variant="ghost" label="Ghost Chip" />`}
          />
          {renderVariantExamples()}
        </Section>

        <Section title="Sizes">
          <Codeblock
            title="Sizes"
            code={`// Available sizes: xs, sm, md, lg
<Chip size="xs" label="Extra Small" />
<Chip size="sm" label="Small" />
<Chip size="md" label="Medium" />
<Chip size="lg" label="Large" />`}
          />
          {renderSizeExamples()}
        </Section>

        <Section title="Colors">
          <Codeblock
            title="Colors"
            code={`// Available colors: primary, secondary, accent, success, warning, error, info
<Chip color="primary" variant="soft" label="Primary" />
<Chip color="secondary" variant="soft" label="Secondary" />
<Chip color="accent" variant="soft" label="Accent" />
<Chip color="success" variant="soft" label="Success" />
<Chip color="warning" variant="soft" label="Warning" />
<Chip color="error" variant="soft" label="Error" />
<Chip color="info" variant="soft" label="Info" />`}
          />
          {renderColorExamples()}
        </Section>

        <Section title="With Icons">
          <Codeblock
            title="Icons"
            code={`import { Ionicons } from '@expo/vector-icons';

// Start icon
<Chip 
  startIcon={<Ionicons name="star" />} 
  label="Featured" 
/>

// End icon
<Chip 
  endIcon={<Ionicons name="chevron-down" />} 
  label="Dropdown" 
/>

// Both icons
<Chip 
  startIcon={<Ionicons name="person" />}
  endIcon={<Ionicons name="close" />}
  label="User Tag" 
/>

// Deletable chip
<Chip 
  deletable 
  label="Deletable"
  onDelete={() => console.log('Delete pressed')} 
/>`}
          />
          {renderIconExamples()}
        </Section>

        <Section title="States">
          <Codeblock
            title="States"
            code={`// Disabled state
<Chip disabled label="Disabled" />

// Selected state
<Chip selected label="Selected" />`}
          />
          {renderStateExamples()}
        </Section>

        <Section title="Interactive Examples">
          <Codeblock
            title="Interactive Chips"
            code={`const [selectedChips, setSelectedChips] = useState<string[]>([]);

const toggleSelection = (chipId: string) => {
  setSelectedChips(prev => 
    prev.includes(chipId) 
      ? prev.filter(id => id !== chipId)
      : [...prev, chipId]
  );
};

// Interactive selection
<Chip
  label="Option 1"
  variant="outline"
  selected={selectedChips.includes("Option 1")}
  onPress={() => toggleSelection("Option 1")}
  margin="xs"
/>

// Tag management
const [tags, setTags] = useState(['React Native', 'TypeScript']);

const removeTag = (tagToRemove: string) => {
  setTags(prev => prev.filter(tag => tag !== tagToRemove));
};

<Chip
  label={tag}
  variant="soft"
  color="secondary"
  deletable
  onDelete={() => removeTag(tag)}
  margin="xs"
/>`}
          />
          {renderInteractiveExamples()}
        </Section>

        <Section title="Combined Examples">
          <Codeblock
            title="Advanced Usage"
            code={`// User mention
<Chip
  startIcon={<Ionicons name="person" />}
  label="@johndoe"
  variant="soft"
  color="primary"
  size="sm"
/>

// Status badge
<Chip
  startIcon={<Ionicons name="checkmark-circle" />}
  label="Completed"
  variant="solid"
  color="success"
  size="xs"
/>

// Warning alert
<Chip
  startIcon={<Ionicons name="warning" />}
  label="Attention Required"
  variant="outline"
  color="warning"
  endIcon={<Ionicons name="chevron-forward" />}
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
  content: {
    padding: 16,
  },
  description: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  exampleContainer: {
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  label: {
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  chipsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
});
