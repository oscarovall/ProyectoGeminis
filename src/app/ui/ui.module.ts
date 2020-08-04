import { NgModule } from '@angular/core';
import { CommonModule, NumberFormatStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';

import { TCAutocompleteDirective } from './directives/autocomplete/autocomplete.directive';
import { TCBorderColorDirective } from './directives/border-color/border-color.directive';
import { TCFilterTableDirective } from './directives/filter-table/filter-table.directive';
import { TCBorderStyleDirective } from './directives/border-style/border-style.directive';
import { TCSortTableDirective } from './directives/sort-table/sort-table.directive';
import { TCBgColorDirective } from './directives/bg-color/bg-color.directive';
import { TCGradientDirective } from './directives/gradient/gradient.directive';
import { TCColorDirective } from './directives/color/color.directive';
import { TCShapeDirective } from './directives/shape/shape.directive';
import { TCFocusDirective } from './directives/focus/focus.directive';

import { TCListItemComponent } from './components/list/list-item';
import { TCPanelComponent } from './components/accordion/panel';
import { TCColumnComponent } from './components/table/column/column.component';
import { TCProgressComponent } from './components/progress';
import { TCAccordionComponent } from './components/accordion';
import { TCButtonComponent } from './components/button';
import { TCTabComponent } from './components/tabs/tab';
import { TCTableComponent } from './components/table';
import { TCListComponent } from './components/list';
import { TCCardComponent } from './components/card';
import { TCTabsComponent } from './components/tabs';
import { TCInputComponent } from './components/input';
import { TCFormDescriptionComponent } from './components/form-description';
import { TCFormGroupComponent } from './components/form-group';
import { TCFormLabelComponent } from './components/form-label';
import { TCPaginationComponent } from './components/pagination';
import { TCToDoListComponent } from './components/to-do-list';
import { TCCheckboxComponent } from './components/checkbox';
import { TCInboxComponent } from './components/inbox';
import { TCTextareaComponent } from './components/textarea';
import { TCUsersComponent } from './components/users';
import { TCContactComponent } from './components/contact';
import { TCTaskboardComponent } from './components/taskboard';
import { TCSwitcherComponent } from './components/switcher';
import { HightlightPipe } from './pipes/hightlight/hightlight.pipe';
import { TCAutocompleteComponent } from './components/autocomplete';
import { TСChatComponent } from './components/chat';
import { TCPricingComponent } from './components/pricing';
import { TCRadioComponent, TCRadioOptionComponent } from './components/radio';
import { TCBadgeComponent } from './components/badge';
import { TCDropdownComponent, TCDropdownButtonComponent, TCDropdownContentComponent } from './components/dropdown';
import { TCIconComponent } from './components/icon';
import { TCFontSizeDirective } from './directives/font-size/font-size.directive';
import { TCVTimelineComponent } from './components/v-timeline';
import { TCSelectComponent } from './components/select';
import { TCSliderComponent, TCSliderHandlerComponent } from './components/slider';
import { TCNotificationComponent, TCNotificationLayoutComponent } from './components/notification';
import { TCAlertComponent } from './components/alert';
import { TCRatingComponent } from './components/rating';
import { FilterGroupPipe } from './pipes/filter-group.pipe';
import { LinealGaugeComponent } from './components/lineal-gauge/lineal-gauge.component';
import { StepsComponent } from './components/steps/steps.component';
import { ClientActivityComponent } from './components/client-activity/client-activity.component';
import { NumberPickerComponent } from './components/number-picker/number-picker.component';
import { UiWorkflowComponent } from './components/ui-workflow/ui-workflow.component';
import { UiNormalStepComponent } from './components/ui-workflow/ui-normal-step/ui-normal-step.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { DocUploadComponent } from './components/file-uploader/doc-upload/doc-upload.component';
import { ClassGroupPipe } from './pipes/class-group.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { NumberFormatComponent } from './components/number-format/number-format.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RequiredCheckboxDirective } from './directives/required-checkbox/required-checkbox.directive';
import { RangeComponent } from './components/range/range.component';
import { DateagoPipePipe } from './pipes/dateago-pipe.pipe';
import { DatecolorPipePipe } from './pipes/datecolor-pipe.pipe';
import { ClasscolPipePipe } from './pipes/classcol-pipe.pipe';
import { AttTypeGroupPipe } from './pipes/att-type-group.pipe';
import { TasksDuePipe } from './pipes/tasks-due.pipe';
import { NgbdPaginationAdvancedModule } from './components/pagination-advanced/pagination-advanced.module';
import { ImagePipe } from './pipes/image.pipe';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { EmployeesStorePipe } from './pipes/employees-store.pipe';
import { FormsCategoryPipe } from './pipes/forms-category.pipe';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  imports: [
    NgbdPaginationAdvancedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragulaModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    TCAutocompleteDirective,
    TCButtonComponent,
    TCBgColorDirective,
    TCBorderColorDirective,
    TCBorderStyleDirective,
    TCColorDirective,
    TCFocusDirective,
    TCGradientDirective,
    TCShapeDirective,
    TCFontSizeDirective,
    TCCardComponent,
    TCTabsComponent,
    TCTabComponent,
    TCAccordionComponent,
    TCPanelComponent,
    TCTableComponent,
    TCColumnComponent,
    TCSortTableDirective,
    TCFilterTableDirective,
    TCProgressComponent,
    TCListComponent,
    TCListItemComponent,
    TCInputComponent,
    TCTextareaComponent,
    TCFormDescriptionComponent,
    TCFormGroupComponent,
    TCFormLabelComponent,
    TCPaginationComponent,
    TCToDoListComponent,
    TCCheckboxComponent,
    TCInboxComponent,
    TCUsersComponent,
    TCContactComponent,
    TCTaskboardComponent,
    TCSwitcherComponent,
    HightlightPipe,
    TCAutocompleteComponent,
    TСChatComponent,
    TCPricingComponent,
    TCRadioComponent,
    TCRadioOptionComponent,
    TCBadgeComponent,
    TCDropdownComponent,
    TCDropdownButtonComponent,
    TCDropdownContentComponent,
    TCIconComponent,
    TCVTimelineComponent,
    TCSelectComponent,
    TCSliderComponent,
    TCSliderHandlerComponent,
    TCNotificationComponent,
    TCNotificationLayoutComponent,
    TCAlertComponent,
    TCRatingComponent,
    LinealGaugeComponent,
    StepsComponent,
    ClientActivityComponent,
    FilterGroupPipe,
    NumberPickerComponent,
    UiWorkflowComponent,
    UiNormalStepComponent,
    FileUploaderComponent,
    SnackBarComponent,
    DocUploadComponent,
    ClassGroupPipe,
    EllipsisPipe,
    NumberFormatComponent,
    DatePickerComponent,
    RequiredCheckboxDirective,
    RangeComponent,
    DateagoPipePipe,
    DatecolorPipePipe,
    ClasscolPipePipe,
    AttTypeGroupPipe,
    TasksDuePipe,
    ImagePipe,
    EmployeesStorePipe,
    PhoneNumberPipe,
    FormsCategoryPipe,
    SafePipe
  ],
  exports: [
    SafePipe,
    FormsCategoryPipe,
    EmployeesStorePipe,
    ImagePipe,
    TasksDuePipe,
    AttTypeGroupPipe,
    ClasscolPipePipe,
    DatecolorPipePipe,
    DateagoPipePipe,
    RangeComponent,
    RequiredCheckboxDirective,
    DatePickerComponent,
    NumberFormatComponent,
    FileUploaderComponent,
    NumberPickerComponent,
    ClientActivityComponent,
    StepsComponent,
    LinealGaugeComponent,
    FilterGroupPipe,
    UiWorkflowComponent,
    TCAutocompleteDirective,
    TCButtonComponent,
    TCBgColorDirective,
    TCBorderColorDirective,
    TCBorderStyleDirective,
    TCColorDirective,
    TCGradientDirective,
    TCShapeDirective,
    TCFontSizeDirective,
    TCCardComponent,
    TCTabsComponent,
    TCTabComponent,
    TCAccordionComponent,
    TCPanelComponent,
    TCTableComponent,
    TCSortTableDirective,
    TCProgressComponent,
    TCListComponent,
    TCListItemComponent,
    TCColumnComponent,
    TCInputComponent,
    TCTextareaComponent,
    TCFormDescriptionComponent,
    TCFormGroupComponent,
    TCFormLabelComponent,
    TCToDoListComponent,
    TCCheckboxComponent,
    TCInboxComponent,
    TCUsersComponent,
    TCContactComponent,
    TCTaskboardComponent,
    TCSwitcherComponent,
    HightlightPipe,
    TCAutocompleteComponent,
    TCFocusDirective,
    TСChatComponent,
    TCPricingComponent,
    TCPricingComponent,
    TCRadioComponent,
    TCRadioOptionComponent,
    TCBadgeComponent,
    TCDropdownComponent,
    TCDropdownButtonComponent,
    TCDropdownContentComponent,
    TCIconComponent,
    TCVTimelineComponent,
    TCSelectComponent,
    TCSliderComponent,
    TCNotificationComponent,
    TCNotificationLayoutComponent,
    TCAlertComponent,
    TCRatingComponent,
    DocUploadComponent,
    ClassGroupPipe,
    EllipsisPipe,
    PhoneNumberPipe
  ]
})
export class UIModule { }
