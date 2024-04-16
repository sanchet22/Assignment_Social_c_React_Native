import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const ProductDetail = ({ product }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product Detail</Text>
      <Image
        style={styles.detailThumbnail}
        source={{ uri: product.thumbnail }}
      />
      <Text>{product.title}</Text>
      <Text>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailThumbnail: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default ProductDetail;
