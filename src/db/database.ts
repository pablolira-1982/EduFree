import Dexie, { type Table } from 'dexie';
import type { UserProfile, OfflinePack } from '../core/types';

export interface ProgressRecord {
  id?: number;
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt: string;
}

export interface AudioCacheRecord {
  key: string;
  blob: Blob;
  createdAt: number;
}

export interface FavoriteItem {
  id: string; // lessonId ou exerciseId
  type: 'lesson' | 'exercise';
  title: string;
  subtitle?: string;
  subjectId: string;
  subjectTitle: string;
  subjectColor: string;
  themeNumber?: number;
  createdAt: number;
}

export class EduFreeDatabase extends Dexie {
  profiles!: Table<UserProfile, string>;
  progress!: Table<ProgressRecord, number>;
  packs!: Table<OfflinePack, string>;
  audioCache!: Table<AudioCacheRecord, string>;
  favorites!: Table<FavoriteItem, string>;

  constructor() {
    super('EduFreeDatabase');
    this.version(2).stores({
      profiles: 'id, name, locale',
      progress: '++id, lessonId, completed',
      packs: 'id, subject, installed',
      audioCache: 'key, createdAt'
    });
    this.version(3).stores({
      profiles: 'id, name, locale',
      progress: '++id, lessonId, completed',
      packs: 'id, subject, installed',
      audioCache: 'key, createdAt',
      favorites: 'id, type, subjectId, createdAt'
    });
  }
}

export const db = new EduFreeDatabase();

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'local_user_default',
  name: '',
  tagline: 'Aprender sempre',
  locale: 'pt-BR',
  level: 'Iniciante',
  points: 0,
  completedLessons: 0,
  resolvedExercises: 0,
  achievements: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  settings: {
    theme: 'auto',
    textSize: 'normal',
    ttsEnabled: true,
    ttsVoice: 'pt-BR',
    ttsSpeed: 1.0
  }
};

export const DEFAULT_PACKS: OfflinePack[] = [
  { id: 'pt_basico', title: 'Português Básico', size: '120 MB', subject: 'Português', installed: true },
  { id: 'mat_ciclo1', title: 'Matemática Fundamental (4 Operações)', size: '250 MB', subject: 'Matemática', installed: true },
  { id: 'mat_ciclo2', title: 'Matemática Álgebra & Geometria', size: '320 MB', subject: 'Matemática', installed: false },
  { id: 'geografia_geral', title: 'Geografia & Cartografia', size: '190 MB', subject: 'Geografia', installed: false },
  { id: 'fisica_mecanica', title: 'Física & Mecânica Newtoniana', size: '220 MB', subject: 'Física', installed: false },
  { id: 'quimica_geral', title: 'Química & Tabela Periódica', size: '205 MB', subject: 'Química', installed: false },
  { id: 'biologia_genetica', title: 'Biologia Celular & Genética', size: '215 MB', subject: 'Biologia', installed: false },
  { id: 'ciencias_nat', title: 'Ciências Naturais', size: '180 MB', subject: 'Ciências', installed: false },
  { id: 'historia_geral', title: 'História Universal', size: '210 MB', subject: 'História', installed: false },
  { id: 'ingles_basico', title: 'Inglês Conversação & Gramática', size: '300 MB', subject: 'Inglês', installed: false },
];

export async function clearUserData(): Promise<void> {
  try {
    localStorage.removeItem('edufree_user_name');
  } catch (e) {
    console.warn(e);
  }
  await db.profiles.clear();
  await db.progress.clear();
  await db.profiles.put({ ...DEFAULT_USER_PROFILE });
}

export async function initDatabase(): Promise<UserProfile> {
  // 1. Tentar carregar de localStorage para resposta síncrona/imediata à prova de falhas
  let cachedName = '';
  try {
    cachedName = localStorage.getItem('edufree_user_name') || '';
    // Limpar mock legado de desenvolvimento se existir
    if (cachedName === 'Pablo Lira') {
      cachedName = '';
      localStorage.removeItem('edufree_user_name');
    }
  } catch (e) {
    console.warn(e);
  }

  let profile = await db.profiles.get('local_user_default');
  if (!profile) {
    const initial: UserProfile = {
      ...DEFAULT_USER_PROFILE,
      name: cachedName || DEFAULT_USER_PROFILE.name
    };
    await db.profiles.put(initial);
    profile = initial;
  } else if (profile.name === 'Pablo Lira') {
    // Resetar dados de teste anteriores para começar limpo
    profile = {
      ...DEFAULT_USER_PROFILE,
      name: cachedName
    };
    await db.profiles.put(profile);
  } else if (cachedName && profile.name !== cachedName) {
    profile.name = cachedName;
    await db.profiles.put(profile);
  }

  const packsCount = await db.packs.count();
  if (packsCount === 0) {
    await db.packs.bulkPut(DEFAULT_PACKS);
  }

  return profile;
}

export async function toggleFavorite(item: Omit<FavoriteItem, 'createdAt'>): Promise<boolean> {
  try {
    const existing = await db.favorites.get(item.id);
    if (existing) {
      await db.favorites.delete(item.id);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('edufree_favorites_changed', { detail: { id: item.id, isFavorite: false } }));
      }
      return false;
    } else {
      await db.favorites.put({
        ...item,
        createdAt: Date.now()
      });
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('edufree_favorites_changed', { detail: { id: item.id, isFavorite: true } }));
      }
      return true;
    }
  } catch (e) {
    console.error('Erro ao alternar favorito:', e);
    return false;
  }
}

export async function isFavorite(id: string): Promise<boolean> {
  if (!id) return false;
  try {
    const found = await db.favorites.get(id);
    return !!found;
  } catch {
    return false;
  }
}

export async function getAllFavorites(): Promise<FavoriteItem[]> {
  try {
    return await db.favorites.orderBy('createdAt').reverse().toArray();
  } catch {
    return [];
  }
}

