import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from '../../models/crm/Appointment';
import { AppConfig } from '../../app.config';

@Pipe({
  name: 'appointmentsTasks'
})
export class AppointmentsTasksPipe implements PipeTransform {
  private appConfig: AppConfig = new AppConfig();

  transform(appointments: Appointment[], appointment: boolean): Appointment[] {

    if (appointments) {

      if (appointment === true) {
        appointments = appointments.filter(ap => {
          return ap.appointmentTypeId === this.appConfig.appointmentType.appointment;
        });

      } else {
        appointments = appointments.filter(ap => {
          return ap.appointmentTypeId !== this.appConfig.appointmentType.appointment;
        });
      }
    }

    console.log('Appointments', appointments);


    return appointments;
  }

}
