import { Ingredient } from 'src/modules/ingredients/entities/ingredient.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

// inventory.entity.ts
@Entity()
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.inventories, {
    onDelete: 'CASCADE',
  })
  ingredient: Ingredient;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column()
  lastUpdated: Date;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  minimumRequired: number;

  @Column({ default: false })
  lowStock: boolean;
}
