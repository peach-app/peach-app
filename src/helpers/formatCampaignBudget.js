import { formatToMoneyFromPence } from './formatPence';

export const formatCampaignBudget = budget =>
  budget > 0 ? formatToMoneyFromPence(budget) : 'unknown';
