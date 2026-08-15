export interface MatchableService {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  tags: string[];
  description: string;
  postcode: string;
  suburb: string;
  isNational: boolean;
  isAboriginalLed: boolean;
}

export interface ServiceMatch<T extends MatchableService> {
  service: T;
  score: number;
  reasons: string[];
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Centrelink: ["centrelink", "pension", "benefit", "mygov", "jobseeker"],
  Legal: ["legal", "lawyer", "court", "bail", "police", "fine"],
  Housing: ["housing", "home", "homeless", "rent", "tenancy", "accommodation"],
  Health: ["health", "doctor", "medical", "clinic", "hospital"],
  "Mental Health": ["mental health", "anxiety", "depression", "counselling", "counseling"],
  Family: ["family", "children", "parenting", "domestic", "relationship"],
  Employment: ["employment", "job", "work", "resume", "training"],
  Education: ["education", "school", "study", "course", "tafe", "university"],
  Financial: ["money", "financial", "debt", "bill", "emergency relief"],
  Disability: ["disability", "ndis", "accessibility", "carer"],
  Youth: ["youth", "young person", "teenager"],
  Addiction: ["addiction", "alcohol", "drug", "rehab"],
  Culture: ["culture", "cultural", "country", "elder"],
};

export function detectNeedCategory(need: string): string {
  const normalized = need.toLowerCase();
  let bestCategory = "Other";
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = keywords.reduce((total, keyword) => total + (normalized.includes(keyword) ? 1 : 0), 0);
    if (score > bestScore) {
      bestCategory = category;
      bestScore = score;
    }
  }

  return bestCategory;
}

export function matchServices<T extends MatchableService>(
  services: T[],
  input: { need: string; postcode: string; category?: string },
  limit = 5,
): ServiceMatch<T>[] {
  const category = input.category && input.category !== "Other" ? input.category : detectNeedCategory(input.need);
  const eligibleServices =
    category !== "Other" && services.some((service) => service.category === category)
      ? services.filter((service) => service.category === category)
      : services;
  const needWords = input.need
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3);

  return eligibleServices
    .map((service) => {
      let score = 0;
      const reasons: string[] = [];
      const searchable = [service.name, service.category, service.subcategory, service.description, ...service.tags]
        .join(" ")
        .toLowerCase();

      if (category !== "Other" && service.category === category) {
        score += 60;
        reasons.push(`Matches ${category} support`);
      }

      const keywordMatches = needWords.filter((word) => searchable.includes(word)).length;
      if (keywordMatches > 0) {
        score += Math.min(keywordMatches * 6, 24);
        reasons.push("Relevant to the caller's description");
      }

      if (input.postcode && service.postcode === input.postcode) {
        score += 35;
        reasons.push(`Located in postcode ${input.postcode}`);
      } else if (input.postcode && service.postcode.slice(0, 2) === input.postcode.slice(0, 2)) {
        score += 10;
        reasons.push("Serves the surrounding region");
      }

      if (service.isAboriginalLed) {
        score += 8;
        reasons.push("Aboriginal-led service");
      }

      if (service.isNational) {
        score += 4;
        reasons.push("Available nationally");
      }

      return { service, score, reasons };
    })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || a.service.name.localeCompare(b.service.name))
    .slice(0, limit);
}
