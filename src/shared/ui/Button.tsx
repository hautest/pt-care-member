// import {
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   TouchableOpacityProps,
//   ActivityIndicator,
//   Platform,
//   View,
// } from "react-native";

// export interface ButtonProps extends TouchableOpacityProps {
//   variant?: "primary" | "secondary" | "outline" | "ghost";
//   size?: "sm" | "md" | "lg";
//   loading?: boolean;
//   fullWidth?: boolean;
//   leftIcon?: ReactNode;
//   rightIcon?: ReactNode;
// }

// export function Button({
//   children,
//   variant = "primary",
//   size = "md",
//   disabled,
//   loading,
//   fullWidth,
//   leftIcon,
//   rightIcon,
//   style,
//   ...props
// }: ButtonProps) {
//   const { colors } = useColorScheme();

//   const getVariantStyles = () => {
//     switch (variant) {
//       case "secondary":
//         return {
//           backgroundColor: colors.surface.secondary,
//           borderColor: colors.border.primary,
//         };
//       case "outline":
//         return {
//           backgroundColor: "transparent",
//           borderColor: colors.brand.primary,
//           borderWidth: 1,
//         };
//       case "ghost":
//         return {
//           backgroundColor: "transparent",
//         };
//       default:
//         return {
//           backgroundColor: colors.brand.primary,
//         };
//     }
//   };

//   const getSizeStyles = () => {
//     switch (size) {
//       case "sm":
//         return {
//           paddingVertical: 8,
//           paddingHorizontal: 16,
//           borderRadius: 8,
//         };
//       case "lg":
//         return {
//           paddingVertical: 16,
//           paddingHorizontal: 24,
//           borderRadius: 12,
//         };
//       default:
//         return {
//           paddingVertical: 12,
//           paddingHorizontal: 20,
//           borderRadius: 10,
//         };
//     }
//   };

//   const getTextColor = () => {
//     if (disabled) return colors.text.tertiary;
//     switch (variant) {
//       case "outline":
//       case "ghost":
//         return colors.brand.primary;
//       case "secondary":
//         return colors.text.primary;
//       default:
//         return colors.text.inverse;
//     }
//   };

//   const getTextSize = () => {
//     switch (size) {
//       case "sm":
//         return typography.sizes.bodySmall;
//       case "lg":
//         return typography.sizes.bodyLarge;
//       default:
//         return typography.sizes.bodyMedium;
//     }
//   };

//   return (
//     <TouchableOpacity
//       {...props}
//       disabled={disabled || loading}
//       style={[
//         styles.button,
//         getVariantStyles(),
//         getSizeStyles(),
//         fullWidth && styles.fullWidth,
//         disabled && styles.disabled,
//         Platform.select({ web: styles.webButton }),
//         style,
//       ]}
//     >
//       <View style={styles.content}>
//         {leftIcon && !loading && (
//           <View style={styles.leftIcon}>{leftIcon}</View>
//         )}
//         {loading ? (
//           <ActivityIndicator
//             color={
//               variant === "primary" ? colors.text.inverse : colors.brand.primary
//             }
//             size="small"
//           />
//         ) : (
//           <Text
//             style={[
//               styles.text,
//               {
//                 color: getTextColor(),
//                 fontSize: getTextSize(),
//                 fontFamily: typography.families.primarySemiBold,
//                 lineHeight: getLineHeight(
//                   getTextSize(),
//                   typography.lineHeights.tight
//                 ),
//               },
//             ]}
//           >
//             {children}
//           </Text>
//         )}
//         {rightIcon && !loading && (
//           <View style={styles.rightIcon}>{rightIcon}</View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   content: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     textAlign: "center",
//   },
//   disabled: {
//     opacity: 0.5,
//   },
//   fullWidth: {
//     width: "100%",
//   },
//   leftIcon: {
//     marginRight: 8,
//   },
//   rightIcon: {
//     marginLeft: 8,
//   },
//   webButton: {
//     cursor: "pointer",
//   },
// });
