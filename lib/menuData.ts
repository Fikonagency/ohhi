export type MenuItem = {
  id: string;
  name: string;
  nameSv?: string;
  price: number;
  category: MenuCategoryKey;
};

export type MenuCategoryKey = "drinks" | "morning" | "allday" | "sweet";

export const categories: { key: MenuCategoryKey; en: string; sv: string; note?: { en: string; sv: string } }[] = [
  { key: "drinks", en: "Coffee & Drinks", sv: "Kaffe & Dryck" },
  { key: "morning", en: "Morning", sv: "Morgon", note: { en: "07:00–11:00", sv: "07:00–11:00" } },
  { key: "allday", en: "All Day", sv: "Hela Dagen" },
  { key: "sweet", en: "Something Sweet", sv: "Något Sött" },
];

export const menu: MenuItem[] = [
  { id: "espresso", name: "Espresso", price: 35, category: "drinks" },
  { id: "cortado", name: "Cortado", price: 42, category: "drinks" },
  { id: "flatwhite", name: "Flat white", price: 48, category: "drinks" },
  { id: "filter", name: "Filter coffee", nameSv: "Bryggkaffe", price: 38, category: "drinks" },
  { id: "oatlatte", name: "Oat latte", nameSv: "Havrelatte", price: 52, category: "drinks" },
  { id: "coldbrew", name: "Cold brew", price: 45, category: "drinks" },
  { id: "matcha", name: "Matcha latte", price: 55, category: "drinks" },
  { id: "oj", name: "Fresh orange juice", nameSv: "Nypressad apelsinjuice", price: 45, category: "drinks" },
  { id: "sparkling", name: "Sparkling water 33cl", nameSv: "Bubbelvatten 33cl", price: 28, category: "drinks" },

  { id: "toast", name: "Sourdough toast, cultured butter & sea salt", nameSv: "Surdegstoast, smör & havssalt", price: 42, category: "morning" },
  { id: "eggs", name: "Soft scrambled eggs on toast", nameSv: "Krämig äggröra på toast", price: 85, category: "morning" },
  { id: "granola", name: "Granola, skyr & seasonal fruit", nameSv: "Granola, skyr & säsongens frukt", price: 72, category: "morning" },
  { id: "almond", name: "Almond croissant", nameSv: "Mandelcroissant", price: 48, category: "morning" },
  { id: "pain", name: "Pain au chocolat", price: 45, category: "morning" },

  { id: "salmon", name: "Smoked salmon open sandwich", nameSv: "Rökt lax på surdeg", price: 110, category: "allday" },
  { id: "mushroom", name: "Mushroom & aged cheese toast", nameSv: "Svamp & lagrad ost på toast", price: 95, category: "allday" },
  { id: "salad", name: "Seasonal salad (ask the team)", nameSv: "Säsongssallad (fråga oss)", price: 105, category: "allday" },
  { id: "cheese", name: "Cheese & charcuterie plate", nameSv: "Ost- & charkbricka", price: 145, category: "allday" },

  { id: "cardamom", name: "Cardamom bun", nameSv: "Kardemummabulle", price: 42, category: "sweet" },
  { id: "kouign", name: "Kouign-amann", price: 48, category: "sweet" },
  { id: "financier", name: "Financier", price: 38, category: "sweet" },
  { id: "tart", name: "Seasonal tart (ask the team)", nameSv: "Säsongstarte (fråga oss)", price: 52, category: "sweet" },
];
