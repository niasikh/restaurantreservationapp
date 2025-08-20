import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput, FlatList, SafeAreaView, Dimensions, StyleSheet, Animated, Pressable, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import CuisineResultsModal from './CuisineResultsModal';
import { COUNTRIES } from './countries';

const { width } = Dimensions.get('window');

const restaurants = [
  {
    id: '2',
    name: 'Lolita',
    image: require('../assets/images/lolita.jpg'),
    tags: ['$$', 'New American', 'Italian-Inspired', 'Cocktail Bar'],
    rating: 4.7,
    times: ['5:30 PM', '6:30 PM', '7:00 PM'],
  },
  {
    id: '3',
    name: 'Rooms Tbilisi',
    image: require('../assets/images/rooms-tbilisi.jpg'),
    tags: ['$$$', 'Modern American', 'New Nordic', 'Farm-to-Table'],
    rating: 4.9,
    times: ['6:00 PM', '6:45 PM', '7:15 PM'],
  },
  {
    id: '1',
    name: 'Honoré',
    image: require('../assets/images/IMG_5347.jpg'),
    tags: ['$$$', 'Georgian', 'European', 'Barbecue', 'Cocktail Bar'],
    rating: 4.8,
    times: ['5:45 PM', '6:00 PM', '6:15 PM'],
  },
  {
    id: '4',
    name: 'Alubali',
    image: require('../assets/images/IMG_5351.jpg'),
    tags: ['$$$', 'Georgian', 'Authentic Georgian'],
    rating: 4.7,
    times: ['6:00 PM', '6:30 PM', '7:00 PM'],
  },
  {
    id: '5',
    name: 'Orangery',
    image: require('../assets/images/IMG_5352.jpg'),
    tags: ['$$', 'Georgian', 'European', 'Georgian & European'],
    rating: 4.5,
    times: ['5:30 PM', '6:00 PM', '6:30 PM'],
  },
  {
    id: '6',
    name: 'Khedi',
    image: require('../assets/images/IMG_5353.jpg'),
    tags: ['$$', 'Georgian', 'Traditional Georgian'],
    rating: 4.6,
    times: ['6:00 PM', '6:45 PM', '7:15 PM'],
  },
  {
    id: '8',
    name: 'Keto and Kote',
    image: require('../assets/images/IMG_5355.jpg'),
    tags: ['$', 'Georgian', 'Khachapuri'],
    rating: 4.7,
    times: ['6:00 PM', '6:30 PM', '7:00 PM'],
  },
  {
    id: '9',
    name: 'Tsiskvili',
    image: require('../assets/images/IMG_5356.jpg'),
    tags: ['$$', 'Georgian', 'Fusion'],
    rating: 4.5,
    times: ['5:45 PM', '6:15 PM', '6:45 PM'],
  },
];

const cuisines = [
  { id: '1', name: 'Georgian', image: require('../assets/images/georgian.jpg') },
  { id: '2', name: 'Pizza', image: require('../assets/images/pizza.jpg') },
  { id: '3', name: 'Italian', image: require('../assets/images/italian.jpg') },
  { id: '4', name: 'Brunch', image: require('../assets/images/brunch.jpg') },
  { id: '5', name: 'American', image: require('../assets/images/american.jpg') },
  { id: '6', name: 'Sushi', image: require('../assets/images/sushi.jpg') },
  { id: '7', name: 'Ukrainian', image: require('../assets/images/ukrainian.jpg') },
  { id: '8', name: 'Mexican', image: require('../assets/images/mexican.jpg') },
  { id: '9', name: 'European', image: require('../assets/images/european.jpg') },
  { id: '10', name: 'Fine Dining', image: require('../assets/images/fine-dining.jpg') },
  { id: '11', name: 'Seafood', image: require('../assets/images/seafood.jpg') },
  { id: '12', name: 'Vegetarian', image: require('../assets/images/vegetarian.jpg') },
  { id: '13', name: 'Vegan', image: require('../assets/images/vegan.jpg') },
  { id: '14', name: 'Indian', image: require('../assets/images/indian.jpg') },
  { id: '15', name: 'Chinese', image: require('../assets/images/chinese.jpg') },
  { id: '16', name: 'Burgers', image: require('../assets/images/burgers.jpg') },
  { id: '17', name: 'Soups', image: require('../assets/images/soups.jpg') },
  { id: '18', name: 'Breakfast', image: require('../assets/images/breakfast.jpg') },
  { id: '19', name: 'Bakery', image: require('../assets/images/bakery.jpg') },
  { id: '20', name: 'Wine Bar', image: require('../assets/images/wine-bar.jpg') },
  // Add more from backend as needed
];

// Add trending restaurants sample data
const trendingRestaurants = [
  {
    id: 'trending_1',
    name: 'Alubali',
    image: require('../assets/images/alubali.jpg'),
    location: 'Tbilisi',
    cuisine: 'Authentic Georgian',
    rating: 5,
    reviews: 70,
    distance: 2.3,
    price: 4,
    favorite: false,
  },
  {
    id: 'trending_2',
    name: 'Orangery',
    image: require('../assets/images/lolita.jpg'),
    location: 'Tbilisi',
    cuisine: 'Georgian & European',
    rating: 4.5,
    reviews: 45,
    distance: 0.8,
    price: 2,
    favorite: true,
  },
  {
    id: 'trending_3',
    name: 'Coffee Shop Company',
    image: require('../assets/images/lolita.jpg'),
    location: 'Tbilisi',
    cuisine: 'Austrian & Eastern European',
    rating: 4.2,
    reviews: 30,
    distance: 1.1,
    price: 1,
    favorite: false,
  },
  {
    id: 'trending_4',
    name: 'Monday Greens',
    image: require('../assets/images/lolita.jpg'),
    location: 'Tbilisi',
    cuisine: 'European',
    rating: 4.6,
    reviews: 60,
    distance: 1.5,
    price: 3,
    favorite: false,
  },
  {
    id: 'trending_5',
    name: 'Strada',
    image: require('../assets/images/lolita.jpg'),
    location: 'Tbilisi',
    cuisine: 'International',
    rating: 4.3,
    reviews: 50,
    distance: 2.0,
    price: 2,
    favorite: false,
  },
  {
    id: 'trending_6',
    name: '8000 Vintages',
    image: { uri: 'https://images.unsplash.com/photo-1514361892635-cebb9b6b9d49?auto=format&fit=crop&w=80&q=80' },
    location: 'Tbilisi',
    cuisine: 'Wine Bar',
    rating: 4.8,
    reviews: 80,
    distance: 2.7,
    price: 3,
    favorite: true,
  },
  {
    id: 'trending_7',
    name: 'Canape',
    image: { uri: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=80&q=80' },
    location: 'Tbilisi',
    cuisine: 'European',
    rating: 4.4,
    reviews: 35,
    distance: 1.9,
    price: 2,
    favorite: false,
  },
  {
    id: '8',
    name: 'Khedi',
    image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80' },
    location: 'Tbilisi',
    cuisine: 'Georgian',
    rating: 4.7,
    reviews: 55,
    distance: 2.5,
    price: 3,
    favorite: false,
  },
  {
    id: '9',
    name: 'Tsiskvili',
    image: require('../assets/images/lolita.jpg'),
    location: 'Tbilisi',
    cuisine: 'Georgian',
    rating: 4.9,
    reviews: 100,
    distance: 3.2,
    price: 4,
    favorite: true,
  },
  {
    id: '10',
    name: 'Rigi',
    image: { uri: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=80&q=80' },
    location: 'Tbilisi',
    cuisine: 'Georgian',
    rating: 4.3,
    reviews: 28,
    distance: 2.8,
    price: 2,
    favorite: false,
  },
  {
    id: '11',
    name: 'Bachata Gardens',
    image: require('../assets/images/lolita.jpg'),
    location: 'Tbilisi',
    cuisine: 'European',
    rating: 4.5,
    reviews: 40,
    distance: 2.1,
    price: 3,
    favorite: false,
  },
  {
    id: '12',
    name: 'Miti Taverna',
    image: require('../assets/images/lolita.jpg'),
    location: 'Tbilisi',
    cuisine: 'Greek',
    rating: 4.6,
    reviews: 33,
    distance: 2.6,
    price: 2,
    favorite: false,
  },
];

// Update wine tasting venues sample data to include times, price, distance, rating, favorite
const wineTastingVenues = [
  {
    id: 'wine_1',
    name: '8000 Vintages',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Wine Bar'],
    price: 3,
    rating: 4.7,
    distance: 14,
    times: ['7:15 PM', '7:30 PM'],
    favorite: false,
  },
  {
    id: 'wine_2',
    name: 'Sadzvele',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Wine Hub'],
    price: 2,
    rating: 4.6,
    distance: 12,
    times: ['7:45 PM', '8:00 PM'],
    favorite: true,
  },
  {
    id: 'wine_3',
    name: 'Wine Merchants',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Wine Bar'],
    price: 3,
    rating: 4.9,
    distance: 8,
    times: ['8:15 PM', '8:30 PM'],
    favorite: false,
  },
  {
    id: 'wine_4',
    name: 'Wine Not',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Wine Bar'],
    price: 2,
    rating: 4.8,
    distance: 10,
    times: ['8:45 PM', '9:00 PM'],
    favorite: false,
  },
  {
    id: 'wine_5',
    name: 'Apotheka Bar',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Wine Bar'],
    price: 2,
    rating: 4.7,
    distance: 9,
    times: ['9:15 PM', '9:30 PM'],
    favorite: false,
  },
];

const outdoorDiningRestaurants = [
  {
    id: 'outdoor_1',
    name: 'Bachata Gardens',
    image: require('../assets/images/lolita.jpg'),
    tags: ['European', 'Outdoor'],
    favorite: false,
  },
  {
    id: 'outdoor_2',
    name: 'Miti Taverna',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Greek', 'Outdoor'],
    favorite: true,
  },
  {
    id: 'outdoor_3',
    name: 'Keto & Kote',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Georgian', 'Outdoor'],
    favorite: false,
  },
  {
    id: 'outdoor_4',
    name: 'Tsiskvili',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Georgian', 'Outdoor'],
    favorite: false,
  },
  {
    id: 'outdoor_5',
    name: 'Mova Maisi',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Georgian', 'Outdoor'],
    favorite: true,
  },
  {
    id: '6',
    name: 'Ninia\'s Garden',
    image: require('../assets/images/lolita.jpg'),
    tags: ['European', 'Outdoor'],
    favorite: false,
  },
  {
    id: '7',
    name: 'Cafe Stamba',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Mixed', 'Outdoor'],
    favorite: false,
  },
  {
    id: '8',
    name: 'Iakobi\'s Ezo',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Neo Bistro', 'Outdoor'],
    favorite: true,
  },
];

const rooftopRestaurants = [
  {
    id: 'rooftop_1',
    name: 'Republic Tbilisi',
    image: require('../assets/images/lolita.jpg'),
    tags: ['European', '$$$', 'Downtown'],
    rating: 4.8,
    people: 120,
    description: 'Enjoy city views and modern European cuisine in the center of Tbilisi',
    favorite: false,
  },
  {
    id: 'rooftop_2',
    name: 'Filini Terrace',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Italian', '$$', 'Midtown'],
    rating: 4.7,
    people: 80,
    description: 'Italian classics and cocktails with a skyline backdrop.',
    favorite: true,
  },
  {
    id: 'rooftop_3',
    name: 'Monograph Terrace',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Bar & Restaurant', '$$', 'Uptown'],
    rating: 4.6,
    people: 60,
    description: 'Trendy rooftop bar with creative drinks and city lights.',
    favorite: false,
  },
  {
    id: 'rooftop_4',
    name: 'Xeme Biltmore',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Mediterranean', '$$$', 'Old Town'],
    rating: 4.9,
    people: 100,
    description: 'Mediterranean flavors and open-air dining with a view.',
    favorite: false,
  },
  {
    id: 'rooftop_5',
    name: 'Paragraph',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Seafood', '$$$', 'Seaside'],
    rating: 4.7,
    people: 90,
    description: 'Explore Georgian culture in contemporary luxury setting in the heart of Tbilisi',
    favorite: true,
  },
  {
    id: 'rooftop_6',
    name: 'Tiflis Veranda',
    image: require('../assets/images/lolita.jpg'),
    tags: ['International cuisine', '$$$', 'Financial District'],
    rating: 4.8,
    people: 110,
    description: 'Enjoy exquisite dishes, live music, and mesmerizing views with local wines',
    favorite: false,
  },
  {
    id: 'rooftop_7',
    name: 'Sofiko',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Georgian casual dining', '$$', 'Downtown'],
    rating: 4.5,
    people: 150,
    description: 'Enjoy outstanding views with dishes inspired by the timeless culture of Tbilisi city',
    favorite: false,
  },
  {
    id: 'rooftop_8',
    name: 'Atmosphere Bar',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Asian Fusion Restaurant', '$$', 'Midtown'],
    rating: 4.6,
    people: 70,
    description: 'Fusion cuisine, crafted drinks, and city views',
    favorite: false,
  },
  {
    id: 'rooftop_9',
    name: 'Weather Report Bar',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Tapas', '$$', 'City Center'],
    rating: 4.7,
    people: 130,
    description: 'Offering a variety of exclusive signature cocktails and tapas',
    favorite: true,
  },
  {
    id: '10',
    name: 'Golden Tulip',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Restaurant, Grill', '$$', 'Uptown'],
    rating: 4.5,
    people: 60,
    description: 'Grilled favorites and open-air seating under the sky.',
    favorite: false,
  },
];

const dateNightRestaurants = [
  {
    id: 'date_1',
    name: 'Barbarestan',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Modern Georgian fine dining', 'Romantic'],
    favorite: true,
  },
  {
    id: 'date_2',
    name: 'Casa Fiori',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Modern Italian Restaurant & Cocktail Bar', 'Intimate'],
    favorite: false,
  },
  {
    id: 'date_3',
    name: 'Ambrosiano',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Italy\'s finest artisan dishes', 'Romantic'],
    favorite: false,
  },
  {
    id: 'date_4',
    name: 'Madre',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Spanish', 'Date Night'],
    favorite: true,
  },
  {
    id: 'date_5',
    name: 'Littera',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Modern Georgian cuisine', 'Romantic'],
    favorite: false,
  },
];

export default function HomeScreen() {
  const [showAllTrending, setShowAllTrending] = useState(false);
  const [showAllDateNight, setShowAllDateNight] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  // Booking modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [partySize, setPartySize] = useState(2);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('Now');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [countryCode, setCountryCode] = useState('GE');
  const [callingCode, setCallingCode] = useState('995');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [continueAnim] = useState(new Animated.Value(1));
  // Add state for selected restaurant and modal
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  // Add state for favorites
  const [favorites, setFavorites] = useState({});
  // Add state for cuisine modal
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [showCuisineModal, setShowCuisineModal] = useState(false);
  // Add state for search modal
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  // Add state for location search
  const [locationQuery, setLocationQuery] = useState('Tbilisi, Georgia');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  // Add state for cart functionality
  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  // Add state for checkout functionality
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  // Add state for cart feedback
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [addedItemName, setAddedItemName] = useState('');
  const [bookingFromLolita, setBookingFromLolita] = useState(false);
  const [showReservationsModal, setShowReservationsModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);

  const [showMapModal, setShowMapModal] = useState(false);
  // Generate party size options
  const partySizes = Array.from({ length: 20 }, (_, i) => i + 1);

  // Generate date options (Today, next 89 days for 90 total)
  const dateOptions = [];
  const today = new Date();
  for (let i = 0; i < 90; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (i === 0) dateOptions.push({ label: 'Today', value: d });
    else dateOptions.push({ label: d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }), value: d });
  }

  // Generate time options: next 24 hours in 30-min increments, 24-hour format
  const timeOptions = [];
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  // Start from next half hour slot
  let start = new Date(now);
  start.setSeconds(0, 0);
  if (start.getMinutes() < 30) {
    start.setMinutes(30);
  } else {
    start.setHours(start.getHours() + 1);
    start.setMinutes(0);
  }
  for (let i = 0; i < 48; i++) { // 48 slots in 24 hours, 30 min each
    const h = pad(start.getHours());
    const m = pad(start.getMinutes());
    timeOptions.push(`${h}:${m}`);
    start.setMinutes(start.getMinutes() + 30);
  }

  // For wheel picker effect
  const dateScrollRef = useRef(null);
  const timeScrollRef = useRef(null);
  const [dateScrollIndex, setDateScrollIndex] = useState(0);
  const [timeScrollIndex, setTimeScrollIndex] = useState(0);

  // Helper to scroll to selected index
  const scrollToIndex = (ref, idx, itemHeight) => {
    if (ref.current) {
      ref.current.scrollTo({ y: idx * itemHeight, animated: true });
    }
  };

  // When modal opens, scroll to selected and reset to first option
  React.useEffect(() => {
    if (showBookingModal) {
      setDateScrollIndex(0);
      setTimeScrollIndex(0);
      setSelectedDate(dateOptions[0]?.value);
      setSelectedTime(timeOptions[0] || '');
      scrollToIndex(dateScrollRef, 0, 38);
      scrollToIndex(timeScrollRef, 0, 38);
    }
  }, [showBookingModal]);

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const suggestions = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  };

  // Location search functionality
  const handleLocationSearch = (query) => {
    setLocationQuery(query);
    if (query.length > 0) {
      const cities = ['Tbilisi, Georgia', 'Batumi, Georgia', 'Kutaisi, Georgia', 'Rustavi, Georgia', 'Gori, Georgia', 'Zugdidi, Georgia', 'Poti, Georgia', 'Telavi, Georgia'];
      const suggestions = cities.filter(city =>
        city.toLowerCase().includes(query.toLowerCase())
      );
      setLocationSuggestions(suggestions);
      setShowLocationSuggestions(true);
    } else {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    }
  };

  // Cart functions
  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    
    // Show success feedback
    setAddedItemName(item.name);
    setShowCartSuccess(true);
    setTimeout(() => {
      setShowCartSuccess(false);
    }, 2000);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <>
      <LinearGradient
        colors={['#808080', '#202020', '#000000']}
        style={{ flex: 1 }}
      >
      {/* Sticky Header */}
      <SafeAreaView style={styles.stickyHeaderSafe}>
        <View style={styles.stickyHeader}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Ready to book your table?</Text>
            <TouchableOpacity style={styles.loginButton} onPress={() => setShowRegisterModal(true)}>
              <Ionicons name="person-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {/* Selector Buttons */}
          <View style={styles.selectorsRow}>
            <TouchableOpacity style={styles.selectorButton} onPress={() => {
              setShowBookingModal(true);
              setBookingFromLolita(false);
            }}>
              <Ionicons name="people-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.selectorText}>{partySize} • {selectedTime} {selectedDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.selectorButton, { minWidth: 200 }]} onPress={() => setShowSearchModal(true)}>
              <Ionicons name="search-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.selectorText}>Search</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
      {/* Main Scrollable Content */}
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Available Now */}
        <Text style={styles.sectionTitle}>Available now</Text>
        <FlatList
          data={restaurants}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 8, paddingRight: 8 }}
          style={{ marginBottom: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.restaurantCard}
              onPress={() => {
                setSelectedRestaurant(item);
                setShowRestaurantModal(true);
              }}
              activeOpacity={0.85}
            >
              <Image source={item.name === 'Honoré' ? require('../assets/images/IMG_5583.jpg') : item.name === 'Alubali' ? require('../assets/images/IMG_5584.jpg') : item.name === 'Orangery' ? require('../assets/images/IMG_4192.jpg') : item.name === 'Khedi' ? require('../assets/images/IMG_5586.jpg') : item.name === 'Keto and Kote' ? require('../assets/images/IMG_4210.jpg') : item.name === 'Tsiskvili' ? require('../assets/images/nn.jpg') : item.image} style={styles.restaurantImage} />
              <Text style={styles.restaurantName}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 0, marginLeft: 0 }}>
                <View style={{ flex: 1 }}>
                <Text style={[styles.restaurantTags, { flex: 1 }]}> 
                  {item.tags.map((tag, idx) => {
                    return (
                      <React.Fragment key={tag}>
                        {tag}{idx < item.tags.length - 1 ? ' • ' : ''}
                      </React.Fragment>
                    );
                  })}
                    {item.name !== 'Keto and Kote' && item.name !== 'Tsiskvili' && (
                    <>
                      {' '}
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </>
                  )}
                </Text>
                  {(item.name === 'Keto and Kote' || item.name === 'Tsiskvili') && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  )}
                </View>
                {/* Favourites icon inside card, right side, never overflowing */}
                <TouchableOpacity
                  style={{ padding: 4, marginLeft: 8, backgroundColor: 'rgba(42,42,42,0.85)', borderRadius: 16, alignSelf: 'flex-start' }}
                  onPress={() => {
                    setFavorites(favs => ({ ...favs, [item.id]: !favs[item.id] }));
                  }}
                >
                  <Ionicons name={favorites[item.id] ? 'bookmark' : 'bookmark-outline'} size={22} color={'#FF8C00'} />
                </TouchableOpacity>
              </View>
              <View style={styles.timesRowEven}>
                {item.times.map((time, idx) => (
                  <TouchableOpacity key={idx} style={styles.timeButtonSmall}>
                    <Text style={styles.timeButtonTextSmall}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          )}
        />
        {/* Cuisine/Category Scroll */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.cuisineSectionTitle}>Find by cuisine</Text>
          <TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}><Text style={styles.cuisineViewAll}>View all</Text><Ionicons name="chevron-forward" size={16} color="#FF8C00" style={{ marginLeft: 4 }} /></View>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cuisineCarousel} contentContainerStyle={{ paddingLeft: 8, paddingRight: 8 }}>
          {cuisines.map(cuisine => (
            <TouchableOpacity 
              key={cuisine.id} 
              style={styles.cuisineItem}
              onPress={() => {
                setSelectedCuisine(cuisine);
                setShowCuisineModal(true);
              }}
            >
              <View style={styles.cuisineFrame}>
                <Image source={cuisine.image} style={styles.cuisineImageLarge} />
              </View>
              <Text style={styles.cuisineText}>{cuisine.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Trending Section */}
        <Text style={styles.trendingTitle}>See what's trending</Text>
        {/* Trending Restaurants Section */}
        <View style={styles.trendingListSection}>
          {(showAllTrending ? trendingRestaurants : trendingRestaurants.slice(0, 5)).map((r) => (
            <View key={r.id} style={styles.trendingCard}>
              <Image source={r.name === 'Alubali' ? require('../assets/images/IMG_5584.jpg') : r.name === 'Orangery' ? require('../assets/images/IMG_4192.jpg') : r.name === 'Coffee Shop Company' ? require('../assets/images/IMG_4193.jpg') : r.name === 'Monday Greens' ? require('../assets/images/IMG_5587.jpg') : r.name === 'Strada' ? require('../assets/images/IMG_5588.jpg') : r.image} style={styles.trendingImage} />
              <View style={styles.trendingInfo}>
                <Text style={styles.trendingName}>{r.name}</Text>
                <Text style={styles.trendingLocation}>{r.location}</Text>
                <Text style={styles.trendingCuisine}>{r.cuisine}</Text>
                <View style={styles.trendingRatingRow}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Ionicons
                      key={i}
                      name={i < Math.round(r.rating) ? 'star' : 'star-outline'}
                      size={16}
                      color="#FFD700"
                      style={{ marginRight: 2 }}
                    />
                  ))}
                  <Text style={styles.trendingReviews}>({r.reviews} Reviews)</Text>
                </View>
              </View>
              <View style={styles.trendingMeta}>
                <TouchableOpacity onPress={() => setFavorites(favs => ({ ...favs, [r.id]: !favs[r.id] }))}>
                  <Ionicons name={favorites[r.id] ? 'bookmark' : 'bookmark-outline'} size={22} color="#FF8C00" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <Ionicons name="location-outline" size={16} color="#fff" style={{ marginRight: 2 }} />
                  <Text style={styles.trendingMetaText}>{r.distance} km</Text>
                </View>
                <Text style={styles.trendingMetaText}>{'$'.repeat(r.price)}</Text>
              </View>
            </View>
          ))}
          {!showAllTrending && (
            <TouchableOpacity style={styles.seeAllButton} onPress={() => setShowAllTrending(true)}>
              <Text style={styles.seeAllButtonText}>See all</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* Trending Modal */}
        <Modal
          visible={showAllTrending}
          animationType="slide"
          onRequestClose={() => setShowAllTrending(false)}
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Text style={[styles.trendingTitle, { marginLeft: 0 }]}>All Trending Restaurants</Text>
                <Pressable onPress={() => setShowAllTrending(false)}>
                  <Ionicons name="close" size={28} color="#fff" />
                </Pressable>
              </View>
              <ScrollView style={{ flex: 1 }}>
                {(trendingRestaurants.map((r) => (
                  <View key={r.id} style={styles.trendingCard}>
                    <Image source={r.name === 'Alubali' ? require('../assets/images/IMG_5584.jpg') : r.name === 'Orangery' ? require('../assets/images/IMG_4192.jpg') : r.name === 'Coffee Shop Company' ? require('../assets/images/IMG_4193.jpg') : r.name === 'Monday Greens' ? require('../assets/images/IMG_5587.jpg') : r.name === 'Strada' ? require('../assets/images/IMG_5588.jpg') : r.image} style={styles.trendingImage} />
                    <View style={styles.trendingInfo}>
                      <Text style={styles.trendingName}>{r.name}</Text>
                      <Text style={styles.trendingLocation}>{r.location}</Text>
                      <Text style={styles.trendingCuisine}>{r.cuisine}</Text>
                      <View style={styles.trendingRatingRow}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Ionicons
                            key={i}
                            name={i < Math.round(r.rating) ? 'star' : 'star-outline'}
                            size={16}
                            color="#FFD700"
                            style={{ marginRight: 2 }}
                          />
                        ))}
                        <Text style={styles.trendingReviews}>({r.reviews} Reviews)</Text>
                      </View>
                    </View>
                    <View style={styles.trendingMeta}>
                      <TouchableOpacity onPress={() => setFavorites(favs => ({ ...favs, [r.id]: !favs[r.id] }))}>
                        <Ionicons name={favorites[r.id] ? 'bookmark' : 'bookmark-outline'} size={22} color="#FF8C00" />
                      </TouchableOpacity>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                        <Ionicons name="location-outline" size={16} color="#fff" style={{ marginRight: 2 }} />
                        <Text style={styles.trendingMetaText}>{r.distance} km</Text>
                      </View>
                      <Text style={styles.trendingMetaText}>{'$'.repeat(r.price)}</Text>
                    </View>
                  </View>
                )))}
              </ScrollView>
            </View>
          </View>
        </Modal>
        {/* Wine Tasting Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.wineTastingTitle}>Wine tasting</Text>
          <TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}><Text style={styles.cuisineViewAll}>View all</Text><Ionicons name="chevron-forward" size={16} color="#FF8C00" style={{ marginLeft: 4 }} /></View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={wineTastingVenues}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 8, paddingRight: 8 }}
          style={styles.wineCarousel}
          renderItem={({ item }) => (
            <View style={styles.wineCard}>
              <Image source={item.image} style={styles.wineImage} />
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.wineName}>{item.name}</Text>
                  <Text style={styles.wineTags}>{'$'.repeat(item.price)} • {item.tags.join(' • ')} <Ionicons name="star" size={14} color="#FFD700" /> {item.rating} </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                    <Ionicons name="location-outline" size={14} color="#fff" style={{ marginRight: 2 }} />
                    <Text style={styles.wineTags}>{item.distance} km</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setFavorites(favs => ({ ...favs, [item.id]: !favs[item.id] }))}>
                  <Ionicons name={favorites[item.id] ? 'bookmark' : 'bookmark-outline'} size={22} color="#FF8C00" />
                </TouchableOpacity>
              </View>
              <View style={styles.wineTimesRow}>
                {item.times.slice(0, 2).map((time, idx) => (
                  <TouchableOpacity key={idx} style={styles.timeButton}>
                    <Text style={styles.timeButtonText}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        />
        {/* Fun Outdoor Dining Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.outdoorDiningTitle}>Fun outdoor dining</Text>
          <TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}><Text style={styles.cuisineViewAll}>View all</Text><Ionicons name="chevron-forward" size={16} color="#FF8C00" style={{ marginLeft: 4 }} /></View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={outdoorDiningRestaurants}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 8, paddingRight: 8 }}
          style={styles.outdoorCarousel}
          renderItem={({ item }) => (
            <View style={styles.outdoorCard}>
              <Image source={item.image} style={styles.outdoorImage} />
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 8 }}>
                <Text style={styles.outdoorName}>{item.name}</Text>
                <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => setFavorites(favs => ({ ...favs, [item.id]: !favs[item.id] }))}>
                  <Ionicons name={favorites[item.id] ? 'bookmark' : 'bookmark-outline'} size={22} color="#FF8C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.outdoorTags}>{item.tags.join(' • ')}</Text>
            </View>
          )}
        />
        {/* Rooftop Views Section */}
        <Text style={styles.rooftopTitle}>Rooftop Views</Text>
        <View style={styles.rooftopListSection}>
          {rooftopRestaurants.map((r) => (
            <View key={r.id} style={styles.rooftopCard}>
              <View style={{ position: 'relative' }}>
                <Image source={r.image} style={styles.rooftopImage} />
                <TouchableOpacity style={styles.rooftopBookmark} onPress={() => setFavorites(favs => ({ ...favs, [r.id]: !favs[r.id] }))}>
                  <Ionicons name={favorites[r.id] ? 'bookmark' : 'bookmark-outline'} size={28} color="#fff" />
                </TouchableOpacity>
              </View>
              <Text style={styles.rooftopName}>{r.name}</Text>
              <Text style={styles.rooftopTags}>{r.tags.join(' • ')}</Text>
              <View style={styles.rooftopMetaRow}>
                <Ionicons name="star" size={16} color="#FFD700" style={{ marginRight: 2 }} />
                <Text style={styles.rooftopRating}>{r.rating}</Text>
                <Ionicons name="people-outline" size={16} color="#fff" style={{ marginLeft: 12, marginRight: 2 }} />
                <Text style={styles.rooftopPeople}>Up to {r.people} people</Text>
              </View>
              <Text style={styles.rooftopDesc} numberOfLines={2}>{r.description}</Text>
            </View>
          ))}
        </View>
        {/* Date Night Section */}
        <View style={[styles.sectionHeaderRow, { marginTop: -8 }]}>
          <Text style={styles.outdoorDiningTitle}>Date Night</Text>
          <TouchableOpacity onPress={() => setShowAllDateNight(true)}>
            <Text style={styles.cuisineViewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={showAllDateNight ? dateNightRestaurants : dateNightRestaurants.slice(0, 5)}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 8, paddingRight: 8 }}
          style={styles.outdoorCarousel}
          renderItem={({ item }) => (
            <View style={styles.outdoorCard}>
              <Image source={item.image} style={styles.outdoorImage} />
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 8 }}>
                <Text style={styles.outdoorName}>{item.name}</Text>
                <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => setFavorites(favs => ({ ...favs, [item.id]: !favs[item.id] }))}>
                  <Ionicons name={favorites[item.id] ? 'bookmark' : 'bookmark-outline'} size={22} color="#FF8C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.outdoorTags}>{item.tags.join(' • ')}</Text>
            </View>
          )}
        />
      </ScrollView>
      {/* Restaurant Details Modal */}
      <Modal
        visible={showRestaurantModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRestaurantModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* Blurred background overlay */}
          <BlurView intensity={40} tint="dark" style={{ ...StyleSheet.absoluteFill, bottom: 80 }} />
          <View style={{ ...StyleSheet.absoluteFillObject, bottom: 80, backgroundColor: 'rgba(0,0,0,0.7)' }} />
          <LinearGradient
            colors={['#606060', '#202020', '#000000']}
            style={{ borderRadius: 24, width: '92%', maxWidth: 420, padding: 24, alignSelf: 'center', justifyContent: 'center' }}>
            {/* Row for name, bookmark, and X button aligned */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, position: 'relative' }}>
              <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', flex: 1 }}>
                {selectedRestaurant?.name}
              </Text>
              <TouchableOpacity
                style={{ padding: 4, backgroundColor: 'rgba(42,42,42,0.85)', borderRadius: 16, marginLeft: 0, marginRight: 16 }}
                onPress={() => {
                  if (selectedRestaurant) {
                    setFavorites(favs => ({ ...favs, [selectedRestaurant.id]: !favs[selectedRestaurant.id] }));
                  }
                }}
              >
                <Ionicons name={favorites[selectedRestaurant?.id] ? 'bookmark' : 'bookmark-outline'} size={24} color={'#FF8C00'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowRestaurantModal(false)} style={{ marginLeft: 0 }}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            {selectedRestaurant?.name === 'Lolita' ? (
              <View style={{ width: '100%', height: 180, marginBottom: 16 }}>
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  style={{ width: '100%', height: 180 }}
                  contentContainerStyle={{ alignItems: 'center' }}
                >
                  <Image source={require("../assets/images/IMG_5244.jpg")} style={{ width: 340, height: 180, borderRadius: 16, marginRight: 12 }} />
                  <Image source={require("../assets/images/IMG_5245.jpg")} style={{ width: 340, height: 180, borderRadius: 16, marginRight: 12 }} />
                  <Image source={require("../assets/images/IMG_5243.jpg")} style={{ width: 340, height: 180, borderRadius: 16, marginRight: 12 }} />
                  <Image source={require("../assets/images/nia3.jpg")} style={{ width: 340, height: 180, borderRadius: 16, marginRight: 12 }} />
                  <Image source={require("../assets/images/IMG_4142.jpg")} style={{ width: 340, height: 180, borderRadius: 16 }} />
                </ScrollView>
                {/* Pagination dots */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginHorizontal: 4 }} />
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginHorizontal: 4 }} />
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginHorizontal: 4 }} />
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginHorizontal: 4 }} />
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginHorizontal: 4 }} />
                </View>
              </View>
            ) : (
              <Image source={selectedRestaurant?.image} style={{ width: '100%', height: 180, borderRadius: 16, marginBottom: 16 }} />
            )}
            {selectedRestaurant?.name === 'Lolita' ? (
              <>
                {/* Description row with $$ New-American, Cocktail Bar and 4.3 stars */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                  <Text style={{ color: '#666666', fontSize: 15, marginRight: 8 }}>
                    $$ New-American, Cocktail Bar
                  </Text>
                  <Ionicons name="star" size={16} color="#FFD700" style={{ marginRight: 2 }} />
                  <Text style={{ color: '#FFD700', fontSize: 15, fontWeight: 'bold', marginRight: 2 }}>4.3</Text>
                </View>
                {/* Second description, smaller */}
                <Text style={{ color: '#b0b8c1', fontSize: 13, marginBottom: 18 }}>
                  Stylish courtyard hotspot in Tbilisi, offering comfort food and cocktails in cool industrial-chic setting. Perfect for Brunch, dinner, and late-night drinks!
                </Text>
                {/* Booking button/modal (identical to header) */}
                <TouchableOpacity
                  style={{ backgroundColor: '#FF8C00', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 18 }}
                  onPress={() => {
                    setShowRestaurantModal(false);
                    setShowBookingModal(true);
                    setBookingFromLolita(true);
                  }}
                >
                  <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Book a Table</Text>
                </TouchableOpacity>
                
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Menu</Text>
                <ScrollView style={{ maxHeight: 220, marginBottom: 8 }} indicatorStyle="white">
                  {/* 20 sample dishes */}
                  {[...Array(20)].map((_, i) => (
                    i === 0 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/ko.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Cheese Sticks</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Sweet Chili Sauce, Sulguni Cheese, Panko, Garlic, Egg</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Appetizer</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>17 GEL</Text>
                        </View>
                      </View>
                    ) : i === 1 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/nnn.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Avocado Toast</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Avocado, Red Onion, Garlic, Coriander, Olive Oil, Lime</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Appetizer</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>17 GEL</Text>
                        </View>
                      </View>
                    ) : i === 2 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/jj.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Margherita Pizza</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Tomato sauce, Fresh Mozzarella</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Pizzette</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>19 GEL</Text>
                        </View>
                      </View>
                    ) : i === 3 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/k.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Bolognese Rigatoni</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Beef, Bacon, Tomato, Red Wine, Spicy Sour Cream</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Pasta</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>27 GEL</Text>
                        </View>
                      </View>
                    ) : i === 4 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5253.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Grilled Artichoke Salad</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Artichoke, Frisée, Romano, Parmesan, Nuts, Parsley Dressing</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Salad</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>17 GEL</Text>
                        </View>
                      </View>
                    ) : i === 5 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5254.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Nachos</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Cheese Sauce, Guacamole, Tomato Salsa, Nachos, Jalapenos</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Side</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>13 GEL</Text>
                        </View>
                      </View>
                    ) : i === 6 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5255.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Roasted Chicken</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Grilled Corn, Lemon, Herbs</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Large Plate</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>33 GEL</Text>
                        </View>
                      </View>
                    ) : i === 7 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/88.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Chicken Wings</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Sweet Chili Sauce, White Sesame, Green Onion, Fresh Pepper Mix</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Small Plate</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>17 GEL</Text>
                        </View>
                      </View>
                    ) : i === 8 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5258.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Mac & Cheese</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Cheddar, Gouda, Parmesan, Mozzarella, Panko</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Pasta</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>21 GEL</Text>
                        </View>
                      </View>
                    ) : i === 9 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5259.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Tom Yum</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Shrimp, Rice Noodles, Ginger, Mushroom, Lemongrass, Potato, Coconut Cream</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Soup</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>21 GEL</Text>
                        </View>
                      </View>
                    ) : i === 10 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5260.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Cauliflower Bites with Kimchi Mayo</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Cauliflower, Panko, Onion, Garlic, Kimchi, Egg, Lime, Parsley</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Appetizer</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>11 GEL</Text>
                        </View>
                      </View>
                    ) : i === 11 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5261.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Chicken Bites</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Chicken, Panko, Tartar Sauce</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Small Plate</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>15 GEL</Text>
                        </View>
                      </View>
                    ) : i === 12 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5262.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Chicken Focaccia Sandwich</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Focaccia, Chicken, Avocado, Tomato, Bacon, Spinach, Sauce, Fries</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Burger & Sandwich</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>25 GEL</Text>
                        </View>
                      </View>
                    ) : i === 13 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5263.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Cheeseburger</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Beef, Pickles, Onion, Cocktail Sauce, Fries</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Burger & Sandwich</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>27 GEL</Text>
                        </View>
                      </View>
                    ) : i === 14 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5264.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Pita Caesar</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Chicken, Bacon, Parmesan Cheese, Caesar Sauce, Fries</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Burger & Sandwich</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>25 GEL</Text>
                        </View>
                      </View>
                    ) : i === 15 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5265.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Gnocchi</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Crispy Prosciutto, Cream, Permesan, Black Pepper</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Pasta</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>19 GEL</Text>
                        </View>
                      </View>
                    ) : i === 16 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5266.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Lolita Khatchapuri</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Sulguni Cheese, Mozzarella Cheese, Imeruli Cheese, Egg, Butter</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Pizzette</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>19 GEL</Text>
                        </View>
                      </View>
                    ) : i === 17 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5267.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Apple Crumble</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Apple Pie, Vanilla Ice Cream</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Dessert</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>13 GEL</Text>
                        </View>
                      </View>
                    ) : i === 18 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5268.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Tiramisu</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Mascarpone, Espresso, Cocoa, Port Wine</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Dessert</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>13 GEL</Text>
                        </View>
                      </View>
                    ) : i === 19 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#404040' }}>
                        <Image source={require("../assets/images/IMG_5269.jpg")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold' }}>Churros</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 11 }}>Chocolate Sauce</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Dessert</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#DAA520', fontSize: 16, fontWeight: 'bold', marginLeft: 8, marginBottom: 4 }}>11 GEL</Text>
                      </View>
                        </View>
                    ) : null
                  ))}
                </ScrollView>
              </>
            ) : (
              // Default for other restaurants
              <Text style={{ color: '#b0b8c1', fontSize: 16, marginBottom: 12 }}>
                {selectedRestaurant?.tags?.join(' • ')}
              </Text>
            )}
            
            {/* Cart Success Notification */}
            {showCartSuccess && (
              <View style={{
                position: 'absolute',
                top: 20,
                left: 20,
                right: 20,
                backgroundColor: '#FF8C00',
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 8,
                zIndex: 1000
              }}>
                <Ionicons name="checkmark-circle" size={24} color="#000" style={{ marginRight: 12 }} />
                <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', flex: 1 }}>
                  {addedItemName} added to cart!
                </Text>
                <TouchableOpacity onPress={() => setShowCartSuccess(false)}>
                  <Ionicons name="close" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            )}
          </LinearGradient>
        </View>
      </Modal>
      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <BlurView intensity={40} tint="dark" style={{ ...StyleSheet.absoluteFill, bottom: 80 }} />
          <View style={{ ...StyleSheet.absoluteFillObject, bottom: 80, backgroundColor: 'rgba(0,0,0,0.7)' }} />
          <LinearGradient
            colors={['#606060', '#202020', '#000000']}
            style={{ 
              borderRadius: 24, 
              width: '85%', 
              padding: 20,
              shadowColor: '#000',
              shadowOpacity: 0.9,
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 20 },
              elevation: 50,
              borderWidth: 1,
              borderColor: '#808080',
            }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 18 }}>Party size</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
              {partySizes.map(size => (
                <TouchableOpacity
                  key={size}
                  onPress={() => setPartySize(size)}
                  style={{
                    width: 44, height: 44, borderRadius: 22, borderWidth: 1,
                    borderColor: '#808080',
                    alignItems: 'center', justifyContent: 'center', marginRight: 12,
                    backgroundColor: partySize === size ? '#FF8C00' : '#202020',
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: partySize === size ? 'bold' : 'normal' }}>{size}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Date and time</Text>
            <View style={{ flexDirection: 'row', marginBottom: 24, position: 'relative', height: 190, justifyContent: 'center', alignItems: 'center' }}>
              {/* Date Picker */}
              <View style={{ width: 140, height: 190, overflow: 'hidden', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                <ScrollView
                  ref={dateScrollRef}
                  style={{ width: 140, height: 190 }}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={38}
                  decelerationRate="fast"
                  onMomentumScrollEnd={e => {
                    const idx = Math.round(e.nativeEvent.contentOffset.y / 38);
                    setDateScrollIndex(idx);
                    setSelectedDate(dateOptions[idx].value);
                  }}
                  contentContainerStyle={{ paddingTop: 76, paddingBottom: 76 }}
                >
                  {dateOptions.map((opt, idx) => (
                    <View key={idx} style={{ height: 38, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: '#fff', fontSize: 16 }}>{opt.label}</Text>
                    </View>
                  ))}
                </ScrollView>
                {/* Fixed pill outline for date */}
                <View style={{ position: 'absolute', top: 76, left: 0, width: 140, height: 38, justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
                  <View style={{ paddingVertical: 10, paddingHorizontal: 0, borderRadius: 28, borderWidth: 2, borderColor: '#FF8C00', alignSelf: 'center', minWidth: 0, minHeight: 38 }}>
                    <Text style={{ color: 'transparent', fontSize: 16, paddingHorizontal: 24 }}>
                      {dateOptions[dateScrollIndex]?.label || ''}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Time Picker */}
              <View style={{ width: 120, height: 190, marginLeft: 16, overflow: 'hidden', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                <ScrollView
                  ref={timeScrollRef}
                  style={{ width: 120, height: 190 }}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={38}
                  decelerationRate="fast"
                  onMomentumScrollEnd={e => {
                    const idx = Math.round(e.nativeEvent.contentOffset.y / 38);
                    setTimeScrollIndex(idx);
                    setSelectedTime(timeOptions[idx]);
                  }}
                  contentContainerStyle={{ paddingTop: 76, paddingBottom: 76 }}
                >
                  {timeOptions.map((t, idx) => (
                    <View key={idx} style={{ height: 38, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: '#fff', fontSize: 16 }}>{t}</Text>
                    </View>
                  ))}
                </ScrollView>
                {/* Fixed pill outline for time */}
                <View style={{ position: 'absolute', top: 76, left: 0, width: 120, height: 38, justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
                  <View style={{ paddingVertical: 10, paddingHorizontal: 0, borderRadius: 28, borderWidth: 2, borderColor: '#FF8C00', alignSelf: 'center', minWidth: 0, minHeight: 38 }}>
                    <Text style={{ color: 'transparent', fontSize: 16, paddingHorizontal: 24 }}>
                      {timeOptions[timeScrollIndex] || ''}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{ 
                backgroundColor: '#202020', 
                borderRadius: 12, 
                paddingVertical: 16, 
                alignItems: 'center', 
                marginTop: 8,
                borderWidth: 0.5,
                borderColor: '#808080',
              }}
              onPress={() => {
                setShowBookingModal(false);
                if (bookingFromLolita) {
                  setSelectedRestaurant(restaurants.find(r => r.name === 'Lolita'));
                  setShowRestaurantModal(true);
                  setBookingFromLolita(false);
                }
              }}
            >
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
      {/* Registration Modal */}
      <Modal
        visible={showRegisterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRegisterModal(false)}
      >
        <View style={{ flex: 1 }}>
          {/* Light blur background */}
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)' }} />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LinearGradient
              colors={['#606060', '#202020', '#000000']}
              style={{ 
                borderRadius: 24, 
                width: '85%', 
                padding: 0,
                shadowColor: '#000',
                shadowOpacity: 0.9,
                shadowRadius: 40,
                shadowOffset: { width: 0, height: 20 },
                elevation: 50,
                borderWidth: 1,
                borderColor: '#808080',
              }}>
              {/* Logo at the top */}
              <View style={{ alignItems: 'center', marginTop: 0, marginBottom: 0, overflow: 'hidden' }}>
                <Image source={require('../assets/images/jj.png')} style={{ width: 280, height: 280, resizeMode: 'cover' }} />
              </View>
              {/* Close button in top right corner */}
              <TouchableOpacity 
                onPress={() => setShowRegisterModal(false)}
                style={{ 
                  position: 'absolute', 
                  top: 20, 
                  right: 20, 
                  zIndex: 1000,
                }}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
              {/* Top Bar */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingHorizontal: 20, marginTop: -20 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Enter your phone number</Text>
                </View>
              </View>
              <Text style={{ color: '#b0b8c1', fontSize: 16, textAlign: 'center', marginBottom: 20, paddingHorizontal: 20 }}>One quick text and you're in!</Text>
              {/* Phone Input */}
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#404040', borderRadius: 12, marginBottom: 20, paddingHorizontal: 12, height: 48, borderWidth: 1, borderColor: '#808080', marginHorizontal: 20 }}>
                <TouchableOpacity onPress={() => setShowCountryPicker(true)} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
                  <Text style={{ fontSize: 22 }}>{COUNTRIES.find(c => c.code === countryCode)?.flag || '🇬🇪'}</Text>
                  <Text style={{ color: '#fff', fontSize: 16, marginLeft: 4 }}>+{callingCode}</Text>
                  <Ionicons name="chevron-down" size={18} color="#fff" style={{ marginLeft: 2 }} />
                </TouchableOpacity>
                <TextInput
                  style={{ flex: 1, color: '#fff', fontSize: 16 }}
                  placeholder="Phone number"
                  placeholderTextColor="#b0b8c1"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad" returnKeyType="done" onSubmitEditing={() => {}}
                  maxLength={15}
                />
              </View>
              {/* Simple Country Picker Modal */}
              <Modal visible={showCountryPicker} animationType="slide" transparent onRequestClose={() => setShowCountryPicker(false)}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#202020', borderRadius: 16, width: '85%', maxHeight: '60%', borderWidth: 1, borderColor: '#808080' }}>
                    <ScrollView>
                      {COUNTRIES.map((country) => (
                        <TouchableOpacity
                          key={country.code}
                          style={{ flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#404040' }}
                          onPress={() => {
                            setCountryCode(country.code);
                            setCallingCode(country.callingCode);
                            setShowCountryPicker(false);
                          }}
                        >
                          <Text style={{ fontSize: 22, marginRight: 12 }}>{country.flag}</Text>
                          <Text style={{ color: '#fff', fontSize: 16, flex: 1 }}>{country.name}</Text>
                          <Text style={{ color: '#fff', fontSize: 16 }}>+{country.callingCode}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    <TouchableOpacity onPress={() => setShowCountryPicker(false)} style={{ alignItems: 'center', padding: 12, borderTopWidth: 1, borderTopColor: '#404040' }}>
                      <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <Animated.View style={{ transform: [{ scale: continueAnim }] }}>
                <TouchableOpacity
                  style={{ 
                    backgroundColor: '#404040', 
                    borderRadius: 12, 
                    paddingVertical: 12, 
                    alignItems: 'center', 
                    marginBottom: 20, 
                    height: 48,
                    borderWidth: 1,
                    borderColor: '#808080',
                    marginHorizontal: 20,
                  }}
                  onPress={() => {
                    Animated.sequence([
                      Animated.timing(continueAnim, { toValue: 0.95, duration: 80, useNativeDriver: true }),
                      Animated.timing(continueAnim, { toValue: 1, duration: 80, useNativeDriver: true })
                    ]).start();
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Let's Go!</Text>
                </TouchableOpacity>
              </Animated.View>

              <Text style={{ color: '#b0b8c1', fontSize: 12, marginBottom: 18, textAlign: 'center' }}>
                We respect your privacy. We only use your info to verify your account.
              </Text>
            </LinearGradient>
          </View>
        </View>
      </Modal>
      {/* Cuisine Modal */}
      <CuisineResultsModal
        visible={showCuisineModal}
        cuisine={selectedCuisine?.name}
        onClose={() => setShowCuisineModal(false)}
        restaurants={restaurants}
        loading={false}
        onRestaurantPress={(restaurant) => {
          setSelectedRestaurant(restaurant);
          setShowCuisineModal(false);
          setShowRestaurantModal(true);
        }}
        onBookRestaurant={(restaurant) => {
          setShowCuisineModal(false);
          setShowBookingModal(true);
        }}
      />
      {/* Search Modal */}
      <Modal
        visible={showSearchModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSearchModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)' }} />
          <LinearGradient
            colors={['#606060', '#202020', '#000000']}
            style={{ 
              borderRadius: 24, 
              width: '95%', 
              height: '85%',
              padding: 20,
              shadowColor: '#000',
              shadowOpacity: 0.9,
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 20 },
              elevation: 50,
              borderWidth: 1,
              borderColor: '#808080',
            }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: "700", color: "white", flex: 1 }}>
                Search
              </Text>
              <TouchableOpacity onPress={() => setShowSearchModal(false)}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={{ marginBottom: 20 }}>
              <TextInput
                style={{
                  backgroundColor: '#404040',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  color: '#fff',
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: '#808080',
                }}
                placeholder="Search restaurants..."
                placeholderTextColor="#b0b8c1"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {/* Default Location */}
            <View style={{ marginBottom: 20, zIndex: 1000 }}>
              <Text style={{ color: '#b0b8c1', fontSize: 14, marginBottom: 8 }}>Location</Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  style={{
                    backgroundColor: '#404040',
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: '#fff',
                    fontSize: 16,
                    borderWidth: 1,
                    borderColor: '#808080',
                    paddingLeft: 44,
                  }}
                  placeholder="Search location..."
                  placeholderTextColor="#b0b8c1"
                  value={locationQuery}
                  onChangeText={handleLocationSearch}
                  onFocus={() => setShowLocationSuggestions(true)}
                />
                <Ionicons 
                  name="location-outline" 
                  size={20} 
                  color="#FF8C00" 
                  style={{ 
                    position: 'absolute', 
                    left: 16, 
                    top: 12 
                  }} 
                />
              </View>
              
              {/* Location Suggestions */}
              {showLocationSuggestions && locationSuggestions.length > 0 && (
                <View style={{
                  position: 'absolute',
                  top: 60,
                  left: 0,
                  right: 0,
                  backgroundColor: '#404040',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#808080',
                  zIndex: 1001,
                  maxHeight: 150,
                  elevation: 10,
                }}>
                  <ScrollView>
                    {locationSuggestions.map((city, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          paddingVertical: 12,
                          paddingHorizontal: 16,
                          borderBottomWidth: index < locationSuggestions.length - 1 ? 1 : 0,
                          borderBottomColor: '#808080',
                        }}
                        onPress={() => {
                          setLocationQuery(city);
                          setShowLocationSuggestions(false);
                        }}
                      >
                        <Text style={{ color: '#fff', fontSize: 16 }}>{city}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Search Suggestions */}
            {searchSuggestions.length > 0 && (
              <View style={{ marginBottom: 20, zIndex: 100 }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Suggestions</Text>
                <ScrollView style={{ maxHeight: 200 }}>
                  {searchSuggestions.map((restaurant, index) => (
                    <TouchableOpacity
                      key={restaurant.id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: 8,
                        marginBottom: 8,
                      }}
                      onPress={() => {
                        setSelectedRestaurant(restaurant);
                        setShowSearchModal(false);
                        setShowRestaurantModal(true);
                      }}
                    >
                      <Image source={restaurant.image} style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }} />
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{restaurant.name}</Text>
                        <Text style={{ color: '#b0b8c1', fontSize: 14 }}>{restaurant.tags.join(' • ')}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#b0b8c1" />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Map Placeholder */}
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Map</Text>
              <View style={{
                backgroundColor: '#404040',
                borderRadius: 12,
                height: 200,
                borderWidth: 1,
                borderColor: '#808080',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Ionicons name="map-outline" size={48} color="#b0b8c1" />
                <Text style={{ color: '#b0b8c1', fontSize: 16, marginTop: 8 }}>Map placeholder</Text>
              </View>
            </View>
      </LinearGradient>
        </View>
      </Modal>
      {/* Cart Modal */}
      <Modal
        visible={showCartModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCartModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <BlurView intensity={40} tint="dark" style={{ ...StyleSheet.absoluteFill, bottom: 80 }} />
          <View style={{ ...StyleSheet.absoluteFillObject, bottom: 80, backgroundColor: 'rgba(0,0,0,0.7)' }} />
          <LinearGradient
            colors={['#606060', '#202020', '#000000']}
            style={{ 
              borderRadius: 24, 
              width: '90%', 
              maxHeight: '80%',
              padding: 24,
              shadowColor: '#000',
              shadowOpacity: 0.9,
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 20 },
              elevation: 50,
              borderWidth: 1,
              borderColor: '#808080',
            }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Your Cart</Text>
              <TouchableOpacity onPress={() => setShowCartModal(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Cart Items */}
            {cartItems.length === 0 ? (
              <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
                <Ionicons name="map-outline" size={64} color="#666" />
                <Text style={{ color: '#666', fontSize: 18, marginTop: 16 }}>Your cart is empty</Text>
                <Text style={{ color: '#666', fontSize: 14, marginTop: 8 }}>Add some delicious items from the menu!</Text>
                <Text style={{ color: '#b0b8c1', fontSize: 16, textAlign: 'center', marginTop: 24, paddingHorizontal: 20, lineHeight: 22 }}>
                  Book a table first to pre-order food and have it ready when you arrive.
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FF8C00',
                    borderRadius: 12,
                    paddingVertical: 14,
                    paddingHorizontal: 24,
                    marginTop: 20,
                  }}
                  onPress={() => {
                    setShowCartModal(false);
                    setShowBookingModal(true);
                    setBookingFromLolita(false);
                  }}
                >
                  <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', textAlign: 'center' }}>Book a Table</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <ScrollView style={{ maxHeight: 400, marginBottom: 20 }}>
                  {cartItems.map((item, index) => (
                    <View key={item.id} style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      backgroundColor: 'rgba(255,255,255,0.05)', 
                      borderRadius: 12, 
                      padding: 16, 
                      marginBottom: 12 
                    }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
                          {item.name}
                        </Text>
                        <Text style={{ color: '#b0b8c1', fontSize: 12, marginBottom: 8 }}>
                          {item.description}
                        </Text>
                        <Text style={{ color: '#FF8C00', fontSize: 16, fontWeight: 'bold' }}>
                          {item.price}
                        </Text>
                      </View>
                      
                      {/* Quantity Controls */}
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16 }}>
                        <TouchableOpacity 
                          style={{ 
                            width: 32, 
                            height: 32, 
                            borderRadius: 16, 
                            backgroundColor: '#FF8C00', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Ionicons name="remove" size={20} color="#000" />
                        </TouchableOpacity>
                        
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginHorizontal: 16 }}>
                          {item.quantity}
                        </Text>
                        
                        <TouchableOpacity 
                          style={{ 
                            width: 32, 
                            height: 32, 
                            borderRadius: 16, 
                            backgroundColor: '#FF8C00', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Ionicons name="add" size={20} color="#000" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>

                {/* Total Section */}
                <View style={{ 
                  borderTopWidth: 1, 
                  borderTopColor: '#404040', 
                  paddingTop: 20, 
                  marginBottom: 20 
                }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ color: '#b0b8c1', fontSize: 16 }}>Subtotal</Text>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                      {getCartTotal().toFixed(2)} GEL
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                    <Text style={{ color: '#b0b8c1', fontSize: 16 }}>VAT (18%)</Text>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                      {(getCartTotal() * 0.18).toFixed(2)} GEL
                    </Text>
                  </View>
                  <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    borderTopWidth: 1, 
                    borderTopColor: '#404040', 
                    paddingTop: 16 
                  }}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Total</Text>
                    <Text style={{ color: '#FF8C00', fontSize: 20, fontWeight: 'bold' }}>
                      {(getCartTotal() * 1.18).toFixed(2)} GEL
                    </Text>
                  </View>
                </View>

                {/* Checkout Button */}
                <TouchableOpacity
                  style={{ 
                    backgroundColor: '#FF8C00', 
                    borderRadius: 12, 
                    paddingVertical: 16, 
                    alignItems: 'center',
                    marginBottom: 10
                  }}
                  onPress={() => {
                    setShowCartModal(false);
                    setShowCheckoutModal(true);
                  }}
                >
                  <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>
                    Proceed to Order
                  </Text>
                </TouchableOpacity>

                {/* Continue Shopping Button */}
                <TouchableOpacity
                  style={{ 
                    backgroundColor: 'transparent', 
                    borderRadius: 12, 
                    paddingVertical: 16, 
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#FF8C00'
                  }}
                  onPress={() => {
                    setShowCartModal(false);
                    setSelectedRestaurant(restaurants.find(r => r.name === 'Lolita'));
                    setShowRestaurantModal(true);
                  }}
                >
                  <Text style={{ color: '#FF8C00', fontSize: 16, fontWeight: 'bold' }}>
                    Continue to Menu
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </LinearGradient>
        </View>
      </Modal>
      {/* Checkout Modal */}
      <Modal
        visible={showCheckoutModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCheckoutModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <BlurView intensity={40} tint="dark" style={{ ...StyleSheet.absoluteFill, bottom: 80 }} />
          <View style={{ ...StyleSheet.absoluteFillObject, bottom: 80, backgroundColor: 'rgba(0,0,0,0.7)' }} />
          <LinearGradient
            colors={['#606060', '#202020', '#000000']}
            style={{ 
              borderRadius: 24, 
              width: '90%', 
              maxHeight: '85%',
              padding: 24,
              shadowColor: '#000',
              shadowOpacity: 0.9,
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 20 },
              elevation: 50,
              borderWidth: 1,
              borderColor: '#808080',
            }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Checkout</Text>
              <TouchableOpacity onPress={() => setShowCheckoutModal(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 500 }}>
              {/* Order Summary */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Order Summary</Text>
                <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 16 }}>
                  {cartItems.map((item, index) => (
                    <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text style={{ color: '#b0b8c1', fontSize: 14 }}>
                        {item.name} x{item.quantity}
                      </Text>
                      <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
                        {(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)} GEL
                      </Text>
                    </View>
                  ))}
                  <View style={{ borderTopWidth: 1, borderTopColor: '#404040', paddingTop: 12, marginTop: 8 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text style={{ color: '#b0b8c1', fontSize: 14 }}>Subtotal</Text>
                      <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
                        {getCartTotal().toFixed(2)} GEL
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text style={{ color: '#b0b8c1', fontSize: 14 }}>VAT (18%)</Text>
                      <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
                        {(getCartTotal() * 0.18).toFixed(2)} GEL
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ color: '#FF8C00', fontSize: 16, fontWeight: 'bold' }}>Total</Text>
                      <Text style={{ color: '#FF8C00', fontSize: 16, fontWeight: 'bold' }}>
                        {(getCartTotal() * 1.18).toFixed(2)} GEL
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Order Details */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Order Details</Text>
                <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 16 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Ionicons name="restaurant" size={20} color="#FF8C00" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Lolita Restaurant</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Ionicons name="calendar" size={20} color="#FF8C00" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#b0b8c1', fontSize: 14 }}>Reservation Date: Today</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Ionicons name="time" size={20} color="#FF8C00" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#b0b8c1', fontSize: 14 }}>Reservation Time: 7:00 PM</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Ionicons name="people" size={20} color="#FF8C00" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#b0b8c1', fontSize: 14 }}>Table for: 2 people</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name="fast-food" size={20} color="#FF8C00" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#b0b8c1', fontSize: 14 }}>Pre-ordered items:</Text>
                  </View>
                  <View style={{ marginLeft: 28 }}>
                    {cartItems.map((item, index) => (
                      <Text key={item.id} style={{ color: '#b0b8c1', fontSize: 12, marginBottom: 2 }}>
                        • {item.name} x{item.quantity}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>



              {/* Payment Method */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Payment Method</Text>
                <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 16 }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: '#404040'
                    }}
                    onPress={() => setPaymentMethod('card')}
                  >
                    <Ionicons 
                      name={paymentMethod === 'card' ? 'radio-button-on' : 'radio-button-off'} 
                      size={24} 
                      color={paymentMethod === 'card' ? '#FF8C00' : '#666'} 
                    />
                    <Ionicons name="card" size={20} color="#FF8C00" style={{ marginLeft: 12, marginRight: 8 }} />
                    <Text style={{ color: '#fff', fontSize: 16 }}>Credit/Debit Card</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12
                    }}
                    onPress={() => setPaymentMethod('apple')}
                  >
                    <Ionicons 
                      name={paymentMethod === 'apple' ? 'radio-button-on' : 'radio-button-off'} 
                      size={24} 
                      color={paymentMethod === 'apple' ? '#FF8C00' : '#666'} 
                    />
                    <Ionicons name="logo-apple" size={20} color="#FF8C00" style={{ marginLeft: 12, marginRight: 8 }} />
                    <Text style={{ color: '#fff', fontSize: 16 }}>Apple Pay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            {/* Place Order Button */}
            <TouchableOpacity
              style={{ 
                backgroundColor: '#FF8C00', 
                borderRadius: 12, 
                paddingVertical: 16, 
                alignItems: 'center',
                marginTop: 16
              }}
              onPress={() => {
                // Handle order placement
                alert('Order placed successfully! Your food will be ready when you arrive at 7:00 PM.');
                setShowCheckoutModal(false);
                setCartItems([]);
                setDeliveryAddress('');
                setPhoneNumber('');
              }}
            >
              <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>
                Place Order - {(getCartTotal() * 1.18).toFixed(2)} GEL
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
      {/* Reservations Modal */}
      <Modal
        visible={showReservationsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowReservationsModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <BlurView intensity={40} tint="dark" style={{ ...StyleSheet.absoluteFill, bottom: 80 }} />
          <View style={{ ...StyleSheet.absoluteFillObject, bottom: 80, backgroundColor: 'rgba(0,0,0,0.7)' }} />
          <LinearGradient
            colors={['#606060', '#202020', '#000000']}
            style={{ 
              borderRadius: 24, 
              width: '90%', 
              maxHeight: '85%',
              padding: 24,
              shadowColor: '#000',
              shadowOpacity: 0.9,
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 20 },
              elevation: 50,
              borderWidth: 1,
              borderColor: '#808080',
            }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>My Reservations</Text>
              <TouchableOpacity onPress={() => setShowReservationsModal(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 500 }}>
              {/* Current Reservations */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ color: '#FF8C00', fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Current Reservations</Text>
                <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 16 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Ionicons name="restaurant" size={20} color="#FF8C00" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Lolita Restaurant</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name="calendar" size={20} color="#FF8C00" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#b0b8c1', fontSize: 14 }}>Today, 7:00 PM</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name="people" size={20} color="#FF8C00" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#b0b8c1', fontSize: 14 }}>Table for 2 people</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name="fast-food" size={20} color="#FF8C00" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#b0b8c1', fontSize: 14 }}>Pre-ordered items:</Text>
                  </View>
                  <View style={{ marginLeft: 28 }}>
                    <Text style={{ color: '#b0b8c1', fontSize: 12, marginBottom: 2 }}>• Cheesesticks x1</Text>
                    <Text style={{ color: '#b0b8c1', fontSize: 12, marginBottom: 2 }}>• Avocado Toast x2</Text>
                    <Text style={{ color: '#b0b8c1', fontSize: 12, marginBottom: 2 }}>• Truffle Fries x1</Text>
                  </View>
                </View>
              </View>

              {/* Previous Reservations */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ color: '#b0b8c1', fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Previous Reservations</Text>
                <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 16 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Ionicons name="restaurant" size={20} color="#666" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#666', fontSize: 16, fontWeight: 'bold' }}>Honoré Restaurant</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name="calendar" size={20} color="#666" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#666', fontSize: 14 }}>Yesterday, 6:30 PM</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name="people" size={20} color="#666" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#666', fontSize: 14 }}>Table for 4 people</Text>
                  </View>
                </View>
                
                <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 16, marginTop: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Ionicons name="restaurant" size={20} color="#666" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#666', fontSize: 16, fontWeight: 'bold' }}>Rooms Tbilisi</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name="calendar" size={20} color="#666" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#666', fontSize: 14 }}>Last Week, 8:00 PM</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name="people" size={20} color="#666" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#666', fontSize: 14 }}>Table for 2 people</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>
      {/* Saved Modal */}
      <Modal
        visible={showSavedModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSavedModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <BlurView intensity={40} tint="dark" style={{ ...StyleSheet.absoluteFill, bottom: 80 }} />
          <View style={{ ...StyleSheet.absoluteFillObject, bottom: 80, backgroundColor: 'rgba(0,0,0,0.7)' }} />
          <LinearGradient
            colors={['#606060', '#202020', '#000000']}
            style={{ 
              borderRadius: 24, 
              width: '90%', 
              maxHeight: '85%',
              padding: 24,
              shadowColor: '#000',
              shadowOpacity: 0.9,
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 20 },
              elevation: 50,
              borderWidth: 1,
              borderColor: '#808080',
            }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Saved Restaurants</Text>
              <TouchableOpacity onPress={() => setShowSavedModal(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 500 }}>
              {Object.keys(favorites).filter(id => favorites[id]).length === 0 ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
                  <Ionicons name="bookmark-outline" size={64} color="#FF8C00" />
                  <Text style={{ color: '#666', fontSize: 18, marginTop: 16, textAlign: 'center' }}>No saved restaurants</Text>
                  <Text style={{ color: '#666', fontSize: 14, marginTop: 8, textAlign: 'center' }}>Tap the bookmark icon to save your favorite restaurants!</Text>
                </View>
              ) : (
                [
                  ...restaurants,
                  ...trendingRestaurants,
                  ...wineTastingVenues,
                  ...outdoorDiningRestaurants,
                  ...rooftopRestaurants,
                  ...dateNightRestaurants
                ]
                  .filter(restaurant => favorites[restaurant.id])
                  .map(restaurant => (
                    <TouchableOpacity 
                      key={restaurant.id} 
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.05)', 
                        borderRadius: 12, 
                        padding: 16, 
                        marginBottom: 12,
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                      onPress={() => {
                        setSelectedRestaurant(restaurant);
                        setShowSavedModal(false);
                        setShowRestaurantModal(true);
                      }}
                    >
                      <Image source={restaurant.image} style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }} />
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
                          {restaurant.name}
                        </Text>
                        <Text style={{ color: '#b0b8c1', fontSize: 12, marginBottom: 4 }}>
                          {restaurant.tags ? restaurant.tags.join(' • ') : restaurant.cuisine || ''}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Ionicons name="star" size={14} color="#FFD700" style={{ marginRight: 4 }} />
                          <Text style={{ color: '#FFD700', fontSize: 12, fontWeight: 'bold' }}>{restaurant.rating || 'N/A'}</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{ 
                          padding: 8, 
                          backgroundColor: 'rgba(255,140,0,0.2)', 
                          borderRadius: 20,
                          borderWidth: 1,
                          borderColor: '#FF8C00'
                        }}
                        onPress={() => setFavorites(favs => ({ ...favs, [restaurant.id]: false }))}
                      >
                        <Ionicons name="bookmark" size={20} color="#FF8C00" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))
              )}
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>
      </LinearGradient>
      
      {/* Map Modal */}
      <Modal visible={showMapModal} animationType="slide" onRequestClose={() => setShowMapModal(false)} transparent={true}>
        <BlurView intensity={20} style={{ ...StyleSheet.absoluteFill, bottom: 80 }}>
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <LinearGradient colors={["rgba(0, 0, 0, 0.9)", "rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.9)"]} style={{ flex: 1, paddingTop: 60, paddingHorizontal: 16 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold" }}>Restaurant Map</Text>
                <TouchableOpacity onPress={() => setShowMapModal(false)}>
                  <Ionicons name="close" size={28} color="#fff" />
                </TouchableOpacity>
              </View>
              
              {/* Search Bar */}
              <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#1a1a1a", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 20 }}>
                <Ionicons name="search" size={20} color="#b0b8c1" style={{ marginRight: 12 }} />
                <TextInput
                  style={{ flex: 1, color: "#fff", fontSize: 16 }}
                  placeholder="Search restaurants..."
                  placeholderTextColor="#b0b8c1"
                />
              </View>
              
              {/* Filter Buttons */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                <TouchableOpacity style={{ backgroundColor: "#FF8C00", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 12 }}>
                  <Text style={{ color: "#000", fontSize: 14, fontWeight: "600" }}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#1a1a1a", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 12, borderWidth: 1, borderColor: "#333" }}>
                  <Text style={{ color: "#fff", fontSize: 14 }}>Georgian</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#1a1a1a", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 12, borderWidth: 1, borderColor: "#333" }}>
                  <Text style={{ color: "#fff", fontSize: 14 }}>Italian</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#1a1a1a", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 12, borderWidth: 1, borderColor: "#333" }}>
                  <Text style={{ color: "#fff", fontSize: 14 }}>Fine Dining</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#1a1a1a", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 12, borderWidth: 1, borderColor: "#333" }}>
                  <Text style={{ color: "#fff", fontSize: 14 }}>Outdoor</Text>
                </TouchableOpacity>
              </ScrollView>
              
              {/* Map Placeholder */}
              <View style={{ flex: 1, backgroundColor: "#1a1a1a", borderRadius: 16, marginBottom: 20, justifyContent: "center", alignItems: "center" }}>
                <Ionicons name="map" size={64} color="#404040" />
                <Text style={{ color: "#666", fontSize: 18, marginTop: 16, textAlign: "center" }}>Map Integration Coming Soon</Text>
                <Text style={{ color: "#666", fontSize: 14, marginTop: 8, textAlign: "center" }}>Interactive restaurant map will be displayed here</Text>
              </View>
              
              {/* Quick Actions */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                <TouchableOpacity style={{ backgroundColor: "#1a1a1a", borderRadius: 12, padding: 16, flex: 1, marginRight: 8, borderWidth: 1, borderColor: "#333" }}>
                  <Ionicons name="location" size={24} color="#FF8C00" style={{ marginBottom: 8 }} />
                  <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>My Location</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#1a1a1a", borderRadius: 12, padding: 16, flex: 1, marginLeft: 8, borderWidth: 1, borderColor: "#333" }}>
                  <Ionicons name="star" size={24} color="#FF8C00" style={{ marginBottom: 8 }} />
                  <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>Favorites</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </BlurView>
      </Modal>
      
      {/* Bottom Navigation Bar - Always Visible */}
      <SafeAreaView style={[styles.tabBarContainer, { position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 9999 }]} edges={['bottom']}>
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => {
            setActiveTab('Home');
            setShowRestaurantModal(false);
            setShowBookingModal(false);
            setShowRegisterModal(false);
            setShowCuisineModal(false);
            setShowSearchModal(false);
            setShowCartModal(false);
            setShowCheckoutModal(false);
            setShowReservationsModal(false);
            setShowSavedModal(false);
            setShowAllTrending(false);
            setShowAllDateNight(false);
          }}>
            <Ionicons name={activeTab === 'Home' ? 'ellipse' : 'ellipse-outline'} size={28} color={activeTab === 'Home' ? '#FF8C00' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Home' && styles.tabLabelActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setShowSearchModal(true)}>
            <Ionicons name="search" size={26} color={activeTab === 'Search' ? '#FF8C00' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Search' && styles.tabLabelActive]}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setShowSavedModal(true)}>
            <Ionicons name="bookmark-outline" size={26} color={activeTab === 'Saved' ? '#FF8C00' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Saved' && styles.tabLabelActive]}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setShowMapModal(true)}>
            <Ionicons name="map-outline" size={26} color={activeTab === 'Map' ? '#FF8C00' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Map' && styles.tabLabelActive]}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setShowReservationsModal(true)}>
            <Ionicons name="calendar-outline" size={26} color={activeTab === 'Reservations' ? '#FF8C00' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Reservations' && styles.tabLabelActive]}>Reservations</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  headerText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  selectorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 8,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#404040',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  selectorText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
  },
  restaurantCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    width: width * 0.7,
    marginRight: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  restaurantImage: {
    width: '100%',
    height: 110,
    borderRadius: 12,
    marginBottom: 8,
  },
  restaurantName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  restaurantTags: {
    color: '#b0b8c1',
    fontSize: 13,
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: 'bold',
  },
  timesRowEven: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
  },
  timeButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  timeButtonSmall: {
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
  },
  timeButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timeButtonTextSmall: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cuisineHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
    marginBottom: 0,
    marginRight: 16,
  },
  cuisineViewAll: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  cuisineCarousel: {
    marginTop: 16,
    marginBottom: 16,
  },
  cuisineItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 100,
  },
  cuisineFrame: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#404040',
  },
  cuisineImageLarge: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  cuisineText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  trendingTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  trendingListSection: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  trendingCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2a2a2a',
    borderRadius: 18,
    marginBottom: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    borderWidth: 1,
    borderColor: '#000000',
    elevation: 25,
    transform: [{ scale: 1.02 }],
  },
  trendingImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },
  trendingInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  trendingName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  trendingLocation: {
    color: '#b0b8c1',
    fontSize: 13,
    marginBottom: 1,
  },
  trendingCuisine: {
    color: '#b0b8c1',
    fontSize: 13,
    marginBottom: 2,
  },
  trendingRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  trendingReviews: {
    color: '#b0b8c1',
    fontSize: 13,
    marginLeft: 4,
  },
  trendingMeta: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 12,
    minWidth: 60,
  },
  trendingMetaText: {
    color: '#fff',
    fontSize: 13,
    marginTop: 2,
    textAlign: 'right',
  },
  seeAllButton: {
    backgroundColor: 'transparent',
    borderRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  seeAllButtonText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    width: '92%',
    maxHeight: '80%',
    padding: 18,
  },
  wineTastingTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  wineCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    width: 220,
    marginRight: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'flex-start',
  },
  wineImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  wineName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  wineTags: {
    color: '#b0b8c1',
    fontSize: 13,
    marginBottom: 2,
  },
  wineTimesRow: {
    flexDirection: 'row',
    marginTop: 8,
    width: '100%',
    justifyContent: 'flex-start',
  },
  timeButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  timeButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  outdoorDiningTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  outdoorCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    width: 200,
    height: 320,
    marginRight: 20,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'flex-start',
  },
  outdoorImage: {
    width: '100%',
    height: 200,
    borderRadius: 14,
  },
  outdoorName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
  },
  outdoorTags: {
    color: '#b0b8c1',
    fontSize: 14,
    marginTop: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 0,
    marginHorizontal: 16,
  },
  wineCarousel: {
    marginTop: 12,
    marginBottom: 16,
  },
  outdoorCarousel: {
    marginTop: 12,
    marginBottom: 0,
  },
  cuisineSectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rooftopTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
    marginTop: 24,
  },
  rooftopListSection: {
    paddingHorizontal: 8,
    marginBottom: 32,
  },
  rooftopCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    marginBottom: 20,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  rooftopImage: {
    width: '100%',
    height: 180,
    borderRadius: 14,
  },
  rooftopBookmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
    padding: 2,
  },
  rooftopName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  rooftopTags: {
    color: '#b0b8c1',
    fontSize: 14,
    marginTop: 2,
  },
  rooftopMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  rooftopRating: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  rooftopPeople: {
    color: '#fff',
    fontSize: 14,
  },
  rooftopDesc: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
  },
  tabBarContainer: {
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#232B3B',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    backgroundColor: '#000000',
    paddingBottom: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  tabLabel: {
    color: '#b0b8c1',
    fontSize: 13,
    marginTop: 2,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#FF8C00',
    fontWeight: '700',
  },
  stickyHeaderSafe: {
    backgroundColor: 'transparent',
    zIndex: 10,
    position: 'sticky',
    top: 0,
  },
  stickyHeader: {
    backgroundColor: 'transparent',
    paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight : 0) + 10,
    paddingBottom: 2,
    paddingHorizontal: 0,
    borderBottomWidth: 0,
    zIndex: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
}); 