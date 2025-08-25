import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Dimensions, Platform, useColorScheme } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { darkMapStyle } from '../src/maps/darkMapStyle';

const { width, height } = Dimensions.get('window');

const ReactNativeMapComponent = ({ restaurants = [], onRestaurantSelect, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisineFilter, setSelectedCuisineFilter] = useState('All');

  const mapRef = useRef(null);
  
  const provider = Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined;
  const scheme = useColorScheme();

  // Tbilisi coordinates
  const TBILISI_LAT = 41.7151;
  const TBILISI_LNG = 44.8271;

  // Cuisines array matching the one from HomeScreen
  const cuisines = [
    { id: '1', name: 'Georgian' },
    { id: '2', name: 'Pizza' },
    { id: '3', name: 'Italian' },
    { id: '4', name: 'Brunch' },
    { id: '5', name: 'American' },
    { id: '6', name: 'Sushi' },
    { id: '7', name: 'Ukrainian' },
    { id: '8', name: 'Mexican' },
    { id: '9', name: 'European' },
    { id: '10', name: 'Fine Dining' },
    { id: '11', name: 'Seafood' },
    { id: '12', name: 'Vegetarian' },
    { id: '13', name: 'Vegan' },
    { id: '14', name: 'Indian' },
    { id: '15', name: 'Chinese' },
    { id: '16', name: 'Burgers' },
    { id: '17', name: 'Soups' },
    { id: '18', name: 'Breakfast' },
    { id: '19', name: 'Bakery' },
    { id: '20', name: 'Wine Bar' },
  ];

  // Filter restaurants based on selected cuisine and search query
  const getFilteredRestaurants = () => {
    return restaurants.filter(restaurant => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (restaurant.cuisine && restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (restaurant.tags && restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      // Cuisine filter
      const matchesCuisine = selectedCuisineFilter === 'All' || 
        (restaurant.cuisine && restaurant.cuisine.toLowerCase().includes(selectedCuisineFilter.toLowerCase())) ||
        (restaurant.tags && restaurant.tags.some(tag => tag.toLowerCase().includes(selectedCuisineFilter.toLowerCase())));

      return matchesSearch && matchesCuisine;
    });
  };

  // Generate markers for filtered restaurants
  const generateMarkers = (restaurants) => {
    return restaurants.map((restaurant, index) => {
      // Generate stable coordinates based on restaurant ID for demo
      const seed = restaurant.id.toString().split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      const lat = TBILISI_LAT + (Math.sin(seed) * 0.01);
      const lng = TBILISI_LNG + (Math.cos(seed) * 0.01);
      
      return {
        id: restaurant.id,
        coordinate: { latitude: lat, longitude: lng },
        title: restaurant.name,
        description: restaurant.tags?.filter(tag => !tag.includes('$')).join(', ') || 'Restaurant',
        rating: restaurant.rating || 4.5,
        price: restaurant.tags?.find(tag => tag.includes('$')) || '$$',
        restaurant: restaurant
      };
    });
  };

  const markers = useMemo(() => {
    const filteredRestaurants = getFilteredRestaurants();
    return generateMarkers(filteredRestaurants);
  }, [searchQuery, selectedCuisineFilter, restaurants]);

  const handleMarkerPress = (marker) => {
    if (onRestaurantSelect) {
      onRestaurantSelect({
        restaurantId: marker.id,
        restaurantName: marker.title
      });
    }
  };



  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["rgba(0, 0, 0, 0.9)", "rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.9)"]} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="map" size={28} color="#FF8C00" />
            <Text style={styles.descriptionText}>Discover dining nearby</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#b0b8c1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#b0b8c1" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search restaurants..."
              placeholderTextColor="#b0b8c1"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Cuisine Filter */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cuisineScrollView}>
            {['All', ...cuisines.map(c => c.name)].map(cuisine => (
              <TouchableOpacity
                key={cuisine}
                onPress={() => setSelectedCuisineFilter(cuisine)}
                style={[
                  styles.cuisineFilterButton,
                  selectedCuisineFilter === cuisine && styles.cuisineFilterButtonActive
                ]}
              >
                <Text style={[
                  styles.cuisineFilterText,
                  selectedCuisineFilter === cuisine && styles.cuisineFilterTextActive
                ]}>
                  {cuisine}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Map */}
        <View style={styles.mapContainer}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF8C00" />
              <Text style={styles.loadingText}>Loading map...</Text>
            </View>
          )}
                      <MapView
              ref={mapRef}
              style={styles.map}
              provider={provider}
              initialRegion={{
                latitude: TBILISI_LAT,
                longitude: TBILISI_LNG,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              mapType="standard"
              userInterfaceStyle="dark"
              customMapStyle={Platform.OS === 'android' ? darkMapStyle : []}
              onMapReady={() => setIsLoading(false)}
            >
            {markers.map((marker, index) => (
              <Marker
                key={`${marker.id}-${index}`}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                pinColor="#FF9500"
                onPress={() => handleMarkerPress(marker)}
              />
            ))}
          </MapView>


        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: -20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    padding: 4,
  },
  descriptionText: {
    color: '#b0b8c1',
    fontSize: 16,
    marginLeft: 12,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  cuisineScrollView: {
    marginBottom: 16,
  },
  cuisineFilterButton: {
    backgroundColor: '#404040',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#808080',
  },
  cuisineFilterButtonActive: {
    backgroundColor: '#FF8C00',
  },
  cuisineFilterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'normal',
  },
  cuisineFilterTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    zIndex: 1,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  customMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerPin: {
    width: 24,
    height: 32,
    backgroundColor: '#FF8C00',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    // Create pin shape with triangle bottom
    transform: [{ rotate: '0deg' }],
  },
  markerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

});

export default ReactNativeMapComponent;
