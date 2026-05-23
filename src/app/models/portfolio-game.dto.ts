export type PortfolioGameModalKey = 'generic' | 'twilight-train' | 'process-of-elimination' | '3dchromo-twist' | 'game-jam';
export type PortfolioGameSection = 'school-projects' | 'game-jam';

export interface PortfolioGameModalSection {
  heading: string;
  body: string;
}

export interface PortfolioGameModalLink {
  label: string;
  href: string;
}

export interface PortfolioGameModalContent {
  summary?: string;
  highlights?: string[];
  sections?: PortfolioGameModalSection[];
  links?: PortfolioGameModalLink[];
}

export interface PortfolioGameDTO {
  id: number;
  title: string;
  description: string;
  context?: string;
  skills: string[];
  year: number;
  section: PortfolioGameSection;
  // Path to a background image for this portfolio item (relative to project root, e.g. '/assets/...')
  image?: string;
  modalKey?: PortfolioGameModalKey;
  modalContent?: PortfolioGameModalContent;
  iframeUrl?: string;
}
