import { Unit } from '../entities/ingredient.entity';

export class CreateIngredientDto {
  name: string;
  unit: Unit;
  category?: string;
}
