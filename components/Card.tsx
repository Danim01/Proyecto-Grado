import { Link, LinkProps } from "expo-router";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface CardProps {
  title: string,
  link: LinkProps["href"]
}

export function Card({ title, link }: CardProps) {
  return (
    <ThemedView>
      <Link href={link}>
        <ThemedText type='title'>{title}</ThemedText>
      </Link>
    </ThemedView>
  )
}