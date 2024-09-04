import { StyleSheet, Text, TextStyle, type TextProps } from "react-native";

type Variants = "normal" | "title" | "subtitle";

interface PolymorphicTextProps extends TextProps {
    variant?: Variants
    style?: TextStyle
    children: React.ReactNode
};

function PolymorphicText ({
    variant = "normal",
    style,
    children,
    ...props
} : PolymorphicTextProps) {
    return (
        <Text style = {[styles[variant], style]} {...props}>
            {children}
        </Text>
    )
};

const styles = StyleSheet.create({
    normal: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#000"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000"
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "600",
        color: "#000"
    }
});

export default PolymorphicText;