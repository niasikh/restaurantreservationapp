import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, FlatList, Dimensions, Modal, Pressable, Platform, SafeAreaView, StatusBar, Animated } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COUNTRIES } from './countries.js';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

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
    image: require('../assets/images/honore.jpg'),
    tags: ['$$$', 'Georgian', 'European', 'Barbecue', 'Cocktail Bar'],
    rating: 4.8,
    times: ['5:45 PM', '6:00 PM', '6:15 PM'],
  },
];

const cuisines = [
  { id: '1', name: 'Georgian', image: require('../assets/images/georgian.jpg') },
  { id: '2', name: 'Pizza', image: require('../assets/images/pizza.jpg') },
  { id: '3', name: 'Italian', image: require('../assets/images/italian.jpg') },
  { id: '4', name: 'Brunch', image: require('../assets/images/brunch.jpg') },
  { id: '5', name: 'American', image: require('../assets/images/icon.png') },
  { id: '6', name: 'Sushi', image: require('../assets/images/icon.png') },
  { id: '7', name: 'Ukrainian', image: require('../assets/images/icon.png') },
  { id: '8', name: 'Mexican', image: require('../assets/images/icon.png') },
  { id: '9', name: 'European', image: require('../assets/images/icon.png') },
  { id: '10', name: 'Fine Dining', image: require('../assets/images/icon.png') },
  { id: '11', name: 'Seafood', image: require('../assets/images/icon.png') },
  { id: '12', name: 'Vegetarian', image: require('../assets/images/icon.png') },
  { id: '13', name: 'Vegan', image: require('../assets/images/icon.png') },
  { id: '14', name: 'Indian', image: require('../assets/images/icon.png') },
  { id: '15', name: 'Chinese', image: require('../assets/images/icon.png') },
  { id: '16', name: 'Burgers', image: require('../assets/images/icon.png') },
  { id: '17', name: 'Soups', image: require('../assets/images/icon.png') },
  { id: '18', name: 'Breakfast', image: require('../assets/images/icon.png') },
  { id: '19', name: 'Bakery', image: require('../assets/images/icon.png') },
  { id: '20', name: 'Wine Bar', image: require('../assets/images/icon.png') },
  // Add more from backend as needed
];

// Add trending restaurants sample data
const trendingRestaurants = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
    id: '6',
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
    id: '7',
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
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
    id: '1',
    name: 'Bachata Gardens',
    image: require('../assets/images/lolita.jpg'),
    tags: ['European', 'Outdoor'],
    favorite: false,
  },
  {
    id: '2',
    name: 'Miti Taverna',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Greek', 'Outdoor'],
    favorite: true,
  },
  {
    id: '3',
    name: 'Keto & Kote',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Georgian', 'Outdoor'],
    favorite: false,
  },
  {
    id: '4',
    name: 'Tsiskvili',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Georgian', 'Outdoor'],
    favorite: false,
  },
  {
    id: '5',
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
    id: '1',
    name: 'Republic Tbilisi',
    image: require('../assets/images/lolita.jpg'),
    tags: ['European', '$$$', 'Downtown'],
    rating: 4.8,
    people: 120,
    description: 'Enjoy city views and modern European cuisine in the center of Tbilisi',
    favorite: false,
  },
  {
    id: '2',
    name: 'Filini Terrace',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Italian', '$$', 'Midtown'],
    rating: 4.7,
    people: 80,
    description: 'Italian classics and cocktails with a skyline backdrop.',
    favorite: true,
  },
  {
    id: '3',
    name: 'Monograph Terrace',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Bar & Restaurant', '$$', 'Uptown'],
    rating: 4.6,
    people: 60,
    description: 'Trendy rooftop bar with creative drinks and city lights.',
    favorite: false,
  },
  {
    id: '4',
    name: 'Xeme Biltmore',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Mediterranean', '$$$', 'Old Town'],
    rating: 4.9,
    people: 100,
    description: 'Mediterranean flavors and open-air dining with a view.',
    favorite: false,
  },
  {
    id: '5',
    name: 'Paragraph',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Seafood', '$$$', 'Seaside'],
    rating: 4.7,
    people: 90,
    description: 'Explore Georgian culture in contemporary luxury setting in the heart of Tbilisi',
    favorite: true,
  },
  {
    id: '6',
    name: 'Tiflis Veranda',
    image: require('../assets/images/lolita.jpg'),
    tags: ['International cuisine', '$$$', 'Financial District'],
    rating: 4.8,
    people: 110,
    description: 'Enjoy exquisite dishes, live music, and mesmerizing views with local wines',
    favorite: false,
  },
  {
    id: '7',
    name: 'Sofiko',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Georgian casual dining', '$$', 'Downtown'],
    rating: 4.5,
    people: 150,
    description: 'Enjoy outstanding views with dishes inspired by the timeless culture of Tbilisi city',
    favorite: false,
  },
  {
    id: '8',
    name: 'Atmosphere Bar',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Asian Fusion Restaurant', '$$', 'Midtown'],
    rating: 4.6,
    people: 70,
    description: 'Fusion cuisine, crafted drinks, and city views',
    favorite: false,
  },
  {
    id: '9',
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
    id: '1',
    name: 'Barbarestan',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Modern Georgian fine dining', 'Romantic'],
    favorite: true,
  },
  {
    id: '2',
    name: 'Casa Fiori',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Modern Italian Restaurant & Cocktail Bar', 'Intimate'],
    favorite: false,
  },
  {
    id: '3',
    name: 'Ambrosiano',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Italy\'s finest artisan dishes', 'Romantic'],
    favorite: false,
  },
  {
    id: '4',
    name: 'Madre',
    image: require('../assets/images/lolita.jpg'),
    tags: ['Spanish', 'Date Night'],
    favorite: true,
  },
  {
    id: '5',
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

  return (
    <LinearGradient
      colors={['#606060', '#202020', '#000000']}
      style={{ flex: 1 }}
    >
      {/* Sticky Header */}
      <SafeAreaView style={styles.stickyHeaderSafe}>
        <View style={styles.stickyHeader}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Ready to book your table?</Text>
            <TouchableOpacity style={styles.selectorButton} onPress={() => setShowRegisterModal(true)}>
              <Ionicons name="person-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {/* Selector Buttons */}
          <View style={styles.selectorsRow}>
            <TouchableOpacity style={styles.selectorButton} onPress={() => setShowBookingModal(true)}>
              <Ionicons name="people-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.selectorText}>{partySize} • {selectedTime} {selectedDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectorButton}>
              <Ionicons name="location-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.selectorText}>Tbilisi, Georgia</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
      {/* Main Scrollable Content */}
      <ScrollView
        style={[styles.container, { paddingTop: 160 }]}
        contentContainerStyle={{ paddingBottom: 16 }}
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
              <Image source={item.image} style={styles.restaurantImage} />
              <Text style={styles.restaurantName}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 0, marginLeft: 0 }}>
                <Text style={[styles.restaurantTags, { flex: 1 }]}> 
                  {item.tags.map((tag, idx) => {
                    if (
                      (item.name === 'Lolita' && tag === 'Cocktail Bar') ||
                      (item.name === 'Rooms Tbilisi' && tag === 'Farm-to-Table')
                    ) {
                      return (
                        <React.Fragment key={tag}>
                          {tag}
                          {' '}
                          <Ionicons name="star" size={14} color="#FFD700" />
                          <Text style={styles.ratingText}>{item.rating}</Text>
                          {idx < item.tags.length - 1 ? ' • ' : ''}
                        </React.Fragment>
                      );
                    }
                    return (
                      <React.Fragment key={tag}>
                        {tag}{idx < item.tags.length - 1 ? ' • ' : ''}
                      </React.Fragment>
                    );
                  })}
                  {item.name === 'Honoré' && (
                    <>
                      {' '}
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </>
                  )}
                </Text>
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
            <Text style={styles.cuisineViewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cuisineCarousel} contentContainerStyle={{ paddingLeft: 8, paddingRight: 8 }}>
          {cuisines.map(cuisine => (
            <View key={cuisine.id} style={styles.cuisineItem}>
              <Image source={cuisine.image} style={styles.cuisineImageLarge} />
              <Text style={styles.cuisineText}>{cuisine.name}</Text>
            </View>
          ))}
        </ScrollView>
        {/* Trending Section */}
        <Text style={styles.trendingTitle}>See what's trending</Text>
        {/* Trending Restaurants Section */}
        <View style={styles.trendingListSection}>
          {(showAllTrending ? trendingRestaurants : trendingRestaurants.slice(0, 5)).map((r) => (
            <View key={r.id} style={styles.trendingCard}>
              <Image source={r.image} style={styles.trendingImage} />
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
                    <Image source={r.image} style={styles.trendingImage} />
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
            <Text style={styles.cuisineViewAll}>View all</Text>
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
            <Text style={styles.cuisineViewAll}>View all</Text>
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
      {/* Bottom Navigation Bar */}
      <SafeAreaView style={styles.tabBarContainer} edges={['bottom']}>
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Home')}>
            <Ionicons name={activeTab === 'Home' ? 'ellipse' : 'ellipse-outline'} size={28} color={activeTab === 'Home' ? '#FF8C00' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Home' && styles.tabLabelActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Search')}>
            <Ionicons name="search" size={26} color={activeTab === 'Search' ? '#FF8C00' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Search' && styles.tabLabelActive]}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Favorites')}>
            <Ionicons name="bookmark-outline" size={26} color={activeTab === 'Favorites' ? '#FF8C00' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Favorites' && styles.tabLabelActive]}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Bookings')}>
            <Ionicons name="calendar-outline" size={26} color={activeTab === 'Bookings' ? '#FF8C00' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Bookings' && styles.tabLabelActive]}>Bookings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)' }} />
          <View style={{ backgroundColor: '#f2be35', borderRadius: 24, width: '85%', padding: 20 }}>
            <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold', marginBottom: 18 }}>Party size</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
              {partySizes.map(size => (
                <TouchableOpacity
                  key={size}
                  onPress={() => setPartySize(size)}
                  style={{
                    width: 44, height: 44, borderRadius: 22, borderWidth: 2,
                    borderColor: partySize === size ? '#000000' : '#000000',
                    alignItems: 'center', justifyContent: 'center', marginRight: 12,
                    backgroundColor: partySize === size ? '#FF8C00' : '#000000',
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: partySize === size ? 'bold' : 'normal' }}>{size}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Date and time</Text>
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
                      <Text style={{ color: '#000', fontSize: 16 }}>{opt.label}</Text>
                    </View>
                  ))}
                </ScrollView>
                {/* Fixed pill outline for date */}
                <View style={{ position: 'absolute', top: 76, left: 0, width: 140, height: 38, justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
                  <View style={{ paddingVertical: 10, paddingHorizontal: 0, borderRadius: 28, borderWidth: 2, borderColor: '#000000', alignSelf: 'center', minWidth: 0, minHeight: 38 }}>
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
                      <Text style={{ color: '#000', fontSize: 16 }}>{t}</Text>
                    </View>
                  ))}
                </ScrollView>
                {/* Fixed pill outline for time */}
                <View style={{ position: 'absolute', top: 76, left: 0, width: 120, height: 38, justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
                  <View style={{ paddingVertical: 10, paddingHorizontal: 0, borderRadius: 28, borderWidth: 2, borderColor: '#000000', alignSelf: 'center', minWidth: 0, minHeight: 38 }}>
                    <Text style={{ color: 'transparent', fontSize: 16, paddingHorizontal: 24 }}>
                      {timeOptions[timeScrollIndex] || ''}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{ backgroundColor: '#000000', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8 }}
              onPress={() => setShowBookingModal(false)}
            >
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>
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
            <View style={{ backgroundColor: '#f2be35', borderRadius: 24, width: '85%', padding: 0, overflow: 'hidden', maxHeight: '85%' }}>
                              {/* Logo at the top */}
                <View style={{ alignItems: 'center', marginTop: 4, marginBottom: 4 }}>
                  <Image source={require('../assets/images/nia.png')} style={{ width: 140, height: 140, resizeMode: 'contain' }} />
                </View>
              {/* Top Bar */}
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Enter your phone number</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setShowRegisterModal(false)} style={{ position: 'absolute', right: 12, top: 12 }}>
                <Ionicons name="close" size={24} color="#000000" />
              </TouchableOpacity>
              <Text style={{ color: '#000', fontSize: 16, textAlign: 'center', marginHorizontal: 24, marginBottom: 8 }}>One quick text and you're in!</Text>
              {/* Phone Input */}
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#000000', borderRadius: 12, marginHorizontal: 24, marginTop: 18, marginBottom: 8, paddingHorizontal: 12, height: 48 }}>
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
                  keyboardType="phone-pad"
                  maxLength={15}
                />
              </View>
              {/* Simple Country Picker Modal */}
              <Modal visible={showCountryPicker} animationType="slide" transparent onRequestClose={() => setShowCountryPicker(false)}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#23283a', borderRadius: 16, width: '80%', maxHeight: '70%' }}>
                    <ScrollView>
                      {COUNTRIES.map((country) => (
                        <TouchableOpacity
                          key={country.code}
                          style={{ flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#222' }}
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
                    <TouchableOpacity onPress={() => setShowCountryPicker(false)} style={{ alignItems: 'center', padding: 12 }}>
                      <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <Animated.View style={{ transform: [{ scale: continueAnim }] }}>
                <TouchableOpacity
                  style={{ backgroundColor: '#000000', borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginHorizontal: 24, marginBottom: 12, height: 48 }}
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

              <Text style={{ color: '#000', fontSize: 12, marginHorizontal: 24, marginBottom: 18, textAlign: 'center' }}>
                We respect your privacy. We only use your info to verify your account.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      {/* Restaurant Details Modal */}
      <Modal
        visible={showRestaurantModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRestaurantModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* Blurred background overlay */}
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)' }} />
          <View style={{ backgroundColor: '#1a2233', borderRadius: 24, width: '92%', maxWidth: 420, padding: 24, alignSelf: 'center', justifyContent: 'center' }}>
            {/* Row for name, bookmark, and X button aligned */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, position: 'relative' }}>
              <Text style={{ color: '#000', fontSize: 22, fontWeight: 'bold', flex: 1 }}>
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
                <Ionicons name="close" size={28} color="#fff" />
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
                  <Image source={require("../assets/images/icon.png")} style={{ width: 340, height: 180, borderRadius: 16, marginRight: 12 }} />
                  <Image source={require("../assets/images/icon.png")} style={{ width: 340, height: 180, borderRadius: 16, marginRight: 12 }} />
                  <Image source={require("../assets/images/icon.png")} style={{ width: 340, height: 180, borderRadius: 16, marginRight: 12 }} />
                  <Image source={require("../assets/images/icon.png")} style={{ width: 340, height: 180, borderRadius: 16, marginRight: 12 }} />
                  <Image source={require("../assets/images/icon.png")} style={{ width: 340, height: 180, borderRadius: 16 }} />
                </ScrollView>
              </View>
            ) : (
              <Image source={selectedRestaurant?.image} style={{ width: '100%', height: 180, borderRadius: 16, marginBottom: 16 }} />
            )}
            {selectedRestaurant?.name === 'Lolita' ? (
              <>
                {/* Description row with $$ New-American, Cocktail Bar and 4.3 stars */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                  <Text style={{ color: '#b0b8c1', fontSize: 15, marginRight: 8 }}>
                    $$ New-American, Cocktail Bar
                  </Text>
                  <Ionicons name="star" size={16} color="#FFD700" style={{ marginRight: 2 }} />
                  <Text style={{ color: '#FFD700', fontSize: 15, fontWeight: 'bold', marginRight: 2 }}>4.3</Text>
                </View>
                {/* Second description, smaller */}
                <Text style={{ color: '#000', fontSize: 13, marginBottom: 18 }}>
                  Stylish courtyard hotspot in Tbilisi, offering comfort food and cocktails in cool industrial-chic setting. Perfect for Brunch, dinner, and late-night drinks!
                </Text>
                {/* Booking button/modal (identical to header) */}
                <TouchableOpacity
                  style={{ backgroundColor: '#000000', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 18 }}
                  onPress={() => setShowBookingModal(true)}
                >
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Book a Table</Text>
                </TouchableOpacity>
                {/* Menu Section */}
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Menu</Text>
                <ScrollView style={{ maxHeight: 220, marginBottom: 8 }}>
                  {/* 20 sample dishes */}
                  {[...Array(20)].map((_, i) => (
                    i === 0 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12 }}>
                        <Image source={require("../assets/images/icon.png")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Cheese Sticks</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 13 }}>Sweet Chili Sauce, Sulguni Cheese, Panko, Garlic, Egg</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Appetizer</Text>
                        </View>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }}>17 GEL</Text>
                      </View>
                    ) : i === 1 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12 }}>
                        <Image source={require("../assets/images/icon.png")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Avocado Toast</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 13 }}>Avocado, Red Onion, Garlic, Coriander, Olive Oil, Lime</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Appetizer</Text>
                        </View>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }}>17 GEL</Text>
                      </View>
                    ) : i === 2 ? (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12 }}>
                        <Image source={require("../assets/images/icon.png")} style={{ width: 64, height: 64, borderRadius: 16, marginRight: 14, resizeMode: 'cover' }} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Margherita Pizza</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 13 }}>Tomato sauce, Fresh Mozzarella</Text>
                          <Text style={{ color: '#b0b8c1', fontWeight: 'bold', fontSize: 13 }}>Pizzette</Text>
                        </View>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }}>19 GEL</Text>
                      </View>
                    ) : (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12 }}>
                        <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: '#23283a', marginRight: 14, justifyContent: 'center', alignItems: 'center' }}>
                          <Ionicons name="fast-food-outline" size={32} color="#fff" />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Sample Dish {i + 1}</Text>
                          <Text style={{ color: '#b0b8c1', fontSize: 13 }}>A delicious sample dish description goes here.</Text>
                        </View>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }}>$15.00</Text>
                      </View>
                    )
                  ))}
                  {/* 10 sample drinks */}
                  <Text style={{ color: '#000', fontSize: 17, fontWeight: 'bold', marginTop: 10, marginBottom: 8 }}>Drinks</Text>
                  {[...Array(10)].map((_, i) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 12 }}>
                      <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: '#23283a', marginRight: 14, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="wine-outline" size={32} color="#fff" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Sample Drink {i + 1}</Text>
                        <Text style={{ color: '#b0b8c1', fontSize: 13 }}>A refreshing sample drink description goes here.</Text>
                      </View>
                      <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }}>$8.00</Text>
                    </View>
                  ))}
                </ScrollView>
              </>
            ) : (
              // Default for other restaurants
              <Text style={{ color: '#b0b8c1', fontSize: 16, marginBottom: 12 }}>
                {selectedRestaurant?.tags?.join(' • ')}
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 72,
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
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
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
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
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
    marginTop: 32,
    marginBottom: 16,
  },
  cuisineItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 100,
  },
  cuisineImageLarge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 4,
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
    backgroundColor: '#1a2747',
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
    backgroundColor: '#000000',
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
    backgroundColor: '#1a2747',
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
    backgroundColor: '#1a2747',
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
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: '#232B3B',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    backgroundColor: 'transparent',
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
    paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight : 0) + 72,
    paddingBottom: 2,
    paddingHorizontal: 0,
    borderBottomWidth: 0,
    zIndex: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
}); 