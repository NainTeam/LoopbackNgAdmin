import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiTableComponent } from './components/api-table/api-table.component';
import { ApiRowComponent } from './components/api-table/api-row/api-row.component';
import { ModelFormComponent } from './components/model-form/model-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ModelSearchComponent } from './components/model-search/model-search.component';
import { ApiLoguedGuard } from './guards/api-logued.guard';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


const declarations = [
  ModelFormComponent,
  ApiRowComponent,
  ApiTableComponent,
  PaginatorComponent, CapitalizePipe, ModelSearchComponent

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  declarations: [...declarations],
  providers: [ApiLoguedGuard],
  exports: [...declarations]
})
export class LoopbackNgAdminModule { }
