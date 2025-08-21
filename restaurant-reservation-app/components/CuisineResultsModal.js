import React, { useMemo, useState } from "react";
import { Modal, View, Text, Pressable, FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { normalize } from "../utils/normalize";

export default function CuisineResultsModal({
  visible,
  cuisine,
  onClose,
  restaurants,
  loading = false,
  favorites,
  setFavorites,
  onRestaurantPress,
  onBookRestaurant,
}) {
  const [sortByRating, setSortByRating] = useState(false);
  const [showHappyHour, setShowHappyHour] = useState(false);

  const results = useMemo(() => {
    if (!cuisine || !restaurants?.length) return [];
    const q = normalize(cuisine);

    let filtered = restaurants.filter((r) => {
      const haystack = [
        r.name,
        ...(r.cuisines || []),
        ...(r.tags || []),
        r.description || "",
      ]
        .map(normalize)
        .join(" • ");
      return haystack.includes(q);
    });

    // Add 5 random restaurants from other sections
    const nonGeorgianRestaurants = restaurants.filter((r) => {
      const haystack = [
        r.name,
        ...(r.cuisines || []),
        ...(r.tags || []),
        r.description || "",
      ]
        .map(normalize)
        .join(" • ");
      return !haystack.includes(q);
    });

    // Get 5 random restaurants from other sections
    const randomRestaurants = nonGeorgianRestaurants
      .slice(0, 5);

    // Combine Georgian restaurants with random ones
    filtered = [...filtered, ...randomRestaurants];

    // Filter for Happy Hour restaurants
    if (showHappyHour) {
      filtered = filtered.filter((r) => r.name === 'Honoré' || r.name === 'Orangery');
    }

    // Sort by rating if Top Rated is selected
    if (sortByRating) {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [cuisine, restaurants, sortByRating, showHappyHour]);

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 10,
        marginBottom: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: '#404040',
        maxWidth: '90%',
        alignSelf: 'center',
      }}
      onPress={() => onRestaurantPress(item)}
    >
      <Image 
        source={item.image} 
        style={{ width: 75, height: 75, borderRadius: 6, marginRight: 12 }}
        resizeMode="cover"
        fadeDuration={0}
        loading="eager"
      />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14, marginBottom: 2 }}>
          {item.name}
        </Text>
        <Text style={{ color: '#b0b8c1', fontSize: 11, marginBottom: 1 }}>
          {item.location || 'Tbilisi'}
        </Text>
        <Text style={{ color: '#b0b8c1', fontSize: 11, marginBottom: 2 }}>
          {Array.isArray(item.tags) ? item.tags.join(' • ') : item.cuisine || 'Restaurant'}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < Math.round(item.rating) ? 'star' : 'star-outline'}
              size={14}
              color="#FFD700"
              style={{ marginRight: 2 }}
            />
          ))}
          <Text style={{ color: '#b0b8c1', fontSize: 11, marginLeft: 4 }}>
            ({item.reviews || Math.floor(Math.random() * 50) + 10} Reviews)
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', justifyContent: 'space-between', marginLeft: 12, minWidth: 60 }}>
        <TouchableOpacity style={{ marginTop: 8 }} onPress={(e) => {
          e.stopPropagation();
          if (setFavorites && item.id) {
            setFavorites(favs => ({ ...favs, [item.id]: !favs[item.id] }));
          }
        }}>
          <Ionicons name={favorites && favorites[item.id] ? 'bookmark' : 'bookmark-outline'} size={22} color="#FF8C00" />
        </TouchableOpacity>

        <View style={{ width: 22, height: 1, backgroundColor: '#404040', marginTop: 8, marginBottom: 8 }} />

        <TouchableOpacity
          style={{ marginBottom: 8 }}
          onPress={(e) => {
            e.stopPropagation();
            onBookRestaurant(item);
          }}
        >
          <Ionicons 
            name="calendar-outline" 
            size={22} 
            color="#FF8C00" 
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
          <LinearGradient
            colors={['#000000', '#1a1a1a', '#000000']}
            style={{ flex: 1 }}
          >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="restaurant" size={24} color="#FF8C00" style={{ marginRight: 8 }} />
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{cuisine || ""}</Text>
              </View>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#666666" />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF8C00', marginRight: 8 }} />
                <Text style={{ color: '#b0b8c1', fontSize: 14 }}>Don't miss out on these bold traditional dishes</Text>
              </View>
            </View>

          {/* Filter Buttons */}
          <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 16 }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#404040',
                borderRadius: 24,
                paddingHorizontal: 14,
                paddingVertical: 8,
                marginRight: 8,
                borderWidth: 1,
                borderColor: '#fff',
                flex: 1,
              }}
              onPress={() => setSortByRating(!sortByRating)}
            >
              <Ionicons name="time-outline" size={16} color="#FF8C00" style={{ marginRight: 6 }} />
              <Text style={{ color: '#fff', fontSize: 14 }}>
                Open Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#404040',
                borderRadius: 24,
                paddingHorizontal: 14,
                paddingVertical: 8,
                marginRight: 8,
                borderWidth: 1,
                borderColor: '#fff',
                flex: 1,
              }}
              onPress={() => setShowHappyHour(!showHappyHour)}
            >
              <Ionicons name="wine-outline" size={16} color="#FF8C00" style={{ marginRight: 6 }} />
              <Text style={{ color: '#fff', fontSize: 14 }}>
                Happy Hour
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#404040',
                borderRadius: 24,
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: '#fff',
                flex: 1,
              }}
              onPress={() => setSortByRating(!sortByRating)}
            >
              <Ionicons name="star-outline" size={16} color="#FF8C00" style={{ marginRight: 6 }} />
              <Text style={{ color: '#fff', fontSize: 14 }}>
                Top Rated
              </Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator />
          ) : results.length === 0 ? (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <Ionicons name="restaurant-outline" size={64} color="#b0b8c1" />
              <Text style={{ color: '#b0b8c1', fontSize: 18, marginTop: 16 }}>
                No {cuisine} restaurants found
              </Text>
            </View>
          ) : (
            <>
              <ScrollView style={{ flex: 1, paddingHorizontal: 4, paddingTop: 8 }} showsVerticalScrollIndicator={true} indicatorStyle="white" scrollIndicatorInsets={{right: 0}} scrollEventThrottle={16}>
                {results.map((item, index) => (
                  <View key={`${item.id || item.name}_${index}`}>
                    {renderRestaurant({ item })}
                  </View>
                ))}
              </ScrollView>
            </>
          )}
            </LinearGradient>
          </SafeAreaView>
        </View>
      </Modal>
    );
} 