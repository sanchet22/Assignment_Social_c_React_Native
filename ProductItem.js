import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const ProductItem = ({ product, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
    >
      <Text>{product.title}</Text>
      <Text>{product.description}</Text>
      <Text>Price: ${product.price}</Text>
      <Text>Rating: {product.rating}</Text>
      <Text>Stock: {product.stock}</Text>
      <Image
        style={styles.thumbnail}
        source={{ uri: product.thumbnail }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default ProductItem;
