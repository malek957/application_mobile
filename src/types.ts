export enum SignalType {
  AUDIO_FINGERPRINT = 'audio_fingerprint',
  WIFI_HOUSE = 'wifi_house',
  PHONE_STABLE = 'phone_stable',
  PRIME_TIME = 'prime_time',
  CHARGING = 'charging',
  QUIZ_ANSWERED = 'quiz_answered',
  MANUAL_CHECKIN = 'manual_checkin',
  MOVEMENT_REGULAR = 'movement_regular', // For radio/car
  BLUETOOTH_CON = 'bluetooth_con', // For radio/car
}

export interface Signal {
  id: SignalType;
  label: string;
  weight: number;
  isActive: boolean;
  source: string;
}

export interface Channel {
  id: string;
  name: string;
  type: 'TV' | 'Radio';
  logo?: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  type: 'LIVE' | 'PUB';
}

export interface UserStats {
  points: number;
  streak: number;
  badge: 'NONE' | 'BRONZE' | 'SILVER' | 'GOLD';
  lastCheckIn?: Date;
}

export interface DetectionResult {
  channelId: string | null;
  score: number;
  status: 'NON_VIEWER' | 'PROBABLE' | 'CONFIRMED' | 'ENGAGED';
  context: 'HOME' | 'CAR' | 'OTHER';
}
