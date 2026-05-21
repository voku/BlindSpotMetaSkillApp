export type RoleType = 'developer' | 'designer' | 'product_owner' | 'custom';

export type CodingDirectionType = 'web' | 'backend' | 'api' | 'hardware' | 'mobile';

export type ToneType = 'constructive' | 'strict' | 'relentless' | 'no-bullshit' | 'sarcastic';

export type OutputFormatType = 'markdown' | 'json';

export interface SkillDefinition {
  id: string;
  name: string;
  description: string;
  role: RoleType;
  domain: CodingDirectionType;
  tone: ToneType;
  skillFormat?: OutputFormatType;
  focusAreas: string[];
  customRules: string;
  outputMode: 'compact' | 'deep';
  verdictLabels: string[]; // e.g., ["REJECT", "ACCEPT WITH CONSTRAINTS", ...]
  language?: string;
  includeReferences: {
    rubric: boolean;
    verdictMatrix: boolean;
    antiDogma: boolean;
    preflightScript: boolean;
  };
  customVerdictsText?: string;
  gq1_focusArea?: string;
  gq2_specificConcern?: string;
}

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface GrillResult {
  stdout: string;
  loading: boolean;
  error: string | null;
}
