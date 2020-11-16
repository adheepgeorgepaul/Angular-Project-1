import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { DropdownDirective } from '../shared/dropdown.directive';

@NgModule({
    declarations: 
    [
        RecipesComponent,
        RecipeListComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipeDetailComponent,
        DropdownDirective
    ],

    imports: 
    [
        RouterModule,
        CommonModule,
        ReactiveFormsModule
    ],

    exports: 
    [
        RecipesComponent,
        RecipeListComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipeDetailComponent,
        DropdownDirective
    ]
})
export class RecipesModule
{

}