export class IBasicUserDetails {
  // The given name of the user
  given_name: string;

  // The preferred username of the user
  preferred_username: string;

  // The email address of the user
  email: string;

  // The birthdate of the user
  birthdate: string;

  // The phone number of the user
  phone_number: string;

  // The user's single sign-on ID
  user_sso_id: string;

  // The PAN number of the user
  pan_number: string;

  // The driving licence number of the user
  driving_licence: string;

  // The masked Aadhaar number of the user
  masked_aadhaar: string;

  // The Digilocker ID of the user
  digilockerid?: string;

  // Whether the user is verified
  verified?: boolean | false;

  // The gender of the user
  gender?: string;

  // The address of the user
  address?: any;
}

// Interface for IProviderDto
export interface IProviderDto {
  // The ID of the provider
  id: string;

  // The name of the provider
  name: string;
}

// Interface for ICreateKycDto
export interface ICreateKycDto {
  // The last name of the user
  lastName: string;

  // The first name of the user
  firstName: string;

  // The email address of the user
  email: string;

  // The address of the user
  address: string;

  // The gender of the user
  gender: string;

  // The dob of the user
  dob: string;

  // The ID of the wallet
  walletId?: string;

  // The provider details
  provider: IProviderDto;
}
