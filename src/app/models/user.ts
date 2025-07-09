export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;  // Optional: usually not exposed in frontend after login
  completedLevels: number[];            // List of level numbers completed
  starsEarned: { [levelNumber: number]: number };  // Map: levelNumber -> stars earned
  timeTakenPerLevel: { [levelNumber: number]: number };  // Map: levelNumber -> time taken in seconds
}
