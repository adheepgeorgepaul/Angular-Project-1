import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';

import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipeIngredients: FormArray;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        
      }
    );
  }

  onSubmit()
  {
    // const recipeName = this.recipeForm.value.name;
    // const recipeDesc = this.recipeForm.value.description;
    // const recipeImage = this.recipeForm.value['imagePath'];
    // const recipeIngredients = this.recipeForm.value.ingredients;
    // const newRecipe = new Recipe(recipeName, recipeDesc, recipeImage, recipeIngredients); 
    if(this.editMode)
    {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else
    {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

  }

  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, 
          [Validators.required, Validators.pattern(/^[0-9]+[1-9]*$/)])
      })
    );
  }

  getControls()
  {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm()
  {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if(this.editMode)
    {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if(recipe.ingredients)
      {
        for(let ingredient of recipe.ingredients)
        {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
                  [Validators.required, Validators.pattern(/^[0-9]+[1-9]*$/)])
            })
          );  
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
