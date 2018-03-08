export const apiModelEditTemplate = `
<div class="container">


  <app-model-form *ngIf="item" [name]="className" [model]="item" (onSubmit)="onSubmit($event)" [properties]="properties" [formProperties]="formProperties">
    <div header>

      <a [routerLink]="backRoute" class="h6 small">
        <Back</a>
          <h3>
            {{className}}
            <small class="text-muted">{{item?.id}}</small>
          </h3>
    </div>

    <div buttons>
      <button *ngIf="item.id" type="button" class="btn btn-danger ml-1" (click)="removeItem()">Remove</button>
    </div>
  </app-model-form>
</div>

`