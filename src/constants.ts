import { SignalType, Channel } from './types';

export const SIGNALS_BASE = [
  { id: SignalType.AUDIO_FINGERPRINT, label: 'Audio Fingerprint', weight: 0.50, source: 'Microphone (3 sec)' },
  { id: SignalType.WIFI_HOUSE, label: 'WiFi Maison', weight: 0.20, source: 'NetworkInfo API' },
  { id: SignalType.PHONE_STABLE, label: 'Téléphone Stable', weight: 0.20, source: 'Accelerometer' },
  { id: SignalType.PRIME_TIME, label: 'Heure Prime Time', weight: 0.15, source: 'Horloge Système' },
  { id: SignalType.CHARGING, label: 'Téléphone en charge', weight: 0.10, source: 'BatteryManager API' },
  { id: SignalType.QUIZ_ANSWERED, label: 'Quiz répondu', weight: 0.40, source: 'Interaction utilisateur' },
  { id: SignalType.MANUAL_CHECKIN, label: 'Check-in manuel', weight: 0.30, source: 'Interaction utilisateur' },
];

export const CHANNELS: Channel[] = [
  { id: 'hannibal', name: 'Hannibal TV', type: 'TV' },
  { id: 'nessma', name: 'Nessma', type: 'TV' },
  { id: 'alhiwar', name: 'Al Hiwar Ettounsi', type: 'TV' },
  { id: 'wataniya1', name: 'Wataniya 1', type: 'TV' },
  { id: 'wataniya2', name: 'Wataniya 2', type: 'TV' },
  { id: 'mosaique', name: 'Mosaique FM', type: 'Radio' },
  { id: 'jawhara', name: 'Jawhara FM', type: 'Radio' },
  { id: 'ifm', name: 'IFM', type: 'Radio' },
  { id: 'rtci', name: 'RTCI', type: 'Radio' },
];

export const SCORE_THRESHOLDS = {
  NON_VIEWER: 0.40,
  PROBABLE: 0.70,
  CONFIRMED: 0.90,
  ENGAGED: 1.0,
};

export const GAMIFICATION_RULES = {
  CHECKIN_POINTS: 50,
  QUIZ_LIVE_POINTS: 100,
  QUIZ_PUB_POINTS: 80,
  STREAK_3_BONUS: 200,
  STREAK_7_BONUS: 500,
  STREAK_30_BONUS: 2000,
};
