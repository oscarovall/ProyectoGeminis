import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  // api: String = 'https://localhost:5001/api/';
  // api: String = 'https://stageapi.myamericasa.com/api/';

  employeeStatus = {
    available: 'Available',
    busy: 'Busy',
    offline: 'Offline',
  };

  rightMenu = {
    calendar: 'Calendar',
    profile: 'Profile',
    userEdit: 'User Edit',
    createLead: 'Create Lead',
    role: 'Role',
    form: 'Form',
    sendMessage: 'Send Message',
    editCustomer: 'Edit Customer',
    productDetail: 'Product Detail',
    dealership: 'Dealership',
    storage: 'Storage',
    lot: 'Lot',
    manufacturer: 'Manufacturer',
    plant: 'Plant',
    catalog: 'Catalog'
  };

  channelType = {
    email: 'Email',
    whatsapp: 'Whatsapp',
    textMessage: 'Text Message',
  };

  templates = {
    email: 'Email',
    textMessage: 'Text Message',
  };

  appointmentType = {
    appointment: 'Appointment',
    pendingTask: 'Pending task',
    reminder: 'Reminder',
  };

  languages = {
    spanish: 'Spanish',
    english: 'English',
  };

  leadBasicInformation = {
    Source: 1,
    firstVisit: 2,
    signDate: 3,
    closeDate: 4
  };

  leadStepStatus = {
    current: 'Current'
  };

  stepType = {
    condition: 0,
    connector: 10
  };

  objectType = {
    Vendor: 1,
    Product: 2,
    Customer: 3,
    Lead: 4,
  };

  rolesIds = {
    la: 18,
    sr: 4,
    pa: 3
  };

  specificRoles = {
    om: 'Operation Manager',
    vps: 'VP of Sales',
    sr: 'Sales Representative',
    pa: 'Processing Agent'
  };

  leadStatus = {
    active: 'Active',
    closed: 'Closed',
    delivery: 'Delivery',
    lost: 'Lost',
    potencial: 'Potencial',
    pre: 'Pre',
    qualified: 'Qualified',
    rejected: 'Rejected',
    stalled: 'Stalled'
  };

  productInvAvStatus = {
    available: 'Available',
    sold: 'Sold',
    onOnrder: 'On Order',
    offline: 'Offline',
    model: 'Model'
  };

  customerStatus = {
    new: 'New',
    contacted: 'Contacted',
    messageSent: 'Message Sent',
    appointmentSet: 'Appointment Set',
    lost: 'Lost',
  };

  leadStatusIds = {
    active: 0,
    closed: 1,
    delivery: 2,
    lost: 3,
    potencial: 4,
    pre: 5,
    qualified: 6,
    rejected: 7,
    stalled: 8
  };

  CustomerAT = {
    Name: 1,
    Lastname: 79,
    MobileNum: 2,
    Email: 5,
  };

  salesWorkflowId = 1;

  dataType = {
    NoList: [1, 2, 3, 5, 7, 8, 10, 12, 13, 14, 15, 16],
    List: [4],
    DocumentList: [6, 11],
    Checkbox: [9],

    Text: 1,
    TextLong: 2,
    Date: 3,
    ListValue: 4,
    Time: 5,
    ListImages: 6,
    Radio: 7,
    Money: 8,
    Multiple: 9,
    ExternalLink: 10,
    ListDocument: 11,
    Number: 12,
    LienalGauge: 13,
    PhoneNumber: 14,
    Progress: 15,
    MoneyRange: 16
  };
}
