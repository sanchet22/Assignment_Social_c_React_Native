import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity } from "react-native";

const ProductListingScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [favorites, setFavorites] = useState([]);

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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  const toggleFavorite = (id) => {
    const existingIndex = favorites.findIndex(item => item.id === id);
    if (existingIndex !== -1) {
      // Item already in favorites, remove it
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(existingIndex, 1);
      setFavorites(updatedFavorites);
    } else {
      // Check if maximum limit reached
      if (favorites.length < 5) {
        const productToAdd = products.find(item => item.id === id);
        if (productToAdd) {
          setFavorites([...favorites, productToAdd]);
        }
      } else {
        // Show alert or message that maximum favorites limit reached
        alert("You can only add up to 5 favorites.");
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (minPrice === '' || product.price >= parseInt(minPrice)) &&
    (maxPrice === '' || product.price <= parseInt(maxPrice))
  );

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
      <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={[styles.favoriteButton, { backgroundColor: favorites.some(fav => fav.id === item.id) ? 'yellow' : 'white' }]}>
        <Text>{favorites.some(fav => fav.id === item.id) ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product Listing</Text>
      <TextInput
        style={styles.input}
        placeholder="Search products"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <View style={styles.priceFilterContainer}>
        <TextInput
          style={[styles.input, styles.priceInput]}
          placeholder="Min Price"
          keyboardType="numeric"
          onChangeText={handleMinPriceChange}
          value={minPrice}
        />
        <Text style={styles.priceSeparator}>-</Text>
        <TextInput
          style={[styles.input, styles.priceInput]}
          placeholder="Max Price"
          keyboardType="numeric"
          onChangeText={handleMaxPriceChange}
          value={maxPrice}
        />
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    width: '80%',
  },
  priceFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  priceInput: {
    flex: 1,
    marginRight: 5,
  },
  priceSeparator: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  favoriteButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
  },
});

export default ProductListingScreen;
