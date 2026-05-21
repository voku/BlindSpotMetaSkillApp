import { SkillDefinition, RoleType, CodingDirectionType, ToneType, OutputFormatType } from '../types';
import { getFocusAreas } from './focusAreas';

const VALID_ROLES: RoleType[] = ['developer', 'designer', 'product_owner', 'custom'];
const VALID_DOMAINS: CodingDirectionType[] = ['web', 'backend', 'api', 'hardware', 'mobile'];
const VALID_TONES: ToneType[] = ['constructive', 'strict', 'relentless', 'no-bullshit', 'sarcastic'];

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

/**
 * Validates and heals a SkillDefinition object.
 * Replaces invalid values with safe fallbacks and logs exact schema compliance actions.
 */
export function validateAndHealSkillDefinition(
  rawSkill: any,
  onValidationError?: (errors: ValidationError[]) => void
): SkillDefinition {
  const errors: ValidationError[] = [];
  const healed: Partial<SkillDefinition> = { ...rawSkill };

  // 1. Basic properties
  if (!healed.id || typeof healed.id !== 'string') {
    errors.push({ field: 'id', message: 'Missing or invalid skill ID. Generated dynamic fallback ID.', severity: 'warning' });
    healed.id = healed.id || `custom-skill-${Date.now()}`;
  }
  if (!healed.name || typeof healed.name !== 'string') {
    errors.push({ field: 'name', message: 'Missing skill name. Assigned placeholder label.', severity: 'warning' });
    healed.name = healed.name || 'Unnamed Skill Spec';
  }
  if (typeof healed.description !== 'string') {
    healed.description = healed.description || '';
  }

  // 2. Role validation
  if (!healed.role || !VALID_ROLES.includes(healed.role as RoleType)) {
    errors.push({ field: 'role', message: `Invalid role category "${healed.role}". Defaulting to "developer".`, severity: 'warning' });
    healed.role = 'developer';
  }

  // 3. Domain validation
  if (!healed.domain || !VALID_DOMAINS.includes(healed.domain as CodingDirectionType)) {
    errors.push({ field: 'domain', message: `Invalid engineering domain "${healed.domain}". Defaulting to "web".`, severity: 'warning' });
    healed.domain = 'web';
  }

  // 4. Tone validation
  if (!healed.tone || !VALID_TONES.includes(healed.tone as ToneType)) {
    errors.push({ field: 'tone', message: `Invalid audit tone type "${healed.tone}". Defaulting to "constructive".`, severity: 'warning' });
    healed.tone = 'constructive';
  }

  // 5. Output mode validation
  if (healed.outputMode !== 'compact' && healed.outputMode !== 'deep') {
    healed.outputMode = 'deep';
  }

  // 6. Custom rules sanitization
  if (typeof healed.customRules !== 'string') {
    healed.customRules = '';
  }

  // 7. Verdict labels validation & sanitization
  if (!Array.isArray(healed.verdictLabels)) {
    errors.push({ field: 'verdictLabels', message: 'Verdict labels is not an array. Reset to default ACCEPT/REJECT set.', severity: 'warning' });
    healed.verdictLabels = ['REJECT', 'ACCEPT WITH CONSTRAINTS', 'MINIMAL PATCH FIRST'];
  } else {
    healed.verdictLabels = healed.verdictLabels
      .map(v => String(v).trim().toUpperCase().replace(/[^A-Z\s_]+/g, ''))
      .filter(Boolean);
    if (healed.verdictLabels.length === 0) {
      healed.verdictLabels = ['REJECT', 'ACCEPT WITH CONSTRAINTS', 'MINIMAL PATCH FIRST'];
    }
  }

  // 8. IncludeReferences configuration healing
  if (!healed.includeReferences || typeof healed.includeReferences !== 'object') {
    errors.push({ field: 'includeReferences', message: 'Missing includeReferences configuration block. Handled with defaults.', severity: 'warning' });
    healed.includeReferences = {
      rubric: true,
      verdictMatrix: true,
      antiDogma: true,
      preflightScript: false
    };
  } else {
    healed.includeReferences = {
      rubric: typeof healed.includeReferences.rubric === 'boolean' ? healed.includeReferences.rubric : true,
      verdictMatrix: typeof healed.includeReferences.verdictMatrix === 'boolean' ? healed.includeReferences.verdictMatrix : true,
      antiDogma: typeof healed.includeReferences.antiDogma === 'boolean' ? healed.includeReferences.antiDogma : true,
      preflightScript: typeof healed.includeReferences.preflightScript === 'boolean' ? healed.includeReferences.preflightScript : false,
    };
  }

  // 9. Focus areas selection verification and alignment
  const validAreasForContext = getFocusAreas(healed.role as RoleType, healed.domain as CodingDirectionType);
  const validAreaIds = validAreasForContext.map(a => a.id);

  if (!Array.isArray(healed.focusAreas)) {
    errors.push({ field: 'focusAreas', message: 'Focus areas is not an array. Auto-populating with all valid category areas.', severity: 'warning' });
    healed.focusAreas = validAreaIds;
  } else {
    // Audit active focus areas
    const alignedAreas = healed.focusAreas.filter((id: string) => validAreaIds.includes(id));
    const mismatchCount = healed.focusAreas.length - alignedAreas.length;

    if (mismatchCount > 0) {
      errors.push({
        field: 'focusAreas',
        message: `Mismatched focus areas detected (${mismatchCount} items). Refiltered to match target context keys.`,
        severity: 'warning'
      });
    }

    if (alignedAreas.length === 0) {
      errors.push({
        field: 'focusAreas',
        message: 'No active valid focus areas selected. Defaulted to check all category criteria.',
        severity: 'warning'
      });
      healed.focusAreas = validAreaIds;
    } else {
      healed.focusAreas = alignedAreas;
    }
  }

  // 10. Intake Questions Validation
  if (typeof healed.gq1_focusArea !== 'string') {
    healed.gq1_focusArea = '';
  }
  if (typeof healed.gq2_specificConcern !== 'string') {
    healed.gq2_specificConcern = '';
  }

  if (errors.length > 0) {
    console.warn('[Schema Validator Check] Rectified state inconsistencies:', errors);
    if (onValidationError) {
      onValidationError(errors);
    }
  }

  return healed as SkillDefinition;
}
