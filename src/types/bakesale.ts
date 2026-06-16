export type DonationType = "venmo" | "classy" | "zelle" | "paypal" | "cashapp" | "other";

export interface DonationOption {
  id: string;
  type: DonationType;
  label: string;
  url: string;
  subtitle: string;
}

export interface BeneficiaryOrg {
  name: string;
  aboutUrl: string;
  description: string;
  logoUrl?: string;
}

export interface Recipe {
  name: string;
  description: string;
  emoji: string;
}

export interface BakesaleConfig {
  /** @deprecated Use recipes instead */
  recipe?: Recipe;
  recipes: Recipe[];
  passcode: string;
  personalMessage: string;
  bakerName: string;
  beneficiary: BeneficiaryOrg;
  donationOptions: DonationOption[];
}
