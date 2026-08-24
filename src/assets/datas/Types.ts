// 物品类型
export const ItemType = {
  Weapon: 0,
  Helmet: 1,
  ShoulderArmor :2,
  Quiver: 3,
  Shield: 4,
  Artifact: 5,
  Potions: 6

} as const;

// 生物群系类型
export const BiomeType = {
  Any: 0,
  Forest: 1,
  Cave: 2,
  Mountain: 3,
  Ruin: 4,
  Glacier: 5,
  Chief: 6,
  Craft: 7,
  Raid: 8,
  Store: 9
} as const;

// 角色属性类型
export const CharacterStatType = {
  Stamina: 0,
  Knowledge: 1,
  Intelligence: 2,
  Strength: 3,
  Agility: 4
} as const;

// 职业类型
export const ProfessionType = {
  Warrior: 0,
  Rogue: 1,
  Archer: 2,
  Mage: 3,
  Priest: 4,
  Shaman: 5,
  Knight: 6
} as const;

// 物品数据key类型

export const ItemDataKeyType = {
  id: "id",
  name: "name",
  sourceName: "sourceName",
  itemType: "itemType",
  biomeType: "biomeType",
  characterStat: "characterStat",
  professionType: "professionType",
} as const;

// 物品数据类型
export interface ItemDataType {
  id: number;
  name: string;
  sourceName: string;
  itemType: ItemType[];
  biomeType: BiomeType[];
  characterStat: CharacterStatType[];
  professionType: ProfessionType[];
}
// 数据筛选
export interface FilterType {
  itemType: number,
  biomeType: number,
  characterStat: number,
  professionType: number,
  keyword?: string
}
// 地形图标
export interface BiomeIconType {
  name: string,
  sourceName: string,
  url?: string
}

// 导出定义的类型
export type ProfessionType = typeof ProfessionType[keyof typeof ProfessionType];
export type CharacterStatType = typeof CharacterStatType[keyof typeof CharacterStatType];
export type BiomeType = typeof BiomeType[keyof typeof BiomeType];
export type ItemType = typeof ItemType[keyof typeof ItemType];
export type ItemDataKeyType = typeof ItemDataKeyType[keyof typeof ItemDataKeyType];

