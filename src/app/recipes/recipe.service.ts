import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService
{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Test Recipe 1', 'This is test 1',
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/105168995/original/af8c781921c5b18160c2e786a9a982caf39955cb/shoot-quality-food-photography.jpg'),
    
        new Recipe('Test Recipe 2', 'This is test 2',
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/105168995/original/af8c781921c5b18160c2e786a9a982caf39955cb/shoot-quality-food-photography.jpg'),
    
        new Recipe('Test Recipe 3', 'This is test 3',
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/105168995/original/af8c781921c5b18160c2e786a9a982caf39955cb/shoot-quality-food-photography.jpg')
    
    ];

    getRecipe()
    {
        return this.recipes.slice()
    }
}