import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Screen,
  toast,
  ToastProvider,
  Typography,
  useTheme,
  useToast,
} from "@joe111/neo-ui";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Codeblock } from "../../../components";

function ToastScreenContent() {
  const { theme } = useTheme();
  const { showToast, hideAllToasts } = useToast();
  const [counter, setCounter] = useState(1);

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.section}>
      <Typography
        variant="h2"
        style={[styles.sectionTitle, { color: theme.colors.text }]}
      >
        {title}
      </Typography>
      {children}
    </View>
  );

  const Demo = ({
    title,
    children,
  }: {
    title?: string;
    children: React.ReactNode;
  }) => (
    <View style={[styles.demo, { backgroundColor: theme.colors.surface }]}>
      {title && (
        <Typography
          variant="body"
          style={[styles.demoTitle, { color: theme.colors.textSecondary }]}
        >
          {title}
        </Typography>
      )}
      <View style={styles.demoContent}>{children}</View>
    </View>
  );

  const showLocalToast = () => {
    showToast({
      message: `Local scoped toast ${counter}`,
    });
    setCounter(counter + 1);
  };

  return (
    <Screen title="Toast" options={{ headerLargeTitle: true }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Typography
          variant="body"
          color={theme.colors.textSecondary}
          style={styles.description}
        >
          Display brief, temporary notifications to users. Toasts can be global
          (appear anywhere in your app) or local (scoped to specific
          components).
        </Typography>

        <Codeblock
          title="Basic Usage"
          code={`import { toast } from '@joe111/neo-ui';

// Basic toast
toast.show("Hello World!");

// Variant toasts
toast.success("Operation completed!");
toast.error("Something went wrong");  
toast.warning("Please check your input");
toast.info("New features available");`}
        />

        {/* Global Toast Examples - These work from anywhere in your app */}
        <Section title="Global Toast Examples">
          <Codeblock
            title="Global Toast Methods"
            code={`// Global toast methods work from anywhere in your app
// when RootToastProvider is wrapped around your app root

import { toast } from '@joe111/neo-ui';

// Basic variants
toast.show("Default toast");
toast.success("Success!");
toast.error("Error occurred!");
toast.warning("Warning message");
toast.info("Info notification");

// With position
toast.success("Top success!", { position: "top" });
toast.error("Bottom error!", { position: "bottom" });`}
          />

          <Demo title="Basic Global Toast Variants">
            <Typography
              style={{
                color: theme.colors.textSecondary,
                marginBottom: 12,
                fontSize: 14,
              }}
            >
              Global toast methods work from anywhere in your app when
              RootToastProvider is wrapped around your app root. These toasts
              appear above all content and navigation headers.
            </Typography>
            <View style={styles.row}>
              <Button size="sm" onPress={() => toast.show("Default toast")}>
                Default
              </Button>
              <Button
                size="sm"
                color="success"
                onPress={() => toast.success("Success!")}
              >
                Success
              </Button>
              <Button
                size="sm"
                color="error"
                onPress={() => toast.error("Error occurred!")}
              >
                Error
              </Button>
            </View>
            <View style={styles.row}>
              <Button
                size="sm"
                color="warning"
                onPress={() => toast.warning("Warning message")}
              >
                Warning
              </Button>
              <Button
                size="sm"
                color="primary"
                onPress={() => toast.info("Info notification")}
              >
                Info
              </Button>
            </View>
          </Demo>

          <Demo title="Global Toasts with Position">
            <View style={styles.row}>
              <Button
                size="sm"
                onPress={() =>
                  toast.success("Top success!", { position: "top" })
                }
              >
                Top Success
              </Button>
              <Button
                size="sm"
                color="error"
                onPress={() =>
                  toast.error("Bottom error!", { position: "bottom" })
                }
              >
                Bottom Error
              </Button>
            </View>
          </Demo>

          <Demo title="Global Toasts with Title">
            <View style={styles.column}>
              <Button
                onPress={() => toast.success("Upload completed successfully!")}
              >
                Success Message
              </Button>
              <Button
                variant="outline"
                onPress={() =>
                  toast.warning("This action cannot be undone", {
                    position: "bottom",
                  })
                }
              >
                Warning at Bottom
              </Button>
            </View>
          </Demo>

          <Codeblock
            title="Persistent Toasts"
            code={`// Persistent toast that stays until dismissed
toast.warning("This toast stays until dismissed", {
  duration: "infinite"
});

// Clear all global toasts
toast.hideAll();`}
          />

          <Demo title="Persistent Global Toasts">
            <View style={styles.column}>
              <Button
                variant="outline"
                onPress={() =>
                  toast.warning("This toast stays until dismissed", {
                    duration: "infinite",
                  })
                }
              >
                Persistent Toast
              </Button>
              <Button variant="outline" onPress={() => toast.hideAll()}>
                Clear All Global Toasts
              </Button>
            </View>
          </Demo>
        </Section>

        {/* Interactive Global Toasts */}
        <Section title="Interactive Global Toasts">
          <Codeblock
            title="Toasts with Actions"
            code={`// Toast with action button
toast.success("Changes saved automatically", {
  action: {
    label: "View",
    onPress: () => toast.info("Action button pressed!")
  }
});

// Network error with retry action
toast.error("Network connection lost. Retrying...", {
  duration: "infinite",
  action: {
    label: "Retry", 
    onPress: () => toast.success("Retrying connection...")
  }
});`}
          />

          <Demo title="Global Toasts with Actions">
            <View style={styles.column}>
              <Button
                onPress={() =>
                  toast.success("Changes saved automatically", {
                    action: {
                      label: "View",
                      onPress: () => toast.info("Action button pressed!"),
                    },
                  })
                }
              >
                Toast with Action
              </Button>

              <Button
                variant="outline"
                onPress={() =>
                  toast.error("Network connection lost. Retrying...", {
                    duration: "infinite",
                    action: {
                      label: "Retry",
                      onPress: () => toast.success("Retrying connection..."),
                    },
                  })
                }
              >
                Network Error with Action
              </Button>
            </View>
          </Demo>

          <Codeblock
            title="Advanced Options"
            code={`// Long content with custom duration
toast.info(
  "This is a very long toast message that should wrap to multiple lines and still look good in the UI.",
  { duration: 6000 }
);

// Custom icon
toast.info("Achievement Unlocked! You've earned a gold star!", {
  icon: (
    <Ionicons 
      name="star" 
      size={20} 
      color={theme.colors.warning}
      style={{ marginRight: 12 }}
    />
  )
});

// No close button
toast.info("This toast has no close button", {
  showCloseButton: false,
  duration: 3000
});`}
          />

          <Demo title="Long Content">
            <Button
              onPress={() =>
                toast.info(
                  "This is a very long toast message that should wrap to multiple lines and still look good in the UI. It contains a lot of text to test how the component handles longer content.",
                  { duration: 6000 }
                )
              }
            >
              Show Long Message
            </Button>
          </Demo>

          <Demo title="Custom Icon">
            <Button
              variant="outline"
              onPress={() =>
                toast.info("Achievement Unlocked! You've earned a gold star!", {
                  icon: (
                    <Ionicons
                      name="star"
                      size={20}
                      color={theme.colors.warning}
                      style={{ marginRight: 12 }}
                    />
                  ),
                })
              }
            >
              Custom Icon Toast
            </Button>
          </Demo>

          <Demo title="No Close Button">
            <Button
              variant="outline"
              onPress={() =>
                toast.info("This toast has no close button", {
                  showCloseButton: false,
                  duration: 3000,
                })
              }
            >
              No Close Button
            </Button>
          </Demo>
        </Section>

        {/* Real-world Examples */}
        <Section title="Real-world Examples">
          <Codeblock
            title="Common Use Cases"
            code={`// Save success with action
toast.success("Profile updated successfully", {
  action: { label: "View", onPress: () => {} }
});

// Upload complete
toast.success("File uploaded successfully", {
  position: "bottom"
});

// Confirmation dialog
toast.warning("Are you sure you want to delete this item?", {
  action: {
    label: "Delete",
    onPress: () => toast.success("Item deleted")
  },
  duration: "infinite"
});

// Multiple sequential toasts
for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    const variants = ["info", "warning", "success"] as const;
    const variant = variants[i - 1];
    toast[variant](\`Toast \${i} of 3\`);
  }, i * 500);
}`}
          />

          <Demo title="Common Use Cases">
            <View style={styles.column}>
              <Button
                variant="outline"
                onPress={() =>
                  toast.success("Profile updated successfully", {
                    action: { label: "View", onPress: () => {} },
                  })
                }
              >
                Save Success
              </Button>

              <Button
                variant="outline"
                onPress={() =>
                  toast.success("File uploaded successfully", {
                    position: "bottom",
                  })
                }
              >
                Upload Complete
              </Button>

              <Button
                variant="outline"
                onPress={() =>
                  toast.warning("Are you sure you want to delete this item?", {
                    action: {
                      label: "Delete",
                      onPress: () => toast.success("Item deleted"),
                    },
                    duration: "infinite",
                  })
                }
              >
                Confirmation Dialog
              </Button>
            </View>
          </Demo>

          <Demo title="Multiple Sequential Toasts">
            <Button
              variant="outline"
              onPress={() => {
                // Show multiple toasts in sequence
                for (let i = 1; i <= 3; i++) {
                  setTimeout(() => {
                    const variants = ["info", "warning", "success"] as const;
                    const variant = variants[i - 1];
                    toast[variant](`Toast ${i} of 3`);
                  }, i * 500);
                }
              }}
            >
              Show Multiple Toasts
            </Button>
          </Demo>
        </Section>

        {/* Local Scoped Toast Examples */}
        <Section title="Local Scoped Toast Examples">
          <Codeblock
            title="useToast Hook"
            code={`// Local component toasts using useToast hook
// Only works within components wrapped by ToastProvider

import { useToast } from '@joe111/neo-ui';

function MyComponent() {
  const { showToast, hideAllToasts } = useToast();
  
  const handleClick = () => {
    showToast({
      message: "Local scoped toast",
      variant: "success",
      action: { label: "OK", onPress: () => {} }
    });
  };
  
  return (
    <Button onPress={handleClick}>
      Show Local Toast
    </Button>
  );
}`}
          />

          <Demo title="useToast() hook - Local Component Toasts">
            <Typography
              style={{
                color: theme.colors.textSecondary,
                marginBottom: 12,
                fontSize: 14,
              }}
            >
              These examples use the useToast() hook which only works within
              components that are wrapped by a ToastProvider. The toasts will
              appear in the safe area within the screen bounds, not above
              navigation.
            </Typography>
            <View style={styles.column}>
              <Button onPress={showLocalToast}>Local Scoped Toast</Button>

              <Button
                variant="outline"
                onPress={() =>
                  showToast({
                    message: "This is a local success message",
                    variant: "success",
                    action: { label: "OK", onPress: () => {} },
                  })
                }
              >
                Local Success
              </Button>

              <Button variant="outline" onPress={() => hideAllToasts()}>
                Clear Local Toasts Only
              </Button>
            </View>
          </Demo>
        </Section>

        {/* Setup Examples */}
        <Section title="Setup & Configuration">
          <Codeblock
            title="Root Provider Setup"
            code={`// In your app's root component (_layout.tsx)
import { RootToastProvider } from '@joe111/neo-ui';

export default function RootLayout() {
  return (
    <RootToastProvider>
      {/* Your app content */}
    </RootToastProvider>
  );
}`}
          />

          <Codeblock
            title="Local Provider Setup"
            code={`// For local scoped toasts within specific screens
import { ToastProvider } from '@joe111/neo-ui';

export default function MyScreen() {
  return (
    <ToastProvider maxToasts={5}>
      <MyScreenContent />
    </ToastProvider>
  );
}`}
          />

          <Codeblock
            title="Import Options"
            code={`// Global toast methods
import { toast } from '@joe111/neo-ui';

// Hook for local toasts
import { useToast } from '@joe111/neo-ui';

// Providers
import { 
  RootToastProvider, 
  ToastProvider 
} from '@joe111/neo-ui';`}
          />
        </Section>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </Screen>
  );
}

export default function ToastScreen() {
  return (
    <ToastProvider maxToasts={5}>
      <ToastScreenContent />
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: "600",
  },
  demo: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  demoTitle: {
    marginBottom: 12,
    fontWeight: "500",
  },
  demoContent: {
    // Container for demo content
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 8,
  },
  column: {
    gap: 12,
  },
  codeBlock: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 8,
  },
  bottomPadding: {
    height: 32,
  },
});
