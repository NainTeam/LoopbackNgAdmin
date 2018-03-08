export const apiLoaderTemplate = `
<div class="container" *ngIf="loaderItems">

  <h2>{{modelDefinition.plural}}
    <button class="btn btn-sm btn-outline-primary" [routerLink]="createRoute">Create</button>
  </h2>

  <hr>
  <app-model-search [properties]="properties" (submitted)="apiSearch($event)"></app-model-search>


  <app-api-table [tableItems]="loaderItems" [route]="editRoute" [properties]="properties"></app-api-table>
  <br>
  <app-paginator (next)="nextPage()" [totalCount]="loaderCount" (prev)="prevPage()"></app-paginator>
</div>

`;