import { PixelCharacter } from '../types';
import { BATCH_1_CHARACTERS } from './batch1';
import { BATCH_2_CHARACTERS } from './batch2';
import { BATCH_3_CHARACTERS } from './batch3';
import { BATCH_4_CHARACTERS } from './batch4';
import { BATCH_5_CHARACTERS } from './batch5';

export const ALL_PIXEL_CHARACTERS: PixelCharacter[] = [
  ...BATCH_1_CHARACTERS,
  ...BATCH_2_CHARACTERS,
  ...BATCH_3_CHARACTERS,
  ...BATCH_4_CHARACTERS,
  ...BATCH_5_CHARACTERS,
];

export function getCharacterById(id: string): PixelCharacter {
  const found = ALL_PIXEL_CHARACTERS.find((c) => c.id === id);
  return found || ALL_PIXEL_CHARACTERS[0];
}

export {
  BATCH_1_CHARACTERS,
  BATCH_2_CHARACTERS,
  BATCH_3_CHARACTERS,
  BATCH_4_CHARACTERS,
  BATCH_5_CHARACTERS,
};
