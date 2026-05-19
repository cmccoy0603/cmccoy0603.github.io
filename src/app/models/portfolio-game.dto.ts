export interface PortfolioGameDTO {
  id: number;
  title: string;
  description: string;
  // Path to a background image for this portfolio item (relative to project root, e.g. '/assets/...')
  image?: string;
  //modalId: string;
}
