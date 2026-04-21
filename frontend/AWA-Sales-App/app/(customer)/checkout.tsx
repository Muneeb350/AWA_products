import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentMethod = 'cod' | 'card';

type OrderLine = {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const DELIVERY_FEE  = 5.0;
const TAX_RATE      = 0.05;

const ORDER_LINES: OrderLine[] = [
  { id: '1', name: 'Premium Degreaser',  qty: 2, unitPrice: 24.50 },
  { id: '2', name: 'Glass Sparkle Pro',  qty: 1, unitPrice: 12.99 },
  { id: '3', name: 'Eco Floor Wash',     qty: 1, unitPrice: 18.00 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return `$${n.toFixed(2)}`;
}

// ─── StepIndicator ───────────────────────────────────────────────────────────

type StepState = 'done' | 'active' | 'upcoming';

type StepDef = { label: string; state: StepState };

const STEPS: StepDef[] = [
  { label: 'Cart',    state: 'done'     },
  { label: 'Address', state: 'done'     },
  { label: 'Payment', state: 'active'   },
  { label: 'Confirm', state: 'upcoming' },
];

function StepIndicator(): React.JSX.Element {
  return (
    <View style={S.steps}>
      {STEPS.map((step, idx) => (
        <React.Fragment key={step.label}>
          <View style={S.stepItem}>
            <View
              style={[
                S.stepDot,
                step.state === 'done'   && S.stepDotDone,
                step.state === 'active' && S.stepDotActive,
              ]}
            >
              {step.state === 'done' ? (
                <Ionicons name="checkmark" size={13} color="#fff" />
              ) : (
                <Text
                  style={[S.stepNum, step.state === 'active' && S.stepNumActive]}
                >
                  {idx + 1}
                </Text>
              )}
            </View>
            <Text
              style={[
                S.stepLabel,
                step.state !== 'upcoming' && S.stepLabelActive,
              ]}
            >
              {step.label}
            </Text>
          </View>

          {idx < STEPS.length - 1 && (
            <View
              style={[S.stepLine, step.state === 'done' && S.stepLineDone]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

// ─── OrderSuccessScreen ───────────────────────────────────────────────────────

type SuccessProps = {
  orderId: string;
  total: number;
  onGoHome: () => void;
};

function OrderSuccessScreen({ orderId, total, onGoHome }: SuccessProps): React.JSX.Element {
  const ringScale   = useSharedValue(0.3);
  const ringOpacity = useSharedValue(0);
  const cardY       = useSharedValue(30);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    // Rings spring in
    ringOpacity.value = withTiming(1, { duration: 300 });
    ringScale.value   = withSpring(1, { damping: 10, stiffness: 150 });
    // Content slides up after rings
    cardOpacity.value = withDelay(320, withTiming(1, { duration: 380, easing: Easing.out(Easing.quad) }));
    cardY.value       = withDelay(320, withSpring(0, { damping: 14, stiffness: 160 }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ringsStyle   = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));
  const contentStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardY.value }],
  }));

  return (
    <View style={S.successScreen}>
      {/* ── Animated green rings + checkmark ── */}
      <Animated.View style={[S.ringsOuter, ringsStyle]}>
        <View style={S.ringsMid}>
          <View style={S.ringsCore}>
            <Ionicons name="checkmark" size={52} color="#ffffff" />
          </View>
        </View>
      </Animated.View>

      {/* ── Animated content ── */}
      <Animated.View style={[S.successContent, contentStyle]}>
        <Text style={S.successHeading}>Order Placed!</Text>
        <Text style={S.successSubtitle}>
          Your order is confirmed and will be{'\n'}delivered to your address shortly.
        </Text>

        {/* Summary pill */}
        <View style={S.summaryPill}>
          <View style={S.pillCol}>
            <Text style={S.pillKey}>ORDER ID</Text>
            <Text style={S.pillVal}>{orderId}</Text>
          </View>
          <View style={S.pillSep} />
          <View style={S.pillCol}>
            <Text style={S.pillKey}>TOTAL PAID</Text>
            <Text style={[S.pillVal, { color: '#059669' }]}>{fmt(total)}</Text>
          </View>
          <View style={S.pillSep} />
          <View style={S.pillCol}>
            <Text style={S.pillKey}>DELIVERY</Text>
            <Text style={S.pillVal}>2–3 Days</Text>
          </View>
        </View>

        {/* Back to Home */}
        <TouchableOpacity style={S.homeBtn} onPress={onGoHome} activeOpacity={0.85}>
          <Ionicons name="home-outline" size={19} color="#ffffff" />
          <Text style={S.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>

        {/* Track ghost */}
        <TouchableOpacity
          style={S.trackBtn}
          onPress={() => Alert.alert('Track Order', 'Live tracking coming soon.')}
          activeOpacity={0.7}
        >
          <Ionicons name="navigate-circle-outline" size={17} color="#059669" />
          <Text style={S.trackBtnText}>Track My Order</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// ─── PaymentOption ────────────────────────────────────────────────────────────

type PaymentOptionProps = {
  id: PaymentMethod;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  selected: boolean;
  disabled?: boolean;
  onSelect: (id: PaymentMethod) => void;
};

function PaymentOption({
  id, icon, title, subtitle, selected, disabled = false, onSelect,
}: PaymentOptionProps): React.JSX.Element {
  return (
    <TouchableOpacity
      style={[S.payOption, selected && S.payOptionSelected, disabled && S.payOptionDisabled]}
      onPress={() => {
        if (disabled) {
          Alert.alert('Coming Soon', 'Card payment will be available soon.');
          return;
        }
        onSelect(id);
      }}
      activeOpacity={0.82}
    >
      {/* Icon box */}
      <View style={[S.payIconBox, selected && S.payIconBoxSelected]}>
        <Ionicons name={icon} size={21} color={selected ? '#059669' : '#94a3b8'} />
      </View>

      {/* Text */}
      <View style={S.payText}>
        <Text style={[S.payTitle, disabled && { color: '#94a3b8' }]}>{title}</Text>
        <Text style={S.paySub}>{subtitle}</Text>
      </View>

      {/* Radio / badge */}
      {disabled ? (
        <View style={S.soonBadge}>
          <Text style={S.soonBadgeText}>Soon</Text>
        </View>
      ) : (
        <View style={[S.radio, selected && S.radioSelected]}>
          {selected && <View style={S.radioDot} />}
        </View>
      )}
    </TouchableOpacity>
  );
}

// ─── SummaryRow ───────────────────────────────────────────────────────────────

type SummaryRowProps = {
  label: string;
  value: string;
  bold?: boolean;
  accent?: boolean;
};

function SummaryRow({ label, value, bold = false, accent = false }: SummaryRowProps): React.JSX.Element {
  return (
    <View style={S.summaryRow}>
      <Text style={[S.summaryLabel, bold && S.summaryLabelBold]}>{label}</Text>
      <Text style={[S.summaryValue, bold && S.summaryValueBold, accent && S.summaryValueAccent]}>
        {value}
      </Text>
    </View>
  );
}

// ─── CheckoutScreen ───────────────────────────────────────────────────────────

export default function CheckoutScreen(): React.JSX.Element {
  const router = useRouter();

  const [payment,    setPayment]    = useState<PaymentMethod>('cod');
  const [placing,    setPlacing]    = useState<boolean>(false);
  const [succeeded,  setSucceeded]  = useState<boolean>(false);
  const [orderId]                   = useState<string>(
    `#AWA-${Math.floor(10000 + Math.random() * 90000)}`,
  );

  const subtotal = ORDER_LINES.reduce((acc, l) => acc + l.unitPrice * l.qty, 0);
  const tax      = subtotal * TAX_RATE;
  const total    = subtotal + DELIVERY_FEE + tax;

  // CTA micro-scale
  const ctaScale = useSharedValue(1);
  const ctaStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ctaScale.value }],
  }));

  const handlePlaceOrder = useCallback((): void => {
    ctaScale.value = withSequence(
      withSpring(0.95, { damping: 5, stiffness: 500 }),
      withSpring(1,    { damping: 8, stiffness: 300 }),
    );
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setSucceeded(true);
    }, 1400);
  }, [ctaScale]);

  // ── Success state ─────────────────────────────────────────────────────────
  if (succeeded) {
    return (
      <SafeAreaView style={S.screen} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <OrderSuccessScreen
          orderId={orderId}
          total={total}
          onGoHome={() => router.replace('/')}
        />
      </SafeAreaView>
    );
  }

  // ── Checkout form ─────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={S.screen} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* ── Header ── */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={S.headerTitle}>Checkout</Text>
        <View style={{ width: 42 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={S.body}
      >
        {/* Step bar */}
        <StepIndicator />

        {/* ─── 1. DELIVERY ADDRESS ─────────────────────────────────────── */}
        <Text style={S.sectionLabel}>Delivery Address</Text>

        <View style={S.card}>
          <View style={S.addressRow}>
            {/* Location icon */}
            <View style={S.addressIconBox}>
              <Ionicons name="location" size={22} color="#059669" />
            </View>

            {/* Text block */}
            <View style={S.addressBlock}>
              <Text style={S.addressName}>John Doe</Text>
              <Text style={S.addressLine}>123 Industrial Street, Block 4</Text>
              <Text style={S.addressLine}>Karachi, Sindh — 75500, Pakistan</Text>
            </View>

            {/* Edit */}
            <TouchableOpacity
              style={S.editBtn}
              onPress={() => Alert.alert('Edit Address', 'Address editing coming soon.')}
              activeOpacity={0.8}
            >
              <Ionicons name="pencil-outline" size={14} color="#059669" />
              <Text style={S.editBtnText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={S.sep} />

          <View style={S.etaBadge}>
            <Ionicons name="time-outline" size={14} color="#059669" />
            <Text style={S.etaText}>Estimated delivery: 2–3 business days</Text>
          </View>
        </View>

        {/* ─── 2. PAYMENT METHOD ───────────────────────────────────────── */}
        <Text style={S.sectionLabel}>Payment Method</Text>

        <PaymentOption
          id="cod"
          icon="cash-outline"
          title="Cash on Delivery"
          subtitle="Pay when your order arrives"
          selected={payment === 'cod'}
          onSelect={setPayment}
        />
        <PaymentOption
          id="card"
          icon="card-outline"
          title="Credit / Debit Card"
          subtitle="Secure online payment"
          selected={payment === 'card'}
          disabled
          onSelect={setPayment}
        />

        {/* ─── 3. ORDER SUMMARY ────────────────────────────────────────── */}
        <Text style={S.sectionLabel}>Order Summary</Text>

        <View style={S.card}>
          {/* Line items */}
          {ORDER_LINES.map((line) => (
            <View key={line.id} style={S.lineItem}>
              <View style={S.lineItemDot} />
              <Text style={S.lineItemName} numberOfLines={1}>
                {line.name}
              </Text>
              <Text style={S.lineItemQty}>×{line.qty}</Text>
              <Text style={S.lineItemTotal}>
                {fmt(line.unitPrice * line.qty)}
              </Text>
            </View>
          ))}

          <View style={S.sep} />

          <SummaryRow label="Items Subtotal" value={fmt(subtotal)} />
          <SummaryRow label="Delivery Fee"   value={fmt(DELIVERY_FEE)} />
          <SummaryRow label="Tax (5%)"       value={fmt(tax)} />

          <View style={S.sep} />

          <SummaryRow
            label="Total Amount"
            value={fmt(total)}
            bold
            accent
          />
        </View>

        {/* Spacer for footer */}
        <View style={{ height: 106 }} />
      </ScrollView>

      {/* ── Sticky footer ── */}
      <View style={S.footer}>
        {/* Total pill */}
        <View style={S.footerPill}>
          <Text style={S.footerPillLabel}>TOTAL</Text>
          <Text style={S.footerPillValue}>{fmt(total)}</Text>
        </View>

        {/* CTA */}
        <Animated.View style={[S.ctaWrap, ctaStyle]}>
          <TouchableOpacity
            style={[S.cta, placing && S.ctaLoading]}
            onPress={handlePlaceOrder}
            activeOpacity={0.88}
            disabled={placing}
          >
            {placing ? (
              <>
                <Ionicons name="sync-outline" size={19} color="#fff" />
                <Text style={S.ctaText}>Placing…</Text>
              </>
            ) : (
              <>
                <Text style={S.ctaText}>Place Order</Text>
                <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const BORDER = { borderWidth: 0.5, borderColor: '#e2e8f0' } as const;

const S = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f8fafc' },

  // ── Header ──────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: {
    width: 42, height: 42, borderRadius: 13,
    backgroundColor: '#f8fafc',
    justifyContent: 'center', alignItems: 'center',
    ...BORDER,
  },
  headerTitle: {
    fontSize: 18, fontWeight: '800',
    color: '#0f172a', letterSpacing: -0.4,
  },

  body: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 12 },

  // ── Steps ───────────────────────────────────────────────────────────────
  steps: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  stepItem:  { alignItems: 'center', gap: 5 },
  stepDot: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#e2e8f0',
  },
  stepDotDone:   { backgroundColor: '#059669', borderColor: '#059669' },
  stepDotActive: { backgroundColor: '#ffffff', borderColor: '#059669' },
  stepNum:       { fontSize: 11, fontWeight: '700', color: '#94a3b8' },
  stepNumActive: { color: '#059669' },
  stepLine: {
    flex: 1, height: 1.5,
    backgroundColor: '#e2e8f0',
    marginBottom: 18, marginHorizontal: 4,
  },
  stepLineDone:    { backgroundColor: '#059669' },
  stepLabel:       { fontSize: 10, fontWeight: '600', color: '#94a3b8' },
  stepLabelActive: { color: '#059669' },

  // ── Section label ────────────────────────────────────────────────────────
  sectionLabel: {
    fontSize: 11, fontWeight: '800',
    color: '#0f172a',
    textTransform: 'uppercase', letterSpacing: 0.9,
    marginBottom: 10, marginTop: 22,
  },

  // ── Card ─────────────────────────────────────────────────────────────────
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    ...BORDER,
  },
  sep: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 14 },

  // ── Address ───────────────────────────────────────────────────────────────
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  addressIconBox: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center', alignItems: 'center',
    marginTop: 2,
  },
  addressBlock: { flex: 1 },
  addressName: {
    fontSize: 15, fontWeight: '700',
    color: '#0f172a', marginBottom: 5,
  },
  addressLine: {
    fontSize: 13, fontWeight: '500',
    color: '#64748b', lineHeight: 20,
  },
  editBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 12, paddingVertical: 7,
    backgroundColor: '#f0fdf4', borderRadius: 10,
    marginTop: 2,
  },
  editBtnText: { fontSize: 12, fontWeight: '700', color: '#059669' },
  etaBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 12, paddingVertical: 10,
    borderRadius: 12,
  },
  etaText: { fontSize: 12, fontWeight: '600', color: '#059669' },

  // ── Payment ───────────────────────────────────────────────────────────────
  payOption: {
    flexDirection: 'row', alignItems: 'center', gap: 13,
    backgroundColor: '#ffffff',
    borderRadius: 20, padding: 16,
    marginBottom: 10,
    borderWidth: 1.5, borderColor: '#e2e8f0',
  },
  payOptionSelected: { borderColor: '#059669', backgroundColor: '#fafffe' },
  payOptionDisabled: { opacity: 0.55 },
  payIconBox: {
    width: 46, height: 46, borderRadius: 14,
    backgroundColor: '#f8fafc',
    justifyContent: 'center', alignItems: 'center',
  },
  payIconBoxSelected: { backgroundColor: '#d1fae5' },
  payText:  { flex: 1 },
  payTitle: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  paySub:   { fontSize: 12, fontWeight: '500', color: '#94a3b8', marginTop: 2 },
  radio: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: '#d1d5db',
    justifyContent: 'center', alignItems: 'center',
  },
  radioSelected: { borderColor: '#059669' },
  radioDot: {
    width: 11, height: 11, borderRadius: 6,
    backgroundColor: '#059669',
  },
  soonBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20,
  },
  soonBadgeText: { fontSize: 11, fontWeight: '700', color: '#94a3b8' },

  // ── Order Summary ─────────────────────────────────────────────────────────
  lineItem: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, marginBottom: 10,
  },
  lineItemDot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: '#d1fae5',
  },
  lineItemName: {
    flex: 1, fontSize: 13, fontWeight: '500', color: '#475569',
  },
  lineItemQty: {
    fontSize: 12, fontWeight: '600', color: '#94a3b8',
  },
  lineItemTotal: {
    fontSize: 13, fontWeight: '700', color: '#0f172a',
    minWidth: 54, textAlign: 'right',
  },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 9,
  },
  summaryLabel:       { fontSize: 13, fontWeight: '500', color: '#64748b' },
  summaryLabelBold:   { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  summaryValue:       { fontSize: 13, fontWeight: '700', color: '#1e293b' },
  summaryValueBold:   { fontSize: 22, fontWeight: '900', color: '#1e293b' },
  summaryValueAccent: { color: '#059669' },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20, paddingTop: 14, paddingBottom: 26,
    borderTopWidth: 0.5, borderTopColor: '#f1f5f9',
  },
  footerPill: {
    flex: 1, backgroundColor: '#f0fdf4',
    borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10,
  },
  footerPillLabel: {
    fontSize: 9, fontWeight: '800', color: '#059669',
    letterSpacing: 0.9, textTransform: 'uppercase',
  },
  footerPillValue: { fontSize: 20, fontWeight: '900', color: '#0f172a' },
  ctaWrap: { flex: 2 },
  cta: {
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', gap: 8,
    backgroundColor: '#059669',
    borderRadius: 18, paddingVertical: 16,
  },
  ctaLoading: { opacity: 0.75 },
  ctaText: { color: '#ffffff', fontSize: 16, fontWeight: '800' },

  // ── Success Screen ────────────────────────────────────────────────────────
  successScreen: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 28,
  },

  // Three concentric rings
  ringsOuter: {
    width: 176, height: 176, borderRadius: 88,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 32,
  },
  ringsMid: {
    width: 134, height: 134, borderRadius: 67,
    backgroundColor: '#d1fae5',
    justifyContent: 'center', alignItems: 'center',
  },
  ringsCore: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: '#059669',
    justifyContent: 'center', alignItems: 'center',
  },

  successContent: { alignItems: 'center', width: '100%' },
  successHeading: {
    fontSize: 28, fontWeight: '900',
    color: '#0f172a', letterSpacing: -0.5,
    marginBottom: 10,
  },
  successSubtitle: {
    fontSize: 14, fontWeight: '500',
    color: '#64748b', textAlign: 'center',
    lineHeight: 22, marginBottom: 26,
  },

  // Summary pill (order id / total / delivery)
  summaryPill: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    ...BORDER,
    marginBottom: 28,
  },
  pillCol: { flex: 1, alignItems: 'center', gap: 5 },
  pillKey: {
    fontSize: 9, fontWeight: '800', color: '#94a3b8',
    textTransform: 'uppercase', letterSpacing: 0.7,
  },
  pillVal: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  pillSep: { width: 1, backgroundColor: '#f1f5f9', marginHorizontal: 4 },

  // Buttons
  homeBtn: {
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', gap: 8,
    backgroundColor: '#059669',
    paddingVertical: 15, borderRadius: 18,
    width: '100%',
  },
  homeBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  trackBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 12, paddingVertical: 10,
  },
  trackBtnText: { fontSize: 14, fontWeight: '700', color: '#059669' },
});
