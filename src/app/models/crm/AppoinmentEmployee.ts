import { Appointment } from './Appointment';


export class AppointmentEmployee {

  public appointmentId: number;
  public employeeId: number;
  public owner: boolean = true;
  public confirmed: boolean = true;
  public confirmDate: Date;

  public appointment: Appointment;

  constructor(employeeId: number, confirmDate: Date) {
    this.employeeId = employeeId;
    this.confirmDate = confirmDate;
  }
}
