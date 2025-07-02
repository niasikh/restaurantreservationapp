import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, FlatList, Dimensions, Modal, Pressable, Platform, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const restaurants = [
  {
    id: '1',
    name: 'Honoré',
    image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80' },
    tags: ['$$$', 'Georgian', 'European', 'Barbecue', 'Cocktail Bar'],
    rating: 4.8,
    times: ['5:45 PM', '6:00 PM', '6:15 PM'],
  },
  {
    id: '2',
    name: 'Lolita',
    image: { uri: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80' },
    tags: ['$$', 'New American', 'Italian-Inspired', 'Cocktail Bar'],
    rating: 4.7,
    times: ['5:30 PM', '6:30 PM', '7:00 PM'],
  },
  {
    id: '3',
    name: 'Rooms Tbilisi',
    image: { uri: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80' },
    tags: ['$$$', 'Modern American', 'New Nordic', 'Farm-to-Table'],
    rating: 4.9,
    times: ['6:00 PM', '6:45 PM', '7:15 PM'],
  },
];

const cuisines = [
  { id: '1', name: 'Georgian', image: { uri: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=80&q=80' } },
  { id: '2', name: 'Pizza', image: { uri: 'https://images.unsplash.com/photo-1548365328-8b849e6c7b8b?auto=format&fit=crop&w=80&q=80' } },
  { id: '3', name: 'Sushi', image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=80&q=80' } },
  { id: '4', name: 'Italian', image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80' } },
  { id: '5', name: 'European', image: { uri: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=80&q=80' } },
  { id: '6', name: 'Wine Bar', image: { uri: 'https://images.unsplash.com/photo-1514361892635-cebb9b6b9d49?auto=format&fit=crop&w=80&q=80' } },
  { id: '7', name: 'Bakery', image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=80&q=80' } },
  { id: '8', name: 'Fine Dining', image: { uri: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=80&q=80' } },
  { id: '9', name: 'Brunch', image: { uri: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=80&q=80' } },
  { id: '10', name: 'Breakfast', image: { uri: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=80&q=80' } },
  { id: '11', name: 'Seafood', image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=80&q=80' } },
  { id: '12', name: 'Vegetarian', image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80' } },
  { id: '13', name: 'Vegan', image: { uri: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=80&q=80' } },
  { id: '14', name: 'Chinese', image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80' } },
  { id: '15', name: 'Indian', image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80' } },
  { id: '16', name: 'American', image: { uri: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=80&q=80' } },
  { id: '17', name: 'Mexican', image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=80&q=80' } },
  { id: '18', name: 'Ukrainian', image: { uri: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=80&q=80' } },
  { id: '19', name: 'Soups', image: { uri: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=80&q=80' } },
  { id: '20', name: 'Burgers', image: { uri: 'https://images.unsplash.com/photo-1548365328-8b849e6c7b8b?auto=format&fit=crop&w=80&q=80' } },
  // Add more from backend as needed
];

// Add trending restaurants sample data
const trendingRestaurants = [
  {
    id: '1',
    name: 'Alubali',
    image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80' },
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
    image: { uri: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=80&q=80' },
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
    image: { uri: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=80&q=80' },
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
    name: 'Paul',
    image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=80&q=80' },
    location: 'Tbilisi',
    cuisine: 'French Bakery',
    rating: 4.6,
    reviews: 60,
    distance: 1.5,
    price: 3,
    favorite: false,
  },
  {
    id: '5',
    name: 'Strada',
    image: { uri: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=80&q=80' },
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
    image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80' },
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
    image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=80&q=80' },
    location: 'Tbilisi',
    cuisine: 'International',
    rating: 4.5,
    reviews: 40,
    distance: 2.1,
    price: 3,
    favorite: false,
  },
  {
    id: '12',
    name: 'Miti Taverna',
    image: { uri: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=80&q=80' },
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
    name: 'Urban Press Winery',
    image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
    tags: ['Italian'],
    price: 3,
    rating: 4.7,
    distance: 14,
    times: ['7:15 PM', '7:30 PM'],
    favorite: false,
  },
  {
    id: '2',
    name: 'Pali Wine Co.',
    image: { uri: 'https://images.unsplash.com/photo-1514361892635-cebb9b6b9d49?auto=format&fit=crop&w=400&q=80' },
    tags: ['Wine Bar'],
    price: 2,
    rating: 4.6,
    distance: 12,
    times: ['7:45 PM', '8:00 PM'],
    favorite: true,
  },
  {
    id: '3',
    name: '8000 Vintages',
    image: { uri: 'https://images.unsplash.com/photo-1514361892635-cebb9b6b9d49?auto=format&fit=crop&w=400&q=80' },
    tags: ['Wine Bar', 'Gourmet Boards'],
    price: 3,
    rating: 4.9,
    distance: 8,
    times: ['8:15 PM', '8:30 PM'],
    favorite: false,
  },
  {
    id: '4',
    name: 'Canape',
    image: { uri: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80' },
    tags: ['Georgian & European'],
    price: 2,
    rating: 4.8,
    distance: 10,
    times: ['8:45 PM', '9:00 PM'],
    favorite: false,
  },
  {
    id: '5',
    name: 'Orangery',
    image: { uri: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80' },
    tags: ['Georgian & European'],
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
    name: 'Sunset Terrace',
    image: { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
    tags: ['American', 'Outdoor'],
    favorite: false,
  },
  {
    id: '2',
    name: 'Garden Grill',
    image: { uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80' },
    tags: ['Grill', 'Outdoor'],
    favorite: true,
  },
  {
    id: '3',
    name: 'Riverside Cafe',
    image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80' },
    tags: ['Cafe', 'Outdoor'],
    favorite: false,
  },
  {
    id: '4',
    name: 'Patio Bistro',
    image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80' },
    tags: ['Bistro', 'Outdoor'],
    favorite: false,
  },
  {
    id: '5',
    name: 'Skyline Deck',
    image: { uri: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80' },
    tags: ['Bar', 'Outdoor'],
    favorite: true,
  },
  {
    id: '6',
    name: 'Courtyard Eats',
    image: { uri: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80' },
    tags: ['Courtyard', 'Outdoor'],
    favorite: false,
  },
  {
    id: '7',
    name: 'Terrace Tapas',
    image: { uri: 'https://images.unsplash.com/photo-1514361892635-cebb9b6b9d49?auto=format&fit=crop&w=600&q=80' },
    tags: ['Tapas', 'Outdoor'],
    favorite: false,
  },
  {
    id: '8',
    name: 'Alfresco Feast',
    image: { uri: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80' },
    tags: ['Feast', 'Outdoor'],
    favorite: true,
  },
];

const rooftopRestaurants = [
  {
    id: '1',
    name: 'Skyline Lounge',
    image: { uri: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80' },
    tags: ['American', '$$$', 'Downtown'],
    rating: 4.8,
    people: 120,
    description: 'Enjoy panoramic city views and modern American cuisine from the top floor.',
    favorite: false,
  },
  {
    id: '2',
    name: 'Cloud Nine',
    image: { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' },
    tags: ['Italian', '$$', 'Midtown'],
    rating: 4.7,
    people: 80,
    description: 'Italian classics and cocktails with a skyline backdrop.',
    favorite: true,
  },
  {
    id: '3',
    name: 'Altitude Bar',
    image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80' },
    tags: ['Bar', '$$', 'Uptown'],
    rating: 4.6,
    people: 60,
    description: 'Trendy rooftop bar with creative drinks and city lights.',
    favorite: false,
  },
  {
    id: '4',
    name: 'Vista Terrace',
    image: { uri: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80' },
    tags: ['Mediterranean', '$$$', 'Old Town'],
    rating: 4.9,
    people: 100,
    description: 'Mediterranean flavors and open-air dining with a view.',
    favorite: false,
  },
  {
    id: '5',
    name: 'Sunset Deck',
    image: { uri: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=800&q=80' },
    tags: ['Seafood', '$$$', 'Seaside'],
    rating: 4.7,
    people: 90,
    description: 'Fresh seafood and cocktails as the sun sets over the city.',
    favorite: true,
  },
  {
    id: '6',
    name: 'Peak Dining',
    image: { uri: 'https://images.unsplash.com/photo-1514361892635-cebb9b6b9d49?auto=format&fit=crop&w=800&q=80' },
    tags: ['Steakhouse', '$$$', 'Financial District'],
    rating: 4.8,
    people: 110,
    description: 'Steaks and fine wine with a breathtaking view.',
    favorite: false,
  },
  {
    id: '7',
    name: 'Cloud Club',
    image: { uri: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80' },
    tags: ['Club', '$$', 'Downtown'],
    rating: 4.5,
    people: 150,
    description: 'Dance, dine, and drink above the city lights.',
    favorite: false,
  },
  {
    id: '8',
    name: 'Starlight Eatery',
    image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
    tags: ['Fusion', '$$', 'Midtown'],
    rating: 4.6,
    people: 70,
    description: 'Fusion cuisine and stargazing from the rooftop.',
    favorite: false,
  },
  {
    id: '9',
    name: 'Panorama Place',
    image: { uri: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80' },
    tags: ['International', '$$', 'City Center'],
    rating: 4.7,
    people: 130,
    description: 'International menu and sweeping city views.',
    favorite: true,
  },
  {
    id: '10',
    name: 'Blue Sky Grill',
    image: { uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80' },
    tags: ['Grill', '$$', 'Uptown'],
    rating: 4.5,
    people: 60,
    description: 'Grilled favorites and open-air seating under the sky.',
    favorite: false,
  },
];

const dateNightRestaurants = [
  {
    id: '1',
    name: 'Romance Bistro',
    image: { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
    tags: ['French', 'Romantic'],
    favorite: true,
  },
  {
    id: '2',
    name: 'Candlelight Grill',
    image: { uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80' },
    tags: ['Grill', 'Intimate'],
    favorite: false,
  },
  {
    id: '3',
    name: 'Starlit Terrace',
    image: { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80' },
    tags: ['Terrace', 'Romantic'],
    favorite: false,
  },
  {
    id: '4',
    name: 'Moonlight Eats',
    image: { uri: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80' },
    tags: ['Italian', 'Date Night'],
    favorite: true,
  },
  {
    id: '5',
    name: 'Secret Garden',
    image: { uri: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80' },
    tags: ['Garden', 'Romantic'],
    favorite: false,
  },
  {
    id: '6',
    name: 'Cozy Corner',
    image: { uri: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80' },
    tags: ['Cozy', 'Wine Bar'],
    favorite: false,
  },
  {
    id: '7',
    name: 'Twilight Lounge',
    image: { uri: 'https://images.unsplash.com/photo-1514361892635-cebb9b6b9d49?auto=format&fit=crop&w=600&q=80' },
    tags: ['Lounge', 'Romantic'],
    favorite: true,
  },
  {
    id: '8',
    name: 'Enchanted Table',
    image: { uri: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80' },
    tags: ['Fine Dining', 'Date Night'],
    favorite: false,
  },
  {
    id: '9',
    name: 'Rosewood',
    image: { uri: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80' },
    tags: ['Steakhouse', 'Romantic'],
    favorite: false,
  },
  {
    id: '10',
    name: 'Velvet Room',
    image: { uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80' },
    tags: ['Bar', 'Intimate'],
    favorite: true,
  },
];

export default function HomeScreen() {
  const [showAllTrending, setShowAllTrending] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  return (
    <View style={{ flex: 1, backgroundColor: '#101c36' }}>
      {/* Sticky Header */}
      <SafeAreaView style={styles.stickyHeaderSafe}>
        <View style={styles.stickyHeader}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Ready to book your table?</Text>
            <TouchableOpacity style={styles.selectorButton}>
              <Ionicons name="person-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {/* Selector Buttons */}
          <View style={styles.selectorsRow}>
            <TouchableOpacity style={styles.selectorButton}>
              <Ionicons name="people-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.selectorText}>2 • 7:00 PM Mon, Apr 28</Text>
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
            <View style={styles.restaurantCard}>
              <Image source={item.image} style={styles.restaurantImage} />
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.restaurantTags}>
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
              <View style={styles.timesRowEven}>
                {item.times.map((time, idx) => (
                  <TouchableOpacity key={idx} style={styles.timeButtonSmall}>
                    <Text style={styles.timeButtonTextSmall}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
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
                <TouchableOpacity>
                  <Ionicons name={r.favorite ? 'bookmark' : 'bookmark-outline'} size={22} color="#E74C3C" />
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
                {trendingRestaurants.map((r) => (
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
                      <TouchableOpacity>
                        <Ionicons name={r.favorite ? 'bookmark' : 'bookmark-outline'} size={22} color="#E74C3C" />
                      </TouchableOpacity>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                        <Ionicons name="location-outline" size={16} color="#fff" style={{ marginRight: 2 }} />
                        <Text style={styles.trendingMetaText}>{r.distance} km</Text>
                      </View>
                      <Text style={styles.trendingMetaText}>{'$'.repeat(r.price)}</Text>
                    </View>
                  </View>
                ))}
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
                <TouchableOpacity>
                  <Ionicons name={item.favorite ? 'bookmark' : 'bookmark-outline'} size={22} color="#E74C3C" />
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
                <TouchableOpacity style={{ marginLeft: 'auto' }}>
                  <Ionicons name={item.favorite ? 'bookmark' : 'bookmark-outline'} size={22} color="#E74C3C" />
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
                <TouchableOpacity style={styles.rooftopBookmark}>
                  <Ionicons name={r.favorite ? 'bookmark' : 'bookmark-outline'} size={28} color="#fff" />
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
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.outdoorDiningTitle}>Date Night</Text>
          <TouchableOpacity>
            <Text style={styles.cuisineViewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={dateNightRestaurants}
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
                <TouchableOpacity style={{ marginLeft: 'auto' }}>
                  <Ionicons name={item.favorite ? 'bookmark' : 'bookmark-outline'} size={22} color="#E74C3C" />
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
            <Ionicons name={activeTab === 'Home' ? 'ellipse' : 'ellipse-outline'} size={28} color={activeTab === 'Home' ? '#E74C3C' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Home' && styles.tabLabelActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Search')}>
            <Ionicons name="search" size={26} color={activeTab === 'Search' ? '#E74C3C' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Search' && styles.tabLabelActive]}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Saved')}>
            <Ionicons name="bookmark-outline" size={26} color={activeTab === 'Saved' ? '#E74C3C' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Saved' && styles.tabLabelActive]}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Bookings')}>
            <Ionicons name="calendar-outline" size={26} color={activeTab === 'Bookings' ? '#E74C3C' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Bookings' && styles.tabLabelActive]}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Account')}>
            <Ionicons name="person-outline" size={26} color={activeTab === 'Account' ? '#E74C3C' : '#b0b8c1'} />
            <Text style={[styles.tabLabel, activeTab === 'Account' && styles.tabLabelActive]}>My account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101c36',
    paddingTop: 72,
    paddingHorizontal: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 28,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  selectorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    marginHorizontal: 8,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2747',
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
    backgroundColor: '#1a2747',
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
    backgroundColor: '#c0392b',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  timeButtonSmall: {
    backgroundColor: '#c0392b',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
  },
  timeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timeButtonTextSmall: {
    color: '#fff',
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
    color: '#c0392b',
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
    marginTop: 32,
    marginBottom: 12,
  },
  trendingListSection: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  trendingCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1a2747',
    borderRadius: 18,
    marginBottom: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  trendingImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
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
    backgroundColor: '#101c36',
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
    backgroundColor: '#c0392b',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  timeButtonText: {
    color: '#fff',
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
    marginTop: 0,
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
    marginTop: 8,
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
    backgroundColor: '#101c36',
    borderTopWidth: 1,
    borderTopColor: '#232B3B',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    backgroundColor: '#101c36',
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
    color: '#E74C3C',
    fontWeight: '700',
  },
  stickyHeaderSafe: {
    backgroundColor: '#101c36',
    zIndex: 10,
  },
  stickyHeader: {
    backgroundColor: '#101c36',
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