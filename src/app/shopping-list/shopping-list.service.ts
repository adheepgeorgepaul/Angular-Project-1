import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService
{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredient(index:number)
    {
        return this.ingredients[index];
    }

    updateIngredient(index: number, modifiedIngredient: Ingredient)
    {
        this.ingredients[index] = modifiedIngredient;
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    getIngredients()
    {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient)
    {
        this.ingredients.push(ingredient); 
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[])
    {
        // tHE FOR LOOP METHOD LEADS TO A LOT OF EVENT EMISSIONS
     /*    for(let ingredient of ingredients)
        {
            this.addIngredient(ingredient);
        } */
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());

    }

    deleteIngredient(index: number)
    {   
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}