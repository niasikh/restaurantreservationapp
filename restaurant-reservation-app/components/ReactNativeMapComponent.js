import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Dimensions, Platform, useColorScheme, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { darkMapStyle } from '../src/maps/darkMapStyle';

const { width, height } = Dimensions.get('window');

const ReactNativeMapComponent = ({ restaurants = [], onRestaurantSelect, onClose, setBookingFromRestaurantModal, searchQuery: externalSearchQuery = '', locationQuery: externalLocationQuery = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery);
  const [selectedCuisineFilter, setSelectedCuisineFilter] = useState('All');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [savedRestaurants, setSavedRestaurants] = useState(new Set());
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const mapRef = useRef(null);
  
  const provider = Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined;
  const scheme = useColorScheme();

  // Update internal search query when external one changes
  useEffect(() => {
    setSearchQuery(externalSearchQuery);
  }, [externalSearchQuery]);

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
      // Generate plausible coordinates with natural scatter
      const LAT_JITTER = 0.0075;  // ≈ 830m
      const LNG_JITTER = 0.0100;  // scale long jitter slightly larger for variety
      
      const dx = (Math.random() - 0.5) * 2 * LAT_JITTER;
      const dy = (Math.random() - 0.5) * 2 * LNG_JITTER;
      const lat = TBILISI_LAT + dx;
      const lng = TBILISI_LNG + dy;
      
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
  }, [searchQuery, selectedCuisineFilter, restaurants, externalSearchQuery]);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker.restaurant);
  };

  const toggleBookmark = (restaurantId) => {
    setSavedRestaurants(prev => {
      const newSet = new Set(prev);
      if (newSet.has(restaurantId)) {
        newSet.delete(restaurantId);
      } else {
        newSet.add(restaurantId);
      }
      return newSet;
    });
  };

  const generateSuggestions = (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    const filtered = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
      (restaurant.cuisine && restaurant.cuisine.toLowerCase().includes(query.toLowerCase())) ||
      (restaurant.tags && restaurant.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
    );
    
    setSuggestions(filtered.slice(0, 5));
    setShowSuggestions(true);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    generateSuggestions(text);
  };

  const handleSuggestionSelect = (restaurant) => {
    setSearchQuery(restaurant.name);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const getRestaurantDescription = (restaurantName) => {
    const descriptions = {
      'Coffee Shop Company': 'Cozy coffee shop serving delicious brunch and specialty coffee. Perfect spot for morning meetings or casual dining with friends.',
      'Apotheka Bar': 'Unique apotheka-style wine bar with a vintage atmosphere and curated wine collection. Experience wine tasting in a historical setting.',
      'Alubali': 'Traditional Georgian restaurant serving authentic local cuisine. Experience the rich flavors and warm hospitality of Georgia in a cozy atmosphere.',
      'Monday Greens': 'Elegant European cafe with beautiful outdoor seating. Perfect for brunch, coffee, and light meals in a sophisticated atmosphere.',
      '8000 Vintages': 'Exclusive wine merchants with rare and premium wines. Experience curated wine tastings in an elegant setting.',
      'Canape': 'Sophisticated European restaurant offering refined cuisine and elegant dining experience. Perfect for special occasions and romantic dinners.',
      'Sadzvele': 'Cozy wine hub with local and international wines. Experience authentic Georgian wine culture in a warm, welcoming atmosphere.',
      'Wine Not': 'Unique apotheka-style wine bar with vintage atmosphere. Discover rare wines and enjoy intimate tastings in a charming setting.',
      'Bachata Gardens': 'Beautiful garden restaurant with European cuisine. Enjoy al fresco dining surrounded by lush greenery and romantic ambiance.',
      'Littera': 'Modern Georgian cuisine in an intimate romantic atmosphere. Experience innovative dishes with traditional Georgian flavors.',
      'Filini Terrace': 'Italian classics and cocktails with a skyline backdrop. Enjoy authentic Italian cuisine with breathtaking city views.',
      'Paragraph': 'Explore Georgian culture in contemporary luxury setting in the heart of Tbilisi. Experience sophisticated dining with stunning city views and authentic local flavors.',
      'Golden Tulip': 'Grilled favorites and open-air seating under the sky. Enjoy delicious grilled dishes in a relaxed rooftop atmosphere.',
      'Keto & Kote': 'Charming outdoor Georgian restaurant serving traditional dishes. Enjoy authentic local cuisine in a relaxed garden setting.',
      'Sofiko': 'Enjoy outstanding views with dishes inspired by the timeless culture of Tbilisi city. Experience authentic Georgian flavors with modern rooftop dining.',
      'Monograph Terrace': 'Trendy rooftop bar with creative drinks and city lights. Enjoy innovative cocktails and contemporary cuisine with stunning urban views.',
      'Atmosphere Bar': 'Fusion cuisine, crafted drinks, and city views. Experience innovative Asian fusion dishes with expertly crafted cocktails.',
      'Casa Fiori': 'Sophisticated modern Italian restaurant with craft cocktails. Experience contemporary Italian cuisine in an elegant romantic setting.',
      'Ambrosiano': 'Authentic Italian restaurant serving Italy\'s finest artisan dishes. Experience classic Italian cuisine in a romantic atmosphere.',
      'Madre': 'Authentic Spanish restaurant with cozy romantic atmosphere. Perfect for date nights with traditional Spanish flavors.',
      'Strada': 'International restaurant offering diverse global cuisine. Experience flavors from around the world in a welcoming atmosphere.',
      'Tiflis Veranda': 'Enjoy exquisite dishes, live music, and mesmerizing views with local wines. Experience fine dining with spectacular city panoramas.',
      'Khedi': 'Authentic Georgian restaurant serving traditional dishes. Experience the rich flavors and warm hospitality of Georgian cuisine.',
      'Wine Merchants': 'Premium wine bar offering curated selection of local and international wines. Experience expert wine tastings in an elegant atmosphere.',
      'Lolita': 'Trendy restaurant serving New American cuisine with Italian influences. Enjoy creative cocktails and modern dishes in a vibrant atmosphere.',
      'Rooms Tbilisi': 'Sophisticated restaurant offering modern American cuisine with Nordic influences. Experience farm-to-table dining in an elegant setting.',
      'Honoré': 'Elegant restaurant combining Georgian and European flavors with barbecue specialties. Enjoy craft cocktails and refined dining experience.'
    };
    return descriptions[restaurantName];
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
              onChangeText={handleSearchChange}
            />
          </View>
          
          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map((restaurant, index) => (
                <TouchableOpacity
                  key={`suggestion-${restaurant.id}-${index}`}
                  style={styles.suggestionItem}
                  onPress={() => handleSuggestionSelect(restaurant)}
                >
                  <Text style={styles.suggestionText}>{restaurant.name}</Text>
                  <Text style={styles.suggestionSubtext}>
                    {restaurant.tags?.filter(tag => !tag.includes('$')).join(', ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
                key={`rest-${marker.id}-${index}`}
                identifier={`rest-${marker.id}-${index}`}
                coordinate={marker.coordinate}
                pinColor="#FF9500"
                onPress={() => handleMarkerPress(marker)}
              />
            ))}
          </MapView>

          {/* Restaurant Popup */}
          {selectedMarker && (
            <React.Fragment key={`popup-${selectedMarker.id}`}>
              <View style={styles.popupContainer}>
                <View style={styles.popup}>
                  <Image
                    source={selectedMarker.image}
                    resizeMode="cover"
                    style={styles.popupImage}
                  />
                  <View style={styles.popupContent}>
                    <View style={styles.popupHeader}>
                      <Text style={styles.popupTitle}>{selectedMarker.name}</Text>
                      <TouchableOpacity 
                        style={styles.bookmarkButton}
                        onPress={() => toggleBookmark(selectedMarker.id)}
                      >
                        <Ionicons 
                          name={savedRestaurants.has(selectedMarker.id) ? "bookmark" : "bookmark-outline"} 
                          size={20} 
                          color="#FF8C00" 
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.popupDescription}>
                      {getRestaurantDescription(selectedMarker.name) || 
                       selectedMarker.tags?.filter(tag => !tag.includes('$') && tag.length > 5).join(', ') ||
                       selectedMarker.cuisine ||
                       'Restaurant'}
                    </Text>
                    <View style={styles.popupFooter}>
                      <View style={styles.popupInfo}>
                        <Text style={styles.popupPrice}>
                          {selectedMarker.tags?.find(tag => tag.includes('$'))}
                        </Text>
                        <View style={styles.popupRating}>
                          <Text style={styles.stars}>★★★★★</Text>
                          <Text style={styles.ratingText}>{selectedMarker.rating}</Text>
                        </View>
                      </View>
                      <TouchableOpacity 
                        style={styles.bookButton}
                        onPress={() => {
                          if (setBookingFromRestaurantModal) {
                            setBookingFromRestaurantModal(true);
                          }
                          if (onRestaurantSelect) {
                            onRestaurantSelect({
                              restaurantId: selectedMarker.id,
                              restaurantName: selectedMarker.name
                            });
                          }
                        }}
                      >
                        <Text style={styles.bookButtonText}>Book a Table</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.closePopup}
                  onPress={() => setSelectedMarker(null)}
                >
                  <Ionicons name="close" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}


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
    marginLeft: 10,
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
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    zIndex: 1000,
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
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
    zIndex: 999,
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
    marginTop: 100,
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
  popupContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  popupImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  popupContent: {
    flex: 1,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  popupTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginBottom: 0,
  },
  bookmarkButton: {
    padding: 4,
  },
  popupDescription: {
    color: '#b0b8c1',
    fontSize: 14,
    marginTop: 0,
    marginBottom: 4,
  },
  popupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    paddingRight: 8,
  },
  popupPrice: {
    color: '#b0b8c1',
    fontSize: 14,
    fontWeight: 'bold',
  },
  popupRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stars: {
    color: '#FFD700',
    fontSize: 14,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#FF8C00',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  closePopup: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    maxHeight: 200,
    zIndex: 9999,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  suggestionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  suggestionSubtext: {
    color: '#b0b8c1',
    fontSize: 14,
    marginTop: 2,
  },
});

export default ReactNativeMapComponent;
