import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// ─── Constants ────────────────────────────────────────────────────────────────

const HEADER_BODY_H    = 68; // px below the status bar inset
const WISHLIST_KEY     = '@awa_wishlist';

// ─── Types ────────────────────────────────────────────────────────────────────

type IoniconsName = keyof typeof Ionicons.glyphMap;

type Category = {
  id: string;
  label: string;
  icon: IoniconsName;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  badge?: 'Best Seller' | 'New' | 'Eco';
};

type BadgeConfig = { bg: string; color: string };

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  { id: 'all',        label: 'All',        icon: 'apps-outline'             },
  { id: 'cleaning',   label: 'Cleaning',   icon: 'sparkles-outline'         },
  { id: 'industrial', label: 'Industrial', icon: 'construct-outline'        },
  { id: 'home',       label: 'Home',       icon: 'home-outline'             },
  { id: 'hygiene',    label: 'Hygiene',    icon: 'shield-checkmark-outline' },
];

const PRODUCTS: Product[] = [
  { id: '1', name: 'Glass Cleaner Pro',  category: 'cleaning',   price: 450,  rating: 4.8, image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400', badge: 'Best Seller' },
  { id: '2', name: 'Heavy Degreaser',    category: 'industrial', price: 1200, rating: 4.6, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400' },
  { id: '3', name: 'Eco Floor Wash',     category: 'home',       price: 300,  rating: 4.9, image: 'https://images.unsplash.com/photo-1585833014492-7a360fed76c9?w=400',  badge: 'Eco'        },
  { id: '4', name: 'Hand Sanitizer',     category: 'hygiene',    price: 250,  rating: 4.7, image: 'https://images.unsplash.com/photo-1607013407627-6ee814329547?w=400',  badge: 'New'        },
  { id: '5', name: 'Lemon Dish Soap',    category: 'cleaning',   price: 180,  rating: 4.5, image: 'https://images.unsplash.com/photo-1527515637462-cff94edd56f9?w=400' },
  { id: '6', name: 'Bathroom Shine',     category: 'home',       price: 520,  rating: 4.8, image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400',  badge: 'New'        },
  { id: '7', name: 'Multi-Surface Spray',category: 'cleaning',   price: 380,  rating: 4.6, image: 'https://images.unsplash.com/photo-1585687433877-3b09ac1b696e?w=400' },
  { id: '8', name: 'Industrial Solvent', category: 'industrial', price: 950,  rating: 4.5, image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400' },
];

const BADGE_CONFIG: Record<NonNullable<Product['badge']>, BadgeConfig> = {
  'Best Seller': { bg: '#fef3c7', color: '#d97706' },
  New:           { bg: '#dbeafe', color: '#2563eb' },
  Eco:           { bg: '#d1fae5', color: '#059669' },
};

// ─── Collections ──────────────────────────────────────────────────────────────

type Collection = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  cardBg: string;
  image: string;
};

const COLLECTIONS: Collection[] = [
  {
    id: '1',
    title: 'Glass & Surface Kit',
    subtitle: '6 Products',
    tag: 'Best Seller',
    tagColor: '#d97706',
    tagBg: '#fef3c7',
    cardBg: '#f0fdf4',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',
  },
  {
    id: '2',
    title: 'New Arrivals 2025',
    subtitle: '4 Products',
    tag: 'New',
    tagColor: '#2563eb',
    tagBg: '#dbeafe',
    cardBg: '#f0f9ff',
    image: 'https://images.unsplash.com/photo-1607013407627-6ee814329547?w=400',
  },
  {
    id: '3',
    title: 'Floor Care Bundle',
    subtitle: '5 Products',
    tag: 'Sale 20%',
    tagColor: '#dc2626',
    tagBg: '#fff1f2',
    cardBg: '#fff7ed',
    image: 'https://images.unsplash.com/photo-1585833014492-7a360fed76c9?w=400',
  },
  {
    id: '4',
    title: 'Hygiene Pro Pack',
    subtitle: '7 Products',
    tag: 'Popular',
    tagColor: '#7c3aed',
    tagBg: '#f5f3ff',
    cardBg: '#faf5ff',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
  },
  {
    id: '5',
    title: 'Industrial Range',
    subtitle: '3 Products',
    tag: 'Heavy Duty',
    tagColor: '#0891b2',
    tagBg: '#ecfeff',
    cardBg: '#f8fafc',
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400',
  },
];

// ─── ShimmerImage ─────────────────────────────────────────────────────────────

type ShimmerImageProps = { uri: string; height: number };

function ShimmerImage({ uri, height }: ShimmerImageProps): React.JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const shimmerX  = useSharedValue(-280);
  const imgOpacity = useSharedValue(0);

  useEffect(() => {
    shimmerX.value = withRepeat(
      withTiming(480, { duration: 1100, easing: Easing.linear }),
      -1,
      false,
    );
    return () => cancelAnimation(shimmerX);
  }, [shimmerX]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerX.value }],
  }));

  const imgStyle = useAnimatedStyle(() => ({
    opacity: imgOpacity.value,
  }));

  const handleLoad = useCallback(() => {
    cancelAnimation(shimmerX);
    setLoaded(true);
    imgOpacity.value = withTiming(1, { duration: 380 });
  }, [shimmerX, imgOpacity]);

  return (
    <View style={{ width: '100%', height, backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
      {/* Moving shimmer highlight */}
      {!loaded && (
        <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.62)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: 220, height: '100%' }}
          />
        </Animated.View>
      )}
      {/* Actual image fades in on load */}
      <Animated.Image
        source={{ uri }}
        style={[StyleSheet.absoluteFill, imgStyle]}
        onLoad={handleLoad}
        resizeMode="cover"
      />
    </View>
  );
}

// ─── CategoryPill ─────────────────────────────────────────────────────────────

type CategoryPillProps = {
  item: Category;
  isActive: boolean;
  onPress: () => void;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function CategoryPill({ item, isActive, onPress }: CategoryPillProps): React.JSX.Element {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(isActive ? 1.09 : 1, { damping: 11, stiffness: 220 });
  }, [isActive, scale]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedTouchable
      style={[styles.catPill, isActive && styles.catPillActive, animStyle]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Ionicons
        name={item.icon}
        size={14}
        color={isActive ? '#ffffff' : '#64748b'}
        style={styles.catIcon}
      />
      <Text style={[styles.catText, isActive && styles.catTextActive]}>{item.label}</Text>
    </AnimatedTouchable>
  );
}

// ─── AnimatedPress — shrink micro-interaction ─────────────────────────────────

type AnimatedPressProps = {
  onPress: () => void;
  style: ViewStyle;
  children: React.ReactNode;
};

function AnimatedPress({ onPress, style, children }: AnimatedPressProps): React.JSX.Element {
  const scale = useSharedValue(1);

  const handlePress = useCallback(() => {
    scale.value = withSequence(
      withSpring(0.76, { damping: 5, stiffness: 600 }),
      withSpring(1,    { damping: 9, stiffness: 300 }),
    );
    onPress();
  }, [onPress, scale]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[style, animStyle]}>
      <TouchableOpacity
        style={styles.fill}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

type ProductCardProps = {
  product: Product;
  inWishlist: boolean;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
};

function ProductCard({
  product,
  inWishlist,
  onToggleWishlist,
  onAddToCart,
}: ProductCardProps): React.JSX.Element {
  const badge = product.badge ? BADGE_CONFIG[product.badge] : null;

  return (
    <View style={styles.card}>
      {/* Image with shimmer */}
      <View style={styles.cardImgWrap}>
        <ShimmerImage uri={product.image} height={148} />

        {/* Badge top-left */}
        {badge !== null && (
          <View style={[styles.badgeTag, { backgroundColor: badge.bg }]}>
            <Text style={[styles.badgeTagText, { color: badge.color }]}>{product.badge}</Text>
          </View>
        )}

        {/* Heart — shrink animation */}
        <AnimatedPress
          style={styles.heartBtn}
          onPress={() => onToggleWishlist(product.id)}
        >
          <Ionicons
            name={inWishlist ? 'heart' : 'heart-outline'}
            size={17}
            color={inWishlist ? '#ef4444' : '#64748b'}
          />
        </AnimatedPress>
      </View>

      {/* Info */}
      <View style={styles.cardBody}>
        <Text style={styles.cardName} numberOfLines={2}>{product.name}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color="#f59e0b" />
          <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>Rs. {product.price.toLocaleString()}</Text>
          {/* Add button — shrink animation */}
          <AnimatedPress
            style={styles.addBtn}
            onPress={() => onAddToCart(product)}
          >
            <Ionicons name="add" size={20} color="#ffffff" />
          </AnimatedPress>
        </View>
      </View>
    </View>
  );
}

// ─── CustomerHome ─────────────────────────────────────────────────────────────

export default function CustomerHome(): React.JSX.Element {
  const router  = useRouter();
  const insets  = useSafeAreaInsets();

  const [activeCat,  setActiveCat]  = useState<string>('all');
  const [search,     setSearch]     = useState<string>('');
  const [wishlist,   setWishlist]   = useState<Set<string>>(new Set());
  const [cartCount,  setCartCount]  = useState<number>(0);

  const headerH = insets.top + HEADER_BODY_H;

  // Load persisted wishlist once on mount
  useEffect(() => {
    AsyncStorage.getItem(WISHLIST_KEY).then((raw) => {
      if (raw) {
        try {
          const ids: string[] = JSON.parse(raw);
          setWishlist(new Set(ids));
        } catch {
          // ignore corrupt data
        }
      }
    });
  }, []);

  const filtered = PRODUCTS.filter(
    (p) =>
      (activeCat === 'all' || p.category === activeCat) &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleWishlist = useCallback((id: string): void => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      // Persist updated set
      AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify([...next]));
      return next;
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const handleAddToCart = useCallback(
    (product: Product): void => {
      setCartCount((c) => c + 1);
      Alert.alert(
        'Added to Cart',
        `${product.name} has been added to your cart.`,
        [
          { text: 'Continue Shopping', style: 'cancel' },
          { text: 'View Cart', onPress: () => router.push('/(customer)/cart') },
        ],
      );
    },
    [router],
  );

  const handleNotification = useCallback(async (): Promise<void> => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Notifications', 'You have no new notifications.');
  }, []);

  const renderCollection = useCallback(
    ({ item }: { item: Collection }): React.JSX.Element => (
      <TouchableOpacity
        style={[styles.collCard, { backgroundColor: item.cardBg }]}
        onPress={() =>
          Alert.alert(item.title, `${item.subtitle} available in this collection.`)
        }
        activeOpacity={0.88}
      >
        {/* Image */}
        <View style={styles.collImgWrap}>
          <Image source={{ uri: item.image }} style={styles.collImg} resizeMode="cover" />
          {/* Emerald tint overlay at bottom */}
          <View style={styles.collImgOverlay} />
        </View>

        {/* Info */}
        <View style={styles.collInfo}>
          <View style={[styles.collTag, { backgroundColor: item.tagBg }]}>
            <Text style={[styles.collTagText, { color: item.tagColor }]}>{item.tag}</Text>
          </View>
          <Text style={styles.collTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.collFooter}>
            <Text style={styles.collSubtitle}>{item.subtitle}</Text>
            <Ionicons name="arrow-forward" size={13} color="#059669" />
          </View>
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  const renderCategory = useCallback(
    ({ item }: { item: Category }): React.JSX.Element => (
      <CategoryPill
        item={item}
        isActive={activeCat === item.id}
        onPress={() => setActiveCat(item.id)}
      />
    ),
    [activeCat],
  );

  const renderProduct = useCallback(
    ({ item }: { item: Product }): React.JSX.Element => (
      <ProductCard
        product={item}
        inWishlist={wishlist.has(item.id)}
        onToggleWishlist={toggleWishlist}
        onAddToCart={handleAddToCart}
      />
    ),
    [wishlist, toggleWishlist, handleAddToCart],
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* ── Scrollable content – paddingTop pushes it below the glass header ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingTop: headerH + 12 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchWrap}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={19} color="#94a3b8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search cleaning products..."
              placeholderTextColor="#94a3b8"
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color="#c0ccd8" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ── Featured Collections slider ── */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Featured Collections</Text>
          <TouchableOpacity
            onPress={() => Alert.alert('Collections', 'Full collections coming soon.')}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={COLLECTIONS}
          renderItem={renderCollection}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.collList}
          decelerationRate="fast"
          snapToInterval={178}
          snapToAlignment="start"
        />

        {/* ── Categories ── */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catList}
        />

        {/* ── Products ── */}
        <View style={[styles.sectionHead, { marginTop: 28 }]}>
          <Text style={styles.sectionTitle}>
            {activeCat === 'all'
              ? 'All Products'
              : (CATEGORIES.find((c) => c.id === activeCat)?.label ?? 'Products')}
          </Text>
          <TouchableOpacity
            onPress={() => Alert.alert('See All', 'Full catalog coming soon.')}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {filtered.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Ionicons name="search-outline" size={42} color="#cbd5e1" />
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        ) : (
          <FlatList
            data={filtered}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productGrid}
            columnWrapperStyle={styles.productRow}
          />
        )}
      </ScrollView>

      {/* ── Glassmorphism Header — rendered last so it sits on top ── */}
      <View
        style={[styles.glassHeader, { height: headerH, paddingTop: insets.top }]}
        pointerEvents="box-none"
      >
        {/* BlurView covers the full header area */}
        <BlurView
          intensity={88}
          tint="light"
          style={StyleSheet.absoluteFill}
        />
        {/* Hair-line bottom border for the glass edge */}
        <View style={styles.glassBorder} />

        {/* Header content — touches work here */}
        <View style={styles.headerInner} pointerEvents="auto">
          <View>
            <Text style={styles.greeting}>Good Morning 👋</Text>
            <Text style={styles.brandName}>AWA Products</Text>
          </View>
          <View style={styles.headerActions}>
            {/* Notification — Haptic on press */}
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={handleNotification}
              activeOpacity={0.75}
            >
              <Ionicons name="notifications-outline" size={22} color="#1e293b" />
              <View style={styles.notifDot} />
            </TouchableOpacity>

            {/* Cart badge — only visible once items are added */}
            {cartCount > 0 && (
              <TouchableOpacity
                style={[styles.iconBtn, styles.iconBtnGap]}
                onPress={() => router.push('/(customer)/cart')}
                activeOpacity={0.75}
              >
                <Ionicons name="cart-outline" size={22} color="#1e293b" />
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen:        { flex: 1, backgroundColor: '#f8fafc' },
  scroll:        { flex: 1 },
  scrollContent: { paddingBottom: 36 },
  fill:          { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // ── Glass Header ──────────────────────────────────────────────────────────
  glassHeader: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    overflow: 'hidden',
  },
  glassBorder: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 0.5,
    backgroundColor: 'rgba(148,163,184,0.28)',
  },
  headerInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  greeting:  { fontSize: 12, color: '#94a3b8', fontWeight: '600' },
  brandName: { fontSize: 22, fontWeight: '900', color: '#0f172a', letterSpacing: -0.5, marginTop: 2 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: {
    width: 42, height: 42, borderRadius: 13,
    backgroundColor: 'rgba(241,245,249,0.75)',
    justifyContent: 'center', alignItems: 'center',
  },
  iconBtnGap: { marginLeft: 8 },
  notifDot: {
    position: 'absolute', top: 8, right: 8,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 1.5, borderColor: '#f8fafc',
  },
  cartBadge: {
    position: 'absolute', top: 5, right: 5,
    backgroundColor: '#059669',
    borderRadius: 8, minWidth: 16, height: 16,
    justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 2,
  },
  cartBadgeText: { color: '#fff', fontSize: 9, fontWeight: '900' },

  // ── Search ────────────────────────────────────────────────────────────────
  searchWrap: { paddingHorizontal: 22, paddingBottom: 14 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#ffffff', paddingHorizontal: 14, height: 50,
    borderRadius: 16,
    borderWidth: 0.5, borderColor: '#e2e8f0',
  },
  searchInput: { flex: 1, fontSize: 14, color: '#1e293b', fontWeight: '500' },

  // ── Featured Collections ──────────────────────────────────────────────────
  collList: { paddingHorizontal: 22, gap: 12, paddingBottom: 4 },

  collCard: {
    width: 162,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
  },
  collImgWrap: {
    height: 110,
    overflow: 'hidden',
    position: 'relative',
  },
  collImg: {
    width: '100%',
    height: '100%',
  },
  collImgOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 28,
    backgroundColor: 'rgba(5,150,105,0.08)',
  },
  collInfo: {
    padding: 12,
  },
  collTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 7, marginBottom: 7,
  },
  collTagText: {
    fontSize: 9, fontWeight: '800',
    textTransform: 'uppercase', letterSpacing: 0.5,
  },
  collTitle: {
    fontSize: 13, fontWeight: '800',
    color: '#0f172a', lineHeight: 18,
    marginBottom: 8,
  },
  collFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collSubtitle: {
    fontSize: 11, color: '#94a3b8', fontWeight: '600',
  },

  // ── Section header ────────────────────────────────────────────────────────
  sectionHead: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 22, marginTop: 24, marginBottom: 14,
  },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: '#0f172a', letterSpacing: -0.3 },
  seeAll:       { fontSize: 13, color: '#059669', fontWeight: '700' },

  // ── Categories ────────────────────────────────────────────────────────────
  catList:       { paddingHorizontal: 22, gap: 8 },
  catIcon:       { marginRight: 4 },
  catPill: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1.5, borderColor: '#e2e8f0',
  },
  catPillActive: { backgroundColor: '#059669', borderColor: '#059669' },
  catText:       { fontSize: 13, fontWeight: '700', color: '#64748b' },
  catTextActive: { color: '#ffffff' },

  // ── Product Grid ──────────────────────────────────────────────────────────
  productGrid: { paddingHorizontal: 14 },
  productRow:  { justifyContent: 'space-between', marginBottom: 4 },
  emptyWrap:   { alignItems: 'center', paddingVertical: 52, gap: 12 },
  emptyText:   { fontSize: 14, color: '#94a3b8', fontWeight: '600' },

  // ── Product Card — thin border, no shadow ─────────────────────────────────
  card: {
    width: '48.5%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
  },
  cardImgWrap: { position: 'relative' },
  badgeTag: {
    position: 'absolute', top: 10, left: 10, zIndex: 2,
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
  },
  badgeTagText: { fontSize: 9, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.4 },

  // Heart button — absolutely positioned, animation applied by AnimatedPress
  heartBtn: {
    position: 'absolute', top: 10, right: 10, zIndex: 2,
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 0.5, borderColor: '#e2e8f0',
    justifyContent: 'center', alignItems: 'center',
  },

  cardBody:   { padding: 12 },
  cardName:   { fontSize: 14, fontWeight: '700', color: '#1e293b', lineHeight: 20 },
  ratingRow:  { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 5 },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#f59e0b' },
  priceRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 10,
  },
  priceText: { fontSize: 15, fontWeight: '900', color: '#0f172a' },

  // Add button — animation applied by AnimatedPress
  addBtn: {
    width: 34, height: 34, borderRadius: 11,
    backgroundColor: '#059669',
    justifyContent: 'center', alignItems: 'center',
  },
});
