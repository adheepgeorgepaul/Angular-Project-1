import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'This is test 1',
    'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/105168995/original/af8c781921c5b18160c2e786a9a982caf39955cb/shoot-quality-food-photography.jpg'),

    new Recipe('Test Recipe 2', 'This is test 2',
    'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/105168995/original/af8c781921c5b18160c2e786a9a982caf39955cb/shoot-quality-food-photography.jpg'),

    new Recipe('Test Recipe 3', 'This is test 3',
    'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/105168995/original/af8c781921c5b18160c2e786a9a982caf39955cb/shoot-quality-food-photography.jpg')


  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe)
  {
    this.recipeWasSelected.emit(recipe);
  }
}
