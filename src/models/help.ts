export type GameSystem = 'dnd' | 'vtm';

export interface HelpSection {
  id: string;
  title: string;
  summary: string;
  items: HelpItem[];
  tips?: HelpTip[];
  connections?: HelpConnection[];
}

export interface HelpItem {
  id: string;
  name: string;
  description: string;
  gameplayEffect?: string;
  relatedItems?: string[];
}

export interface HelpTip {
  text: string;
  relevantFor?: string[];
}

export interface HelpConnection {
  from: string;
  to: string;
  relation: string;
}

export interface TourStep {
  target: string;
  title: string;
  content: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
}
