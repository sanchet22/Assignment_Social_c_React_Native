// ProductListingScreen.js
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { setProducts } from '../actions/productActions';

const ProductListingScreen = ({ products, setProducts }) => {
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    const URL = "https://dummyjson.com/products";
    
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Price: ${item.price}</Text>
      <Text>Rating: {item.rating}</Text>
      <Text>Stock: {item.stock}</Text>
      <Image
        style={styles.thumbnail}
        source={{ uri: item.thumbnail }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product Listing</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default connect(mapStateToProps, { setProducts })(ProductListingScreen);
