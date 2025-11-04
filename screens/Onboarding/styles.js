import { StyleSheet, Dimensions } from "react-native";
import theme from "../../constants/theme";

const { width, height } = Dimensions.get("window");

export const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xl,
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: theme.spacing.xl,
    borderRadius: theme.radii.lg,
    overflow: "hidden",
    ...theme.shadows.medium,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: theme.spacing.m,
  },
  body: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.l,
  },
  footer: {
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.l,
    borderRadius: theme.radii.full,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.small,
  },
  buttonText: {
    ...theme.typography.buttonText,
    color: theme.colors.white,
    marginRight: theme.spacing.s,
  },
  progress: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: theme.spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: theme.colors.border,
  },
  activeDot: {
    backgroundColor: theme.colors.primary,
    width: 20,
  },
  skipButton: {
    position: "absolute",
    top: 44,
    right: 16,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
  },
  skipText: {
    ...theme.typography.buttonText,
    color: theme.colors.textSecondary,
  },
});
