export interface Recipe {
  id: number;
  title: string;
  method: string;
  function: "Side" | "Entree" | string;
  genre: string;
  source: string | null;
  page: number | null;
  rating: number;
  recipe: string;
  ingredients: string;
}
