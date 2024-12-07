export function calculateEngagementRate(
  followers: number,
  likes: number,
  comments: number
): {
  engagementRate: number;
  totalEngagements: number;
} {
  const totalEngagements = likes + comments;
  const engagementRate = (totalEngagements / followers) * 100;
  
  return { engagementRate, totalEngagements };
}

export function generateHashtags(
  keyword: string,
  count: number = 5
): string[] {
  // This is a simplified version. In a real app, you'd want to use an API
  // or a comprehensive database of trending hashtags
  const commonPrefixes = ['#', '#trending', '#viral', '#best', '#top'];
  const commonSuffixes = ['life', 'style', 'tips', 'ideas', 'inspiration'];
  
  const hashtags = new Set<string>();
  
  while (hashtags.size < count) {
    const prefix = commonPrefixes[Math.floor(Math.random() * commonPrefixes.length)];
    const suffix = commonSuffixes[Math.floor(Math.random() * commonSuffixes.length)];
    hashtags.add(`${prefix}${keyword}${suffix}`);
  }
  
  return Array.from(hashtags);
}

export function estimateAdBudget(
  targetReach: number,
  costPerMille: number
): {
  estimatedBudget: number;
  daysToReach: number;
} {
  const estimatedBudget = (targetReach / 1000) * costPerMille;
  const daysToReach = Math.ceil(targetReach / 1000);
  
  return { estimatedBudget, daysToReach };
}