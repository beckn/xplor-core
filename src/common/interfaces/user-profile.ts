export interface IUserProfile {
  _id: string; // The unique identifier for the user
  phoneNumber: string; // The user's phone number
  verified: boolean; // Whether the user's phone number is verified
  kycStatus: boolean; // The KYC status of the user
  wallet: string | null; // The user's wallet, if any
  languagePreference: string; // The user's language preference (e.g., 'ja' for Japanese)
  domains: string[]; // A list of domains associated with the user
  categories: string[]; // A list of categories associated with the user
  accessTokenExpiry: string; // The expiry date and time of the access token
  refreshTokenExpiry: string; // The expiry date and time of the refresh token
  createdAt: string; // The creation date and time of the user record
  updatedAt: string; // The last update date and time of the user record
  role: string | any; // The role of the user, if any
}
