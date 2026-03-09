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

export interface BakesaleConfig {
  recipe: {
    name: string;
    description: string;
    emoji: string;
  };
  passcode: string;
  personalMessage: string;
  bakerName: string;
  beneficiary: BeneficiaryOrg;
  donationOptions: DonationOption[];
}
