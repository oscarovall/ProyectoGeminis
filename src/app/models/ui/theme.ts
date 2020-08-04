export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: 'light',
  properties: {
    '--foreground-default': '#F4F6F9',
    '--foreground-table': '#FFFFFF',
    '--font-table': '#00529B',
    '--font-table-content': '#00529B',
    '--color-main-font': '#0C1D55',
    '--foreground-widgets': '#FFFFFF',
    '--tittleLeads': '#0c1d55',
    '--subtitleWidget': '#00529b',
    '--numberWidget': '#5aaef3',
    '--boxShadowWidget': '0px 5px 10px 1px gainsboro',
    '--gross-profit': '#FFFFFF',
    '--graph-Appointments': '#FFFFFF',
    '--custom-select': '#dbe3f1',
    '--font-filtros': '#00529b',
    '--task-description': '#00529b',
    '--table-responsive': '#dee2e6',
    '--label-center': '#0C1D55',
    '--alert-warning': '#ffffff',
  }
};

export const dark: Theme = {
  name: 'dark',
  properties: {
    '--foreground-default': '#001347',
    '--foreground-table': '#0c1d55',
    '--font-table': '#FFFFFF',
    '--font-table-content': '#cac5cb',
    '--color-main-font': '#eae5eb',
    '--foreground-widgets': '#0c1d55',
    '--tittleLeads': '#FFFFFF',
    '--subtitleWidget': '#FFFFFF',
    '--numberWidget': '#5aaef3',
    '--boxShadowWidget': '0px 5px 10px 1px #00182b',
    '--gross-profit': '#0c1d55',
    '--graph-Appointments': '#0c1d55',
    '--custom-select': '#1F316B',
    '--font-filtros': '#ffffff',
    '--task-description': '#ffffff',
    '--table-responsive': 'transparent',
    '--label-center': '#ffffff',
    '--alert-warning': '#0C1D55',
  }
};
