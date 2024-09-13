export interface Recipe {
  id: number;
  Title: string;
  Method: string;
  Function: "Side" | "Entree" | string;
  Genre: string;
  Source: string | null;
  Page: number | null;
  Rating: number;
  Recipe: string;
  Ingredients: string;
}
