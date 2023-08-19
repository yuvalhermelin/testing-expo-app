import { Text, StyleSheet } from "react-native";

export default function ({ children }: { children: string }) {
  return <Text style={styles.header}>{children}</Text>;
}

const styles = StyleSheet.create({
  header: {
    color: "black",
    fontSize: 33,
    fontWeight: "700",
    alignSelf: "flex-start",
    marginLeft: "4%",
  },
});
