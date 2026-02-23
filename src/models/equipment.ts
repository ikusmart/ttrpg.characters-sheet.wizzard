export interface EquipmentItem {
  id: string;
  name: string;
  nameEn: string;
  quantity: number;
  weight: number;
  equipped: boolean;
  category: 'weapon' | 'armor' | 'shield' | 'adventuring-gear' | 'tool' | 'other';
}

export interface Attack {
  name: string;
  nameEn: string;
  attackBonus: number;
  damage: string;
  damageType: string;
}
