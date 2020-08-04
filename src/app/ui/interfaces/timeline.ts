export interface ITimelineBox {
  sectionLabel: string;
  sectionData: ITimeline[];
}

export interface ITimeline {
  date: string;
  content: string;
  title: string;
  icon?: string;
  iconBg?: string;
  iconColor?: string;
}
