export class CreateRecipeDto {
  id: string;
  foodItemId: string;
  instructions: string;
  preparationTime: number;
  recipeIngredientIds: string[];
}
