import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const MapComponent = ({ restaurants = [], onRestaurantSelect, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mapType, setMapType] = useState('leaflet'); // Using Leaflet only - no API key required
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisineFilter, setSelectedCuisineFilter] = useState('All');
  const [mapKey, setMapKey] = useState(0); // Key to force WebView reload
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const webViewRef = useRef(null);

  // Reload map when filters change
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [selectedCuisineFilter, searchQuery]);

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

  // Tbilisi coordinates
  const TBILISI_LAT = 41.7151;
  const TBILISI_LNG = 44.8271;

  // Generate search suggestions
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

    const uniqueSuggestions = filtered.slice(0, 5).map(restaurant => ({
      id: restaurant.id,
      name: restaurant.name,
      cuisine: restaurant.cuisine || '',
      tags: restaurant.tags || []
    }));

    setSuggestions(uniqueSuggestions);
    setShowSuggestions(true);
  };

  // Handle search input change
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    generateSuggestions(text);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    setSelectedCuisineFilter('All'); // Reset cuisine filter when selecting a restaurant
  };

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
  const generateMarkers = () => {
    const filteredRestaurants = getFilteredRestaurants();
    return filteredRestaurants.map((restaurant, index) => {
      // Generate random coordinates around Tbilisi for demo
      const lat = TBILISI_LAT + (Math.random() - 0.5) * 0.02;
      const lng = TBILISI_LNG + (Math.random() - 0.5) * 0.02;
      
      // Generate stars based on rating
      const rating = restaurant.rating || 4.0;
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      
      let starsHTML = '';
      for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span style="color: #FFD700; font-size: 14px;">★</span>';
      }
      if (hasHalfStar) {
        starsHTML += '<span style="color: #FFD700; font-size: 14px;">☆</span>';
      }
      for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span style="color: #ccc; font-size: 14px;">☆</span>';
      }
      
      // Get restaurant description
      let description = 'Delicious food and great atmosphere';
      if (restaurant.cuisine) {
        description = `${restaurant.cuisine} cuisine with excellent service`;
      }
      if (restaurant.tags && restaurant.tags.length > 0) {
        const tagDescriptions = restaurant.tags.filter(tag => !tag.includes('$')).join(', ');
        if (tagDescriptions) {
          description = tagDescriptions;
        }
      }
      
      return {
        id: restaurant.id,
        name: restaurant.name,
        lat: lat,
        lng: lng,
        rating: restaurant.rating || 4.5,
        price: restaurant.tags?.find(tag => tag.includes('$')) || '$$',
        description: description,
        starsHTML: starsHTML
      };
    });
  };

  // Generate markers data
  const markersData = (() => {
    try {
      return generateMarkers();
    } catch (error) {
      console.warn('Error generating markers:', error);
      return [];
    }
  })();

  // Leaflet HTML (Free alternative)
  const getLeafletHTML = () => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <style>
        body { margin: 0; padding: 0; }
        #map { width: 100%; height: 100vh; }
        .restaurant-popup {
          font-family: Arial, sans-serif;
          background: #1a1a1a !important;
          color: white;
          padding: 12px;
          border-radius: 8px;
          min-width: 200px;
          border: none !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
        }
        .leaflet-popup-content-wrapper {
          background: #1a1a1a !important;
          border: none !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
        }
        .leaflet-popup-tip {
          background: #1a1a1a !important;
        }
        .restaurant-image {
          width: 100%;
          height: 80px;
          border-radius: 8px;
          margin-bottom: 12px;
          object-fit: cover;
        }
        .restaurant-name {
          font-weight: bold;
          margin-bottom: 3px;
          color: white;
        }
        .restaurant-rating {
          color: #FFD700;
          font-size: 14px;
          margin-top: 3px;
        }
        .restaurant-price-line {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          gap: 8px;
        }
        .restaurant-price {
          color: #b0b8c1;
          font-size: 12px;
        }
        .restaurant-description {
          color: #b0b8c1;
          font-size: 11px;
          font-style: italic;
        }
        .book-now-btn {
          background: #FF8C00;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
          margin-top: 8px;
        }
        .book-now-btn:hover {
          background: #e67e00;
        }
        
        /* Professional map controls styling */
        
        .leaflet-control-zoom {
          border: 1px solid #333 !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
        }
        
        .leaflet-control-zoom a {
          background: rgba(26, 26, 26, 0.9) !important;
          border: 1px solid #333 !important;
          color: #fff !important;
          font-weight: bold !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: rgba(255, 140, 0, 0.8) !important;
          color: #000 !important;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        let map;
        let currentMarkers = [];
        
        function initMap() {
          map = L.map('map', {
            zoomControl: true,
            maxZoom: 18,
            minZoom: 10,
            zoomSnap: 0.5,
            zoomDelta: 0.5,
            wheelPxPerZoomLevel: 60
          }).setView([${TBILISI_LAT}, ${TBILISI_LNG}], 13);
          
          // Professional map style like OpenTable - clear streets and readable names
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
          }).addTo(map);
          
          // Add satellite overlay layer (always visible)
          L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri',
            maxZoom: 18,
            opacity: 0.3
          }).addTo(map);
          
          updateMarkers();
        }
        
        function updateMarkers() {
          // Clear existing markers
          currentMarkers.forEach(marker => map.removeLayer(marker));
          currentMarkers = [];
          
          const markers = ${JSON.stringify(markersData)};
          
          markers.forEach((marker) => {
            const customIcon = L.divIcon({
              className: 'custom-marker',
              html: \`
                <div style="
                  width: 24px;
                  height: 24px;
                  background: #FF8C00;
                  border: 2px solid white;
                  border-radius: 50%;
                  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                "></div>
              \`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            });

            const leafletMarker = L.marker([marker.lat, marker.lng], { icon: customIcon }).addTo(map);
            currentMarkers.push(leafletMarker);
            
            leafletMarker.bindPopup(\`
              <div class="restaurant-popup">
                <div class="restaurant-name">\${marker.name}</div>
                <div class="restaurant-price-line">
                  <span class="restaurant-price">\${marker.price}</span>
                  <span class="restaurant-description">\${marker.description}</span>
                </div>
                <div class="restaurant-rating">\${marker.starsHTML} <span style="color: #FFD700; font-size: 12px; margin-left: 4px;">\${marker.rating}</span></div>
                <button class="book-now-btn" onclick="bookRestaurant('\${marker.id}', '\${marker.name}')">
                  Book Now
                </button>
              </div>
            \`);

            leafletMarker.on('click', () => {
              // Just open the popup, don't send message to React Native
              console.log('Marker clicked:', marker.name);
            });
          });
        }
        
        // Function to handle booking from popup
        window.bookRestaurant = function(restaurantId, restaurantName) {
          // Send message to React Native to open booking modal
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'book_restaurant',
            restaurantId: restaurantId,
            restaurantName: restaurantName
          }));
        };
        
        // Function to handle bookmark toggle
        window.toggleBookmark = function(restaurantId) {
          // Send message to React Native to toggle bookmark
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'toggle_bookmark',
            restaurantId: restaurantId
          }));
        };
        
        // Listen for filter updates from React Native
        window.updateMapFilters = function() {
          updateMarkers();
        };
        
        initMap();
      </script>
    </body>
    </html>
  `;

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'restaurant_selected') {
        // Don't call onRestaurantSelect - let the popup handle it
        console.log('Restaurant selected:', data.restaurantName);
      } else if (data.type === 'book_restaurant' && onRestaurantSelect) {
        // Handle booking request from popup
        onRestaurantSelect(data);
      }
    } catch (error) {
      console.log('Error parsing message:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["rgba(0, 0, 0, 0.9)", "rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.9)"]} style={styles.gradient}>
        <TouchableOpacity 
          style={{ flex: 1 }} 
          activeOpacity={1} 
          onPress={() => setShowSuggestions(false)}
        >
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
              onFocus={() => {
                if (searchQuery.trim()) {
                  setShowSuggestions(true);
                }
              }}
            />
          </View>
          
          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              <ScrollView style={styles.suggestionsList} showsVerticalScrollIndicator={false}>
                {suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={`${suggestion.id}-${index}`}
                    style={styles.suggestionItem}
                    onPress={() => handleSuggestionSelect(suggestion)}
                  >
                    <View style={styles.suggestionContent}>
                      <Text style={styles.suggestionName}>{suggestion.name}</Text>
                      <Text style={styles.suggestionDetails}>
                        {suggestion.cuisine && `${suggestion.cuisine} • `}
                        {suggestion.tags && suggestion.tags.filter(tag => !tag.includes('$')).join(' • ')}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#b0b8c1" />
                  </TouchableOpacity>
                ))}
              </ScrollView>
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
          <WebView
            key={mapKey}
            ref={webViewRef}
            source={{ html: getLeafletHTML() }}
            style={styles.webview}
            onLoad={() => setIsLoading(false)}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
            onMessage={handleMessage}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
          />
                  </View>
        </TouchableOpacity>
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
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    marginTop: 4,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  suggestionDetails: {
    color: '#b0b8c1',
    fontSize: 12,
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
  },
  webview: {
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
});

export default MapComponent;
