export interface Level {
  id: string;
  levelNumber: number;
  gridSize: number;       // e.g., 4 means 4x4 grid
  timeLimitSeconds: number;
  starThresholds: { [stars: number]: number }; // Map: stars -> max time for star rating
  isLocked: boolean;
}
