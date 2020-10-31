import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService
{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Penne Pasta',
            'This Creamy Garlic Penne Pasta is a white sauce pasta that is great on it’s own, but could be even heartier if you add chicken or another favorite meat.',
            'https://lilluna.com/wp-content/uploads/2017/10/penne-pasta-resize-1.jpg',
            [new Ingredient('Pasta', 2),
             new Ingredient('Broccoli', 1),
             new Ingredient('Meat', 1),
             new Ingredient('Butter', 1),
             new Ingredient('Garlic', 5),
             new Ingredient('Cheese',4)    
            ]),
            
        new Recipe(
            'Banana Pancake',
            'They’re simple and quick to make, and use ingredients that we nearly always have in the house. They have a fantastic banana flavor, and are totally delicious with butter, syrup, and sliced bananas on top!',
            'https://lilluna.com/wp-content/uploads/2018/03/banana-pancakes-resize-9.jpg',
            [new Ingredient('Flour', 1),
             new Ingredient('Sugar', 2),
             new Ingredient('Baking Soda', 1),
             new Ingredient('Salt', 1),
             new Ingredient('Eggs', 5),
             new Ingredient('Bananas',4)    
            ])
    ];

    constructor(private slService: ShoppingListService ){}

    getRecipes()
    {
        return this.recipes.slice()
    }

    getRecipe(index: number)
    {
        return this.recipes[index];
        
    }


    addIngredientsToShoppingList(ingredients: Ingredient[])
    {
        this.slService.addIngredients(ingredients);
    }
}