import { BiomeType, CharacterStatType, ItemType, ProfessionType } from "./Types"


export interface TagItemType {
  label: string,
  value: number
}

export const itemTypeTags: TagItemType[] = [
  {
    label: "武器",
    value: ItemType.Weapon,
  },
  {
    label: "头盔",
    value: ItemType.Helmet,
  },
  {
    label: "肩甲",
    value: ItemType.ShoulderArmor,
  },
  {
    label: "箭袋",
    value: ItemType.Quiver,
  },
  {
    label: "盾牌",
    value: ItemType.Shield,
  },
  {
    label: "神器",
    value: ItemType.Artifact,
  },
  {
    label: "药水",
    value: ItemType.Potions,
  }
]

export const biomeTags: TagItemType[] = [
  {
    label: "任意",
    value: BiomeType.Any,
  },
  {
    label: "森林",
    value: BiomeType.Forest,
  },
  {
    label: "洞穴",
    value: BiomeType.Cave,
  },
  {
    label: "山岳",
    value: BiomeType.Mountain,
  },
  {
    label: "废墟",
    value: BiomeType.Ruin,
  },
  {
    label: "冰川",
    value: BiomeType.Glacier,
  },
  {
    label: "酋长",
    value: BiomeType.Chief,
  },
  {
    label: "制作",
    value: BiomeType.Craft,
  },
  {
    label: "突袭",
    value: BiomeType.Raid,
  },
  {
    label: "商店",
    value: BiomeType.Store,
  }
]

export const statsTags: TagItemType[] = [
  {
    label: "耐力",
    value: CharacterStatType.Stamina,
  },
  {
    label: "学识",
    value: CharacterStatType.Knowledge,
  },
  {
    label: "智力",
    value: CharacterStatType.Intelligence,
  },
  {
    label: "力量",
    value: CharacterStatType.Strength,
  },
  {
    label: "敏捷",
    value: CharacterStatType.Agility,
  }
]

export const professionTags: TagItemType[] = [
  {
    label: "战士",
    value: ProfessionType.Warrior,
  },
  {
    label: "盗贼",
    value: ProfessionType.Rogue,
  },
  {
    label: "射手",
    value: ProfessionType.Archer,
  },
  {
    label: "法师",
    value: ProfessionType.Mage,
  },
  {
    label: "牧师",
    value: ProfessionType.Priest,
  },
  {
    label: "祭师",
    value: ProfessionType.Shaman,
  },
  {
    label: "骑士",
    value: ProfessionType.Knight,
  }
]