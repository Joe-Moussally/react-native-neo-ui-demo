import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Avatar,
  AvatarGroup,
  AvatarSize,
  AvatarVariant,
  Screen,
  ThemeColor,
  ThemeSpacing,
  useTheme,
} from "@joe111/neo-ui";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Codeblock } from "../../../components";

export default function AvatarDemo() {
  const { theme, spacing } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: spacing.lg,
      paddingBottom: spacing.xxl,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: spacing.xl,
      lineHeight: 24,
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: spacing.md,
    },
    exampleContainer: {
      marginBottom: spacing.md,
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0,0,0,0.05)",
    },
    label: {
      marginBottom: spacing.sm,
      fontSize: 14,
    },
    avatarContainer: {
      alignItems: "flex-start",
    },
    rowContainer: {
      flexDirection: "row",
      gap: spacing.md,
      alignItems: "center",
    },
  });

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        {title}
      </Text>
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
      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
        {label}
      </Text>
      <View style={styles.avatarContainer}>{children}</View>
    </View>
  );

  // Sample image URLs for demo (using placeholder images)
  const sampleImages = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  ];

  const renderImageAvatars = () => {
    return (
      <>
        <ExampleContainer label="Image Avatars">
          <View style={styles.rowContainer}>
            <Avatar alt="Remy Sharp" src={sampleImages[0]} />
            <Avatar alt="Travis Howard" src={sampleImages[1]} />
            <Avatar alt="Cindy Baker" src={sampleImages[2]} />
          </View>
        </ExampleContainer>

        <ExampleContainer label="Broken Image Fallback to Initials">
          <View style={styles.rowContainer}>
            <Avatar alt="John Doe" src="https://broken-image.jpg" />
            <Avatar alt="Jane Smith" src="https://invalid-url.png" />
            <Avatar alt="Bob Wilson" src="" />
          </View>
        </ExampleContainer>

        <ExampleContainer label="No alt prop (fallback to icon)">
          <Avatar src="https://broken-image.jpg" />
        </ExampleContainer>

        <Codeblock
          title="Image Avatar Examples"
          code={`// Basic image avatars
<Avatar alt="Remy Sharp" src="https://example.com/avatar1.jpg" />
<Avatar alt="Travis Howard" src="https://example.com/avatar2.jpg" />
<Avatar alt="Cindy Baker" src="https://example.com/avatar3.jpg" />

// Broken image fallback to initials
<Avatar alt="John Doe" src="https://broken-image.jpg" />
<Avatar alt="Jane Smith" src="https://invalid-url.png" />

// No alt prop (fallback to icon)
<Avatar src="https://broken-image.jpg" />`}
        />
      </>
    );
  };

  const renderLetterAvatars = () => {
    return (
      <>
        <ExampleContainer label="Letter Avatars from alt text">
          <View style={styles.rowContainer}>
            <Avatar alt="Kent Dodds" color="primary" />
            <Avatar alt="Jed Watson" color="secondary" />
            <Avatar alt="Tim Neutkens" color="success" />
          </View>
        </ExampleContainer>

        <ExampleContainer label="Single letter initials">
          <View style={styles.rowContainer}>
            <Avatar alt="Alice" color="error" />
            <Avatar alt="Bob" color="warning" />
            <Avatar alt="Charlie" color="info" />
          </View>
        </ExampleContainer>

        <Codeblock
          title="Letter Avatar Examples"
          code={`// Letter avatars from alt text (shows initials)
<Avatar alt="Kent Dodds" color="primary" />
<Avatar alt="Jed Watson" color="secondary" />
<Avatar alt="Tim Neutkens" color="success" />

// Single letter initials
<Avatar alt="Alice" color="error" />
<Avatar alt="Bob" color="warning" />
<Avatar alt="Charlie" color="info" />`}
        />
      </>
    );
  };

  const renderSizeExamples = () => {
    const sizes: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];

    return (
      <>
        <ExampleContainer label="Avatar Sizes">
          <View style={styles.rowContainer}>
            {sizes.map((size) => (
              <Avatar key={size} alt="User" size={size} color="primary" />
            ))}
          </View>
        </ExampleContainer>

        <Codeblock
          title="Avatar Size Examples"
          code={`// Different avatar sizes
<Avatar alt="User" size="xs" color="primary" />
<Avatar alt="User" size="sm" color="primary" />
<Avatar alt="User" size="md" color="primary" />
<Avatar alt="User" size="lg" color="primary" />
<Avatar alt="User" size="xl" color="primary" />`}
        />
      </>
    );
  };

  const renderVariantExamples = () => {
    const variants: AvatarVariant[] = ["circular", "rounded", "square"];

    return (
      <>
        {variants.map((variant) => (
          <ExampleContainer key={variant} label={`variant="${variant}"`}>
            <View style={styles.rowContainer}>
              <Avatar
                alt="John Doe"
                variant={variant}
                color="primary"
                size="lg"
              />
              <Avatar src={sampleImages[0]} variant={variant} size="lg" />
              <Avatar variant={variant} size="lg" color="secondary">
                <Ionicons
                  name="folder"
                  size={28}
                  color={theme.colors.background}
                />
              </Avatar>
            </View>
          </ExampleContainer>
        ))}

        <Codeblock
          title="Avatar Variant Examples"
          code={`// Circular variant (default)
<Avatar alt="John Doe" variant="circular" color="primary" size="lg" />
<Avatar src="https://example.com/avatar.jpg" variant="circular" size="lg" />

// Rounded variant
<Avatar alt="John Doe" variant="rounded" color="primary" size="lg" />
<Avatar src="https://example.com/avatar.jpg" variant="rounded" size="lg" />

// Square variant
<Avatar alt="John Doe" variant="square" color="primary" size="lg" />
<Avatar src="https://example.com/avatar.jpg" variant="square" size="lg" />

// With custom icon content
<Avatar variant="square" size="lg" color="secondary">
  <Ionicons name="folder" size={28} color="white" />
</Avatar>`}
        />
      </>
    );
  };

  const renderColorExamples = () => {
    const colors: ThemeColor[] = [
      "primary",
      "secondary",
      "success",
      "error",
      "warning",
      "info",
    ];

    return (
      <>
        <ExampleContainer label="Background Colors">
          <View style={styles.rowContainer}>
            {colors.map((color) => (
              <Avatar key={color} alt="User" color={color} />
            ))}
          </View>
        </ExampleContainer>

        <Codeblock
          title="Avatar Color Examples"
          code={`// Different background colors
<Avatar alt="User" color="primary" />
<Avatar alt="User" color="secondary" />
<Avatar alt="User" color="success" />
<Avatar alt="User" color="error" />
<Avatar alt="User" color="warning" />
<Avatar alt="User" color="info" />`}
        />
      </>
    );
  };

  const renderIconAvatars = () => {
    return (
      <>
        <ExampleContainer label="Icon Avatars">
          <View style={styles.rowContainer}>
            <Avatar color="primary">
              <Ionicons
                name="folder"
                size={20}
                color={theme.colors.background}
              />
            </Avatar>
            <Avatar color="success">
              <Ionicons
                name="checkmark"
                size={20}
                color={theme.colors.background}
              />
            </Avatar>
            <Avatar color="error">
              <Ionicons
                name="close"
                size={20}
                color={theme.colors.background}
              />
            </Avatar>
          </View>
        </ExampleContainer>

        <Codeblock
          title="Icon Avatar Examples"
          code={`import { Ionicons } from '@expo/vector-icons';

// Icon avatars with custom content
<Avatar color="primary">
  <Ionicons name="folder" size={20} color="white" />
</Avatar>

<Avatar color="success">
  <Ionicons name="checkmark" size={20} color="white" />
</Avatar>

<Avatar color="error">
  <Ionicons name="close" size={20} color="white" />
</Avatar>`}
        />
      </>
    );
  };

  const renderAvatarGroupBasic = () => {
    return (
      <>
        <ExampleContainer label="Basic AvatarGroup (max=4)">
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src={sampleImages[0]} />
            <Avatar alt="Travis Howard" src={sampleImages[1]} />
            <Avatar alt="Cindy Baker" src={sampleImages[2]} />
            <Avatar alt="Agnes Walker" src={sampleImages[3]} />
            <Avatar alt="Trevor Henderson" src={sampleImages[4]} />
          </AvatarGroup>
        </ExampleContainer>

        <ExampleContainer label="All avatars fit (no overflow)">
          <AvatarGroup max={5}>
            <Avatar alt="John Doe" color="primary" />
            <Avatar alt="Jane Smith" color="secondary" />
            <Avatar alt="Bob Wilson" color="success" />
          </AvatarGroup>
        </ExampleContainer>

        <ExampleContainer label="Large overflow (max=2)">
          <AvatarGroup max={2}>
            <Avatar alt="User 1" color="primary" />
            <Avatar alt="User 2" color="secondary" />
            <Avatar alt="User 3" color="success" />
            <Avatar alt="User 4" color="error" />
            <Avatar alt="User 5" color="warning" />
            <Avatar alt="User 6" color="info" />
          </AvatarGroup>
        </ExampleContainer>

        <Codeblock
          title="Basic AvatarGroup Examples"
          code={`// Basic AvatarGroup with max limit
<AvatarGroup max={4}>
  <Avatar alt="Remy Sharp" src="https://example.com/avatar1.jpg" />
  <Avatar alt="Travis Howard" src="https://example.com/avatar2.jpg" />
  <Avatar alt="Cindy Baker" src="https://example.com/avatar3.jpg" />
  <Avatar alt="Agnes Walker" src="https://example.com/avatar4.jpg" />
  <Avatar alt="Trevor Henderson" src="https://example.com/avatar5.jpg" />
</AvatarGroup>

// All avatars fit (no overflow indicator)
<AvatarGroup max={5}>
  <Avatar alt="John Doe" color="primary" />
  <Avatar alt="Jane Smith" color="secondary" />
  <Avatar alt="Bob Wilson" color="success" />
</AvatarGroup>

// Large overflow (shows +4 indicator)
<AvatarGroup max={2}>
  <Avatar alt="User 1" color="primary" />
  <Avatar alt="User 2" color="secondary" />
  <Avatar alt="User 3" color="success" />
  <Avatar alt="User 4" color="error" />
  <Avatar alt="User 5" color="warning" />
  <Avatar alt="User 6" color="info" />
</AvatarGroup>`}
        />
      </>
    );
  };

  const renderAvatarGroupSpacing = () => {
    const spacings: ThemeSpacing[] = ["xs", "sm", "md", "lg"];

    return (
      <>
        {spacings.map((spacing) => (
          <ExampleContainer key={spacing} label={`spacing="${spacing}"`}>
            <AvatarGroup max={4} spacing={spacing}>
              <Avatar alt="User 1" color="primary" />
              <Avatar alt="User 2" color="secondary" />
              <Avatar alt="User 3" color="success" />
              <Avatar alt="User 4" color="error" />
              <Avatar alt="User 5" color="warning" />
            </AvatarGroup>
          </ExampleContainer>
        ))}

        <Codeblock
          title="AvatarGroup Spacing Examples"
          code={`// Different spacing between avatars
<AvatarGroup max={4} spacing="xs">
  <Avatar alt="User 1" color="primary" />
  <Avatar alt="User 2" color="secondary" />
  <Avatar alt="User 3" color="success" />
  <Avatar alt="User 4" color="error" />
  <Avatar alt="User 5" color="warning" />
</AvatarGroup>

<AvatarGroup max={4} spacing="sm">
  {/* ... avatars */}
</AvatarGroup>

<AvatarGroup max={4} spacing="md">
  {/* ... avatars */}
</AvatarGroup>

<AvatarGroup max={4} spacing="lg">
  {/* ... avatars */}
</AvatarGroup>`}
        />
      </>
    );
  };

  const renderAvatarGroupSizes = () => {
    const sizes: AvatarSize[] = ["sm", "md", "lg"];

    return (
      <>
        {sizes.map((size) => (
          <ExampleContainer key={size} label={`Avatar size="${size}"`}>
            <AvatarGroup max={3}>
              <Avatar alt="User 1" src={sampleImages[0]} size={size} />
              <Avatar alt="User 2" src={sampleImages[1]} size={size} />
              <Avatar alt="User 3" src={sampleImages[2]} size={size} />
              <Avatar alt="User 4" color="primary" size={size} />
              <Avatar alt="User 5" color="secondary" size={size} />
            </AvatarGroup>
          </ExampleContainer>
        ))}

        <Codeblock
          title="AvatarGroup Size Examples"
          code={`// Small avatars in group
<AvatarGroup max={3}>
  <Avatar alt="User 1" src="https://example.com/avatar1.jpg" size="sm" />
  <Avatar alt="User 2" src="https://example.com/avatar2.jpg" size="sm" />
  <Avatar alt="User 3" color="primary" size="sm" />
  <Avatar alt="User 4" color="secondary" size="sm" />
</AvatarGroup>

// Medium avatars in group
<AvatarGroup max={3}>
  <Avatar alt="User 1" src="https://example.com/avatar1.jpg" size="md" />
  <Avatar alt="User 2" src="https://example.com/avatar2.jpg" size="md" />
  <Avatar alt="User 3" color="primary" size="md" />
</AvatarGroup>

// Large avatars in group
<AvatarGroup max={3}>
  <Avatar alt="User 1" src="https://example.com/avatar1.jpg" size="lg" />
  <Avatar alt="User 2" src="https://example.com/avatar2.jpg" size="lg" />
  <Avatar alt="User 3" color="primary" size="lg" />
</AvatarGroup>`}
        />
      </>
    );
  };

  const renderMixedExamples = () => {
    return (
      <>
        <ExampleContainer label="Mixed Content Types">
          <AvatarGroup max={4}>
            <Avatar src={sampleImages[0]} alt="Photo User" />
            <Avatar alt="Initial User" color="success" />
            <Avatar color="error">
              <Ionicons name="star" size={20} color={theme.colors.background} />
            </Avatar>
            <Avatar alt="Another User" color="warning" />
            <Avatar src={sampleImages[1]} alt="Photo User 2" />
          </AvatarGroup>
        </ExampleContainer>

        <ExampleContainer label="Different Variants in Group">
          <AvatarGroup max={3} spacing="md">
            <Avatar alt="Circular" variant="circular" color="primary" />
            <Avatar alt="Rounded" variant="rounded" color="secondary" />
            <Avatar alt="Square" variant="square" color="success" />
            <Avatar alt="More" color="error" />
          </AvatarGroup>
        </ExampleContainer>

        <Codeblock
          title="Mixed Content Examples"
          code={`// Mixed content types in AvatarGroup
<AvatarGroup max={4}>
  <Avatar src="https://example.com/photo.jpg" alt="Photo User" />
  <Avatar alt="Initial User" color="success" />
  <Avatar color="error">
    <Ionicons name="star" size={20} color="white" />
  </Avatar>
  <Avatar alt="Another User" color="warning" />
  <Avatar src="https://example.com/photo2.jpg" alt="Photo User 2" />
</AvatarGroup>

// Different variants in group
<AvatarGroup max={3} spacing="md">
  <Avatar alt="Circular" variant="circular" color="primary" />
  <Avatar alt="Rounded" variant="rounded" color="secondary" />
  <Avatar alt="Square" variant="square" color="success" />
  <Avatar alt="More" color="error" />
</AvatarGroup>`}
        />
      </>
    );
  };

  return (
    <Screen title="Avatar">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Avatars are found throughout material design with uses in everything
          from tables to dialog menus.
        </Text>

        <Section title="Basic Usage">
          <Codeblock
            title="Import and Basic Avatar"
            code={`import { Avatar } from '@joe111/neo-ui';

// Basic avatar with initials
<Avatar alt="John Doe" color="primary" />

// Avatar with image
<Avatar alt="John Doe" src="https://example.com/avatar.jpg" />`}
          />
        </Section>

        <Section title="Image Avatars">{renderImageAvatars()}</Section>

        <Section title="Letter Avatars">{renderLetterAvatars()}</Section>

        <Section title="Sizes">{renderSizeExamples()}</Section>

        <Section title="Variants">{renderVariantExamples()}</Section>

        <Section title="Colors">{renderColorExamples()}</Section>

        <Section title="Icon Avatars">{renderIconAvatars()}</Section>

        <Section title="Avatar Group - Basic">
          {renderAvatarGroupBasic()}
        </Section>

        <Section title="Avatar Group - Spacing">
          {renderAvatarGroupSpacing()}
        </Section>

        <Section title="Avatar Group - Sizes">
          {renderAvatarGroupSizes()}
        </Section>

        <Section title="Mixed Examples">{renderMixedExamples()}</Section>
      </ScrollView>
    </Screen>
  );
}
