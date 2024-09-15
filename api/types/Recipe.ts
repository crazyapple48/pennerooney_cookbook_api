export interface Recipe {
  id?: number;
  title: string;
  method: string;
  purpose: "Side" | "Entree" | string;
  genre: string;
  source: string | null;
  page: number | null;
  rating: number;
  recipe: string;
  ingredients: string;
}
