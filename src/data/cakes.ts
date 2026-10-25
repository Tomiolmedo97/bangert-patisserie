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
    id: "chocotorta",
    name: "Chocotorta",
    category: "Clásicas",
    image: "/cakes/chocotorta.jpg",
    blurb: "Chocolinas, queso crema y dulce de leche, bien húmeda.",
    description:
      "La de siempre, armada despacio: galletitas de chocolate apenas mojadas en café, y una crema generosa de dulce de leche repostero con queso crema. Se termina con cacao y se deja una noche en frío para que las capas se fundan.",
    notes: "La más pedida para cumpleaños en casa.",
    price12: 68000,
  },
  {
    id: "rogel",
    name: "Rogel",
    category: "Clásicas",
    image: "/cakes/rogel.jpg",
    blurb: "Hojitas crocantes, dulce de leche y merengue italiano.",
    description:
      "Capas finísimas de masa, dulce de leche abundante y una corona de merengue italiano apenas tostado. Crujiente el primer día, más tierna al segundo. Se prepara el día anterior al retiro.",
    notes: "Ideal para mesas grandes. El merengue viaja mejor si se retira en el día.",
    price12: 74000,
  },
  {
    id: "marquise",
    name: "Marquise",
    category: "Chocolate",
    image: "/cakes/marquise.jpg",
    blurb: "Chocolate negro, ganache espejo y rulos a mano.",
    description:
      "Una marquise densa de chocolate semiamargo, sin harina de más, cubierta con ganache brillante y rulos hechos en el obrador. Intensa, sedosa, y no empalaga si se sirve fresca.",
    notes: "Se conserva 48 h en heladera. Sale mejor a temperatura de mesa.",
    price12: 82000,
  },
  {
    id: "lemon",
    name: "Lemon pie",
    category: "Fruta",
    image: "/cakes/lemon.jpg",
    blurb: "Masa sablée, lemon curd y merengue flambeado.",
    description:
      "Tarta de limón con masa quebrada, curd ácido y merengue italiano flameado en picos. El contraste entre lo ácido y lo tostado es el punto: no es solo dulce.",
    notes: "Se recomienda retirarla el mismo día. No conviene freezarla.",
    price12: 62000,
  },
  {
    id: "cheesecake",
    name: "Cheesecake de frutos rojos",
    category: "Fruta",
    image: "/cakes/cheesecake.jpg",
    blurb: "Horneada, cremosa, con coulis de frutos rojos.",
    description:
      "Cheesecake horneada de queso crema, base crocante y un coulis de frutos rojos cocido en casa. Textura densa, no aireada. El coulis va aparte si el traslado es largo.",
    notes: "Sin gelatina. Se puede pedir sin coulis.",
    price12: 76000,
  },
  {
    id: "carrot",
    name: "Carrot cake",
    category: "Clásicas",
    image: "/cakes/carrot.jpg",
    blurb: "Zanahoria, especias suaves y frosting de queso.",
    description:
      "Bizcochuelo húmedo de zanahoria, nuez y un toque de canela, con frosting de queso crema entre capas y por fuera. Especiado corto, nada empalagoso.",
    notes: "Contiene nuez. Se puede hacer sin frutos secos avisando en la nota.",
    price12: 70000,
  },
  {
    id: "pistacho",
    name: "Pistacho y frambuesa",
    category: "De autor",
    image: "/cakes/pistacho.jpg",
    blurb: "Entremet de pistacho con corazón de frambuesa.",
    description:
      "Entremet cilíndrico de cremoso de pistacho, corazón ácido de frambuesa y una base fina de biscuit. El exterior es aterciopelado, en un verde pálido. Porción chica, sabor largo.",
    notes: "La de autor de la casa. Se encarga con 72 h.",
    price12: 96000,
  },
  {
    id: "velvet",
    name: "Red velvet",
    category: "Chocolate",
    image: "/cakes/velvet.jpg",
    blurb: "Miga color vino y crema de queso.",
    description:
      "Capas de red velvet con cacao y suero de leche, miga húmeda color vino, y crema de queso crema sin exceso de azúcar. Se decora lisa, sin viruta de más.",
    notes: "El color es del cacao y el vinagre, no un rojo artificial chillón.",
    price12: 78000,
  },
  {
    id: "selva",
    name: "Selva negra",
    category: "Chocolate",
    image: "/cakes/selva.jpg",
    blurb: "Bizcochuelo de cacao, crema y cerezas.",
    description:
      "Bizcochuelo de chocolate embebido apenas, crema batida y cerezas en almíbar. Una selva negra clásica, con las cerezas visibles en el corte y viruta de chocolate por arriba.",
    notes: "La crema se arma el día del retiro.",
    price12: 84000,
  },
  {
    id: "nuez",
    name: "Dulce de leche y nuez",
    category: "Clásicas",
    image: "/cakes/nuez.jpg",
    blurb: "Bizcochuelo, dulce de leche y nuez tostada.",
    description:
      "Bizcochuelo de vainilla, relleno generoso de dulce de leche y nueces tostadas, con un drip corto de dulce por el costado. Sabor de confitería, hecho en pocas unidades.",
    notes: "Contiene nuez. Avisar alergias en la nota del pedido.",
    price12: 66000,
  },
  {
    id: "brownie",
    name: "Brownie y dulce de leche",
    category: "Chocolate",
    image: "/cakes/brownie.jpg",
    blurb: "Brownie húmedo, cinta de dulce y shards.",
    description:
      "Dos capas de brownie bien húmedo, una cinta de dulce de leche y shards de chocolate. Para quien quiere chocolate sin glaseado. Se corta limpio en frío.",
    notes: "También sale en porciones individuales, consultando.",
    price12: 58000,
  },
  {
    id: "flores",
    name: "Flores",
    category: "De autor",
    image: "/cakes/flores.jpg",
    blurb: "Buttercream lisa, marfil y blush, flores de azúcar.",
    description:
      "Torta de celebración con cobertura lisa de buttercream en marfil y blush, y un ramo chico de flores de azúcar. El bizcochuelo y el relleno se eligen: vainilla y dulce de leche, chocolate, o frutos rojos.",
    notes: "El diseño de la foto es de referencia. El nombre o la dedicatoria se anota en el pedido.",
    price12: 110000,
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
