import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        //3 ways to access a form element
        // 1
        console.log(this.recipeForm.value.name);
        // 2
        console.log(this.recipeForm.get('name').value);
        // 3
        // Use a local Reference(#) and access the value from it

       
        
        
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

    this.onCancel();
  }

  onCancel()
  {
    this.router.navigate(['../'], {relativeTo: this.route});
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
  
  onDeleteIngredient(index: number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onClearIngredients()
  {
    (<FormArray>this.recipeForm.get('ingredients')).clear();
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
