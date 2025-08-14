import React, { useMemo } from "react";
import { Modal, View, Text, Pressable, FlatList, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { normalize } from "../utils/normalize";

export default function CuisineResultsModal({
  visible,
  cuisine,
  onClose,
  restaurants,
  loading = false,
  onRestaurantPress,
  favorites,
  onToggleFavorite,
}) {
  const results = useMemo(() => {
    if (!cuisine || !restaurants?.length) return [];
    const q = normalize(cuisine);

    return restaurants.filter((r) => {
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
  }, [cuisine, restaurants]);

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 12
      }}
      onPress={() => onRestaurantPress(item)}
    >
      <Image source={item.image} style={{ width: 80, height: 80, borderRadius: 12, marginRight: 12 }} />
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
        onPress={() => onToggleFavorite(item.id)}
      >
        <Ionicons 
          name={favorites[item.id] ? 'bookmark' : 'bookmark-outline'} 
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
        justifyContent: "center",
        alignItems: "center",
      }}>
        <View style={{
          backgroundColor: "#333",
          borderRadius: 16,
          padding: 20,
          width: '90%',
          maxHeight: '80%',
        }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "700", color: "white", flex: 1 }}>
              {cuisine || ""}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#fff" />
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
            <FlatList
              data={results}
              keyExtractor={(item) => item.id}
              renderItem={renderRestaurant}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </Modal>
  );
} 