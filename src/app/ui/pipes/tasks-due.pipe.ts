import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from '../../models/crm/Appointment';
import { AppConfig } from '../../app.config';

@Pipe({
  name: 'tasksDue'
})
export class TasksDuePipe implements PipeTransform {
  private appConfig: AppConfig = new AppConfig();

  transform(appointments: Appointment[], due: boolean, date: Date): Appointment[] {
    // if (appointments) {
    //   return  appointments.filter(ap => ap.due === due);
    // }

    // console.log('Start Day', appointments[0].startDate.getDate());

    if (appointments) {

      if (due === false) {
        return appointments.filter(ap => {
          if (ap.appointmentTypeId === this.appConfig.appointmentType.appointment) {
            return (ap.startDate.getDate() === date.getDate() && ap.endDate.getDate() === date.getDate()) ||
            (ap.startDate.getDate() === date.getDate()) || (ap.endDate.getDate() === date.getDate());
          }
          if (ap.appointmentTypeId === this.appConfig.appointmentType.pendingTask) {
            return ap.endDate >= date;
          }
          if (ap.appointmentTypeId === this.appConfig.appointmentType.reminder) { 
            return ap.endDate.getDate() === date.getDate();
          }
        }
        );

      } else {
        return appointments.filter(ap => {
          if (ap.appointmentTypeId === this.appConfig.appointmentType.appointment) {
            return ap.startDate.getDate() < date.getDate() &&
              ap.endDate.getDate() < date.getDate();
          }
          if (ap.appointmentTypeId === this.appConfig.appointmentType.pendingTask) {
            return ap.endDate < date;
          }
          if (ap.appointmentTypeId === this.appConfig.appointmentType.reminder) {
            return ap.endDate.getDate() < date.getDate();
          }
        }
        );
      }
    }


    return appointments;
  }

}
