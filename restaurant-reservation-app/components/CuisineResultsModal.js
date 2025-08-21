import React, { useMemo, useState } from "react";
import { Modal, View, Text, Pressable, FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from "react-native";
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
        marginBottom: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 8,
        borderWidth: 1,
        borderColor: '#404040',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        maxWidth: '100%',
        alignSelf: 'center',
        width: '95%',
        marginRight: 8,
      }}
      onPress={() => onRestaurantPress(item)}
    >
      <Image 
        source={item.image} 
        style={{ width: 60, height: 60, borderRadius: 8, marginRight: 10 }}
        resizeMode="cover"
        fadeDuration={0}
        loading="eager"
      />
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>
          {item.name}
        </Text>
        <Text style={{ color: '#b0b8c1', fontSize: 14, marginBottom: 4 }}>
          {item.tags.join(' • ')}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={{ color: '#FFD700', fontSize: 14, fontWeight: 'bold', marginLeft: 4 }}>
            {item.rating}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{ padding: 4, backgroundColor: 'rgba(42,42,42,0.85)', borderRadius: 16 }}
        onPress={() => onBookRestaurant(item)}
      >
        <Ionicons 
          name="calendar-outline" 
          size={22} 
          color="#FF8C00" 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
      }}>
        <BlurView intensity={20} style={{ ...StyleSheet.absoluteFill, bottom: 80 }}>
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <LinearGradient colors={["rgba(0, 0, 0, 0.9)", "rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.9)"]} style={{ flex: 1, paddingTop: 60, paddingHorizontal: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "700", color: "white", flex: 1 }}>
              {cuisine || ""}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#b0b8c1" />
            </TouchableOpacity>
          </View>

          {/* Filter Buttons */}
          <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between' }}>
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
              <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={renderRestaurant}
                showsVerticalScrollIndicator={true}
                indicatorStyle="white"
                scrollIndicatorInsets={{ right: 2 }}
                style={{ scrollIndicatorSize: 4, height: 500 }}
              />
              <View style={{ alignItems: 'center', paddingVertical: 20, paddingHorizontal: 20 }}>
                <Ionicons name="chevron-down" size={24} color="#b0b8c1" />
                <Text style={{ color: '#b0b8c1', fontSize: 14, marginTop: 8, textAlign: 'center' }}>
                  Scroll to see more {cuisine} restaurants
                </Text>
              </View>
            </>
          )}
            </LinearGradient>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
} 