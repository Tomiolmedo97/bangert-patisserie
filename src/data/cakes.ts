export type Category = "Clásicas" | "Chocolate" | "Fruta" | "De autor";

export type Cake = {
  id: string;
  name: string;
  category: Category;
  image: string;
  blurb: string;
  description: string;
  notes: string;
  /** Precio de referencia para 12 porciones, en pesos. */
  price12: number;
};

export const SIZES = [
  { id: "8", label: "8 porciones", factor: 0.72 },
  { id: "12", label: "12 porciones", factor: 1 },
  { id: "20", label: "20 porciones", factor: 1.6 },
] as const;

export type SizeId = (typeof SIZES)[number]["id"];

export const CATEGORIES = ["Todas", "Clásicas", "Chocolate", "Fruta", "De autor"] as const;

export const cakes: Cake[] = [
  {
    id: "cheesecake-pistacho",
    name: "Cheesecake Pistacho",
    category: "De autor",
    image: "/cakes/cheesecake-pistacho.jpg",
    blurb: "20cm diámetro 💚",
    description: "Cheesecake Pistacho. 20cm de diámetro.",
    notes: "Referencia: 20cm de diámetro. Precios provisorios, consultá al pedir.",
    price12: 92000,
  },
  {
    id: "brownie-duo",
    name: "Brownie Dúo",
    category: "Chocolate",
    image: "/cakes/brownie-duo.jpg",
    blurb: "20cm diámetro 🖤",
    description: "Brownie Dúo. 20cm de diámetro.",
    notes: "Referencia: 20cm de diámetro.",
    price12: 62000,
  },
  {
    id: "cheesecake-maracuya",
    name: "Cheesecake Maracuya",
    category: "Fruta",
    image: "/cakes/cheesecake-maracuya.jpg",
    blurb: "20cm diámetro 🧡",
    description: "Cheesecake Maracuya. 20cm de diámetro.",
    notes: "Referencia: 20cm de diámetro.",
    price12: 78000,
  },
  {
    id: "rogel",
    name: "Rogel",
    category: "Clásicas",
    image: "/cakes/rogel.jpg",
    blurb: "20cm diámetro 🤍",
    description: "Rogel. 20cm de diámetro.",
    notes: "Referencia: 20cm de diámetro.",
    price12: 74000,
  },
  {
    id: "tarta-havannet",
    name: "Tarta Havannet",
    category: "Clásicas",
    image: "/cakes/tarta-havannet.jpg",
    blurb: "20cm diámetro 🤎",
    description: "Tarta Havannet. 20cm de diámetro.",
    notes: "Referencia: 20cm de diámetro.",
    price12: 70000,
  },
  {
    id: "torta-personalizada-bautismo",
    name: "Torta Personalizada Bautismo",
    category: "De autor",
    image: "/cakes/torta-personalizada-bautismo.jpg",
    blurb: "26cm · bizcocho vainilla, Bariloche y frutillas 🪽",
    description:
      "Torta Personalizada Bautismo. 26cm de diámetro. Bizcocho de vainilla con dos cortes de relleno: crema Bariloche con chips de chocolate blanco y crema con frutillas.",
    notes:
      "Referencia: 26cm de diámetro. El diseño varía según la ocasión; esta es una referencia de bautismo.",
    price12: 110000,
  },
  {
    id: "key-lime-pie",
    name: "Key Lime Pie",
    category: "Fruta",
    image: "/cakes/key-lime-pie.jpg",
    blurb: "20cm diámetro 🍋",
    description: "Key Lime Pie. 20cm de diámetro.",
    notes: "Referencia: 20cm de diámetro.",
    price12: 68000,
  },
  {
    id: "cheesecake-frutos-rojos",
    name: "Cheesecake Frutos Rojos",
    category: "Fruta",
    image: "/cakes/cheesecake-frutos-rojos.jpg",
    blurb: "20cm diámetro 🍓🫐",
    description: "Cheesecake Frutos Rojos. 20cm de diámetro.",
    notes: "Referencia: 20cm de diámetro.",
    price12: 76000,
  },
  {
    id: "torta-chaja",
    name: "Torta Chaja",
    category: "Clásicas",
    image: "/cakes/torta-chaja.jpg",
    blurb: "20cm · dulce de leche, merengues y durazno 🍑",
    description:
      "Torta Chaja. 20cm de diámetro. Bizcocho de vainilla con dos cortes de relleno: dulce de leche y merengues, y crema con durazno.",
    notes: "Referencia: 20cm de diámetro.",
    price12: 80000,
  },
  {
    id: "tarta-de-frutilla",
    name: "Tarta de Frutilla",
    category: "Fruta",
    image: "/cakes/tarta-de-frutilla.jpg",
    blurb: "26cm · sable, dulce de leche y frutillas 🍓",
    description:
      "Tarta de Frutilla. 26cm de diámetro. Masa sable con capa fina de dulce de leche, crema chantilly y muuuuuuuuchas frutillas.",
    notes: "Referencia: 26cm de diámetro.",
    price12: 72000,
  },
  {
    id: "torta-matilda",
    name: "Torta Matilda",
    category: "Chocolate",
    image: "/cakes/torta-matilda.jpg",
    blurb: "20cm · bizcochos de chocolate y crema Bariloche 🍫",
    description:
      "Torta Matilda. 20cm de diámetro. Bizcochos súper húmedos de chocolate con dos cortes de relleno de crema Bariloche. Si te gusta el chocolate, esta torta no falla.",
    notes: "Referencia: 20cm de diámetro.",
    price12: 86000,
  },
];

export function cakeById(id: string) {
  return cakes.find((cake) => cake.id === id);
}

export function sizeById(id: SizeId) {
  return SIZES.find((size) => size.id === id) ?? SIZES[1];
}

export function linePrice(price12: number, size: SizeId) {
  return Math.round(price12 * sizeById(size).factor);
}

export function desde(price12: number) {
  return linePrice(price12, "8");
}

const money = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function formatArs(value: number) {
  return money.format(value);
}
