import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import {
  CreateWalletDto,
  GetSharedVcRequestDto,
  QueryWalletVcDto,
  QueryWalletVcsDto,
  ShareRequestAction,
  ShareVcRequestDto,
  UpdateSharedVcStatusQuery,
  WalletQueryDto,
} from './dto';
import { Readable } from 'stream';
import { CustomMessage } from '../../common/enums/message';
import { BearerToken } from '../../common/constants/token.message';
import { DOCUMENT_TYPE } from '../../common/constants/providers';

// Test suite for WalletController
describe('WalletController', () => {
  let controller: WalletController;
  let service: WalletService;

  // Setup before each test case
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        // Mock WalletService with jest functions
        {
          provide: WalletService,
          useValue: {
            createWallet: jest.fn(),
            deleteWallet: jest.fn(),
            getWalletDetails: jest.fn(),
            getWalletVcs: jest.fn(),
            uploadFile: jest.fn(),
            getWalletVc: jest.fn(),
            deleteWalletVc: jest.fn(),
            shareVc: jest.fn(),
            updateShareVc: jest.fn(),
            updateShareVcStatus: jest.fn(),
            getVcSharedRequestsList: jest.fn(),
          },
        },
      ],
    }).compile();

    // Get instances of WalletController and WalletService
    controller = module.get<WalletController>(WalletController);
    service = module.get<WalletService>(WalletService);
  });

  // Test suite for creating a new wallet
  describe('Create Wallet', () => {
    // Test case for creating a wallet
    it('should create a Wallet', async () => {
      // Create a mock CreateWalletDto object with random data for testing
      const userId = `user_${faker.string.uuid()}`;
      const createWalletDto: CreateWalletDto = {
        // Generate a unique user ID
        fullName: faker.person.fullName(), // Generate a random full name
        email: faker.internet.email(), // Generate a random email
        organization: faker.person.jobArea(), // Generate a random organization
      };

      // Mock the response data that would be returned after a wallet is created
      const createdWallet = {
        _id: `wallet_${faker.string.uuid()}`, // Generate a unique wallet ID
        ...createWalletDto, // Spread the CreateWalletDto object to include all its properties
      };
      const mockedData = { success: true, message: CustomMessage.OK, data: createdWallet }; // Mocked response data

      // Mock the createWallet method of WalletService to return the mocked data
      jest.spyOn(service, 'createWallet').mockResolvedValueOnce(mockedData);

      // Call the controller method to create a wallet and expect the result to match the mocked data
      const result = await controller.createWallet(BearerToken, userId, createWalletDto);
      expect(result).toEqual(mockedData); // Assert that the result matches the expected mocked data
    });
  });
  //   Test suite for deleting a wallet
  describe('Delete Wallet', () => {
    // Test case for deleting a wallet
    it('should delete Wallets', async () => {
      // Mock the response data that would be returned after a wallet is deleted
      const mockedData = { success: true, message: CustomMessage.OK, data: [] };

      // Mock the deleteWallet method of WalletService to return the mocked data
      jest.spyOn(service, 'deleteWallet').mockResolvedValueOnce(mockedData);

      // Generate a unique wallet ID and user ID for the test
      const walletId = `wall_${faker.string.uuid()}`;
      const userId = `user_${faker.string.uuid()}`;

      // Create a WalletQueryDto object with the generated IDs
      const walletDto: WalletQueryDto = {
        walletId: walletId,
      };

      // Call the controller method to delete a wallet and expect the result to match the mocked data
      const result = await controller.deleteWallet(userId, walletDto);
      expect(result).toEqual(mockedData); // Assert that the result matches the expected mocked data
    });
  });

  // Test suite for deleting wallet verifiable credentials (VCs)
  describe('Delete Wallet VCs', () => {
    // Test case for deleting wallet VCs
    it('should delete Wallet Vcs', async () => {
      // Create a mock WalletVcQueryDto object with random data for testing
      const walletVcQueryDto: QueryWalletVcsDto = {
        walletId: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID
        vcIds: [faker.string.uuid()], // Generate a random VC ID
      };

      // Mock the response data that would be returned after deleting wallet VCs
      const mockedData = { success: true, message: CustomMessage.OK, data: {} };

      // Mock the deleteWalletVc method of WalletService to return the mocked data
      jest.spyOn(service, 'deleteWalletVc').mockResolvedValueOnce(mockedData);

      // Call the controller method to delete wallet VCs and expect the result to match the mocked data
      const result = await controller.deleteWalletVcs(walletVcQueryDto);
      expect(result).toEqual(mockedData); // Assert that the result matches the expected mocked data
    });
  });

  // Test suite for getting wallet details
  describe('Get Wallet Details', () => {
    // Test case for retrieving wallet details
    it('should return Wallet details', async () => {
      // Generate a unique wallet ID and user ID for the test
      const walletId = `wall_${faker.string.uuid()}`;
      const userId = `user_${faker.string.uuid()}`;

      // Create a WalletQueryDto object with the generated IDs
      const walletDto: WalletQueryDto = {
        walletId: walletId,
      };

      // Mocked wallet details with random data for testing
      const wallet = {
        _id: walletId,
        type: faker.person.jobType(), // Generate a random job type
        title: faker.person.jobTitle(), // Generate a random job title
        description: faker.person.jobDescriptor(), // Generate a random job descriptor
        imageUrl: faker.image.avatar(), // Generate a random avatar URL
      };

      // Mock the response data that would be returned after getting wallet details
      const mockedData = { success: true, message: CustomMessage.OK, data: wallet };

      // Mock the getWalletDetails method of WalletService to return the mocked data
      jest.spyOn(service, 'getWalletDetails').mockResolvedValueOnce(mockedData);

      // Call the controller method to get wallet details and expect the result to match the mocked data
      const result = await controller.getWallet(userId, walletDto);
      expect(result).toEqual(mockedData); // Assert that the result matches the expected mocked data
    });
  });

  // Test suite for getting wallet verifiable credentials (VCs)
  describe('Get Wallet VCs', () => {
    // Test case for retrieving VCs related to a wallet
    it('should get VCs related to wallet', async () => {
      // Create a mock WalletVcQueryDto object with random data for testing
      const walletVcQueryDto = {
        walletId: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID
        searchQuery: faker.person.jobTitle(), // Generate a random job title for the search query
        page: faker.number.int({ min: 1, max: 10 }), // Generate a random page number
        pageSize: faker.number.int({ min: 10, max: 100 }), // Generate a random page size
      };

      // Mocked wallet VCs with random data for testing
      const walletVcs = [
        {
          _id: `vcs_${faker.string.uuid()}`, // Generate a unique VC ID
          did: `did:WitsLab:${faker.string.uuid()}`, // Generate a random DID
          fileId: `${faker.string.uuid()}`, // Generate a random file ID
          walletId: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID
          type: 'RECEIVED', // Set the type of VC
          category: faker.lorem.word(), // Generate a random category
          tags: [faker.finance.currencyName(), faker.company.name()], // Generate random tags
          name: faker.company.catchPhrase(), // Generate a random name
          templateId: faker.string.uuid(), // Generate a random template ID
          restrictedUrl: faker.internet.url(), // Generate a random URL
          createdAt: new Date(), // Set the creation date
          updatedAt: new Date(), // Set the update date
          __v: faker.number.int({ min: 0, max: 0 }), // Set the version key
        },
        // Add more mocked VCs as needed
      ];

      // Mock the response data that would be returned after getting wallet VCs
      const mockedData = { success: true, message: CustomMessage.OK, data: walletVcs };

      // Mock the getWalletVcs method of WalletService to return the mocked data
      jest.spyOn(service, 'getWalletVcs').mockResolvedValueOnce(mockedData);

      // Call the controller method to get wallet VCs and expect the result to match the mocked data
      const result = await controller.getWalletVcs(walletVcQueryDto);
      expect(result).toEqual(mockedData); // Assert that the result matches the expected mocked data
    });
  });

  // Test suite for getting a specific wallet VC by its ID
  describe('Get Wallet VC', () => {
    // Test case for retrieving a specific VC related to a wallet by its ID
    it('should get VC related to wallet by vc id', async () => {
      // Create a mock QueryWalletVcDto object with random data for testing
      const walletVcQueryDto: QueryWalletVcDto = {
        walletId: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID
        vcId: faker.string.uuid(), // Generate a random VC ID
      };

      // Mocked wallet VC with random data for testing
      const walletVc = {
        _id: `vcs_${faker.string.uuid()}`, // Generate a unique VC ID
        did: `did:WitsLab:${faker.string.uuid()}`, // Generate a random DID
        fileId: `${faker.string.uuid()}`, // Generate a random file ID
        walletId: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID
        type: 'RECEIVED', // Set the type of VC
        category: faker.lorem.word(), // Generate a random category
        tags: [faker.finance.currencyName(), faker.company.name()], // Generate random tags
        name: faker.company.catchPhrase(), // Generate a random name
        templateId: faker.string.uuid(), // Generate a random template ID
        restrictedUrl: faker.internet.url(), // Generate a random URL
        createdAt: new Date(), // Set the creation date
        updatedAt: new Date(), // Set the update date
        __v: faker.number.int({ min: 0, max: 0 }), // Set the version key
      };

      // Mock the response data that would be returned after getting a specific wallet VC
      const mockedData = { success: true, message: CustomMessage.OK, data: walletVc };

      // Mock the getWalletVc method of WalletService to return the mocked data
      jest.spyOn(service, 'getWalletVc').mockResolvedValueOnce(mockedData);

      // Call the controller method to get a specific wallet VC and expect the result to match the mocked data
      const result = await controller.getWalletVc(walletVcQueryDto);
      expect(result).toEqual(mockedData); // Assert that the result matches the expected mocked data
    });
  });

  // Test suite for uploading a file to a wallet
  describe('Upload File', () => {
    // Test case for uploading a file to a wallet
    it('should upload a file', async () => {
      // Mock data for file upload
      const mockFile = (): Express.Multer.File => ({
        fieldname: faker.lorem.word(), // Generate a random field name
        originalname: faker.system.fileName(), // Generate a random original file name
        encoding: faker.system.commonFileType(), // Generate a random file encoding
        mimetype: faker.system.mimeType(), // Generate a random MIME type
        size: faker.number.int({ min: 1, max: 10000 }), // Generate a random file size
        buffer: Buffer.from(faker.string.uuid()), // Generate a random buffer
        stream: new Readable({
          read() {
            this.push(null); // Indicate EOF
          },
        }),
        destination: './uploads/', // Set the destination directory
        filename: faker.system.fileName(), // Generate a random file name
        path: './uploads/' + faker.system.fileName(), // Generate a random file path
      });

      // Define a mock function to generate body object
      const mockBody = (): any => {
        // You can customize the body object structure based on your requirements
        return {
          field1: faker.lorem.word(), // Generate a random field value
          field2: faker.number.int(), // Generate a random field value
          // Add more fields as needed
        };
      };

      // Example usage
      const mockFileData: Express.Multer.File = mockFile();
      const mockBodyData: any = mockBody();

      // Mocked response data with random data for testing
      const responseData = {
        _id: `vcs_${faker.string.uuid()}`, // Generate a unique VC ID
        did: `did:WitsLab:${faker.string.uuid()}`, // Generate a random DID
        fileId: faker.string.uuid(), // Generate a random file ID
        walletId: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID
        type: 'RECEIVED', // Set the type of VC
        category: faker.lorem.word(), // Generate a random category
        tags: [faker.finance.currencyName(), faker.company.name()], // Generate random tags
        name: faker.company.catchPhrase(), // Generate a random name
        templateId: faker.string.uuid(), // Generate a random template ID
        restrictedUrl: faker.internet.url(), // Generate a random URL
        createdAt: faker.date.recent().toISOString(), // Set the creation date
        updatedAt: faker.date.recent().toISOString(), // Set the update date
        __v: faker.number.int({ min: 0, max: 0 }), // Set the version key
        fileData: {
          walletId: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID
          fileType: 'image/png', // Set the file type
          fileKey: faker.string.uuid(), // Generate a random file key
          storedUrl: faker.image.url(), // Generate a random stored URL
          _id: faker.string.uuid(), // Generate a unique file ID
          createdAt: faker.date.past().toISOString(), // Set the creation date
          updatedAt: faker.date.recent().toISOString(), // Set the update date
          __v: faker.number.int({ min: 0, max: 0 }), // Set the version key
        },
      };

      // Mock the response data that would be returned after uploading a file
      const mockedData = { success: true, message: CustomMessage.OK, data: responseData };

      // Mock the uploadFile method of WalletService to return the mocked data
      jest.spyOn(service, 'uploadFile').mockResolvedValueOnce(mockedData);

      // Call the controller method to upload a file and expect the result to match the mocked data
      const result = await controller.uploadFileToWallet(mockFileData, mockBodyData);
      expect(result).toEqual(mockedData); // Assert that the result matches the expected mocked data
    });
  });

  // Test suite for sharing a verifiable credential (VC)
  describe('Share VC', () => {
    // Test case for sharing a VC
    it('should share a vc', async () => {
      // Create a mock QueryWalletVcsDto object with random data for testing
      const queryWalletSingleVcDto: QueryWalletVcsDto = {
        walletId: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID
        vcIds: [faker.string.uuid(), faker.string.uuid()], // Generate random VC IDs
      };

      // Define a mock ShareVcRequestDto object with random data for testing
      const mockBody: ShareVcRequestDto = {
        certificateType: faker.lorem.word(), // Generate a random certificate type
        remarks: faker.lorem.word(), // Generate a random remark
        sharedWithEntity: faker.lorem.word(),
        restrictions: {
          expiresIn: faker.number.int({ min: 1, max: 10000 }), // Generate a random expiration time
          viewOnce: faker.datatype.boolean(), // Generate a random boolean for viewOnce restriction
        },
      };

      // Mock the response data that would be returned after sharing a VC
      const responseData = {
        vcId: faker.string.uuid(), // Generate a random VC ID
        status: 'ACCEPTED', // Set the status of the VC
        restrictedUrl: faker.internet.url, // Generate a random URL for restricted access
        raisedByWallet: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID for the wallet that raised the VC
        vcOwnerWallet: faker.string.uuid(), // Generate a unique wallet ID for the VC owner
        remarks: faker.lorem.sentence, // Generate a random remark
        vcShareDetails: {
          certificateType: DOCUMENT_TYPE.OTHER, // Set the certificate type
          restrictions: {
            expiresIn: faker.number.int({ min: 1, max: 365 }), // Generate a random expiration time
            viewOnce: faker.datatype.boolean(), // Generate a random boolean for viewOnce restriction
          },
        },
        _id: faker.string.uuid(), // Generate a unique ID for the VC
        createdAt: faker.date.past, // Set the creation date
        updatedAt: faker.date.recent, // Set the update date
        __v: 0, // Set the version key
      };

      // Mock the response data that would be returned after performing an operation
      const mockedData = {
        success: true, // Indicate that the operation was successful
        message: CustomMessage.OK, // Provide a success message
        data: responseData, // Include the actual data returned by the operation
      };
      // Mock the shareVc method of WalletService to return the mocked data
      jest.spyOn(service, 'shareVc').mockResolvedValueOnce(mockedData);

      // Call the controller method to share a VC and expect the result to match the mocked data
      const result = await controller.shareVc(queryWalletSingleVcDto, mockBody);
      expect(result).toEqual(mockedData); // Assert that the result matches the expected mocked data
    });
  });

  // Test suite for updating the sharing of a verifiable credential (VC)
  describe('Update Share VC', () => {
    // Test case for updating the sharing of a VC
    it('should update share a vc', async () => {
      // Create a mock QueryWalletVcsDto object with random data for testing
      const queryWalletSingleVcDto: QueryWalletVcsDto = {
        walletId: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID
        vcIds: [faker.string.uuid(), faker.string.uuid()], // Generate random VC IDs
      };

      // Define a mock ShareVcRequestDto object with random data for testing
      const mockBody: ShareVcRequestDto = {
        certificateType: faker.lorem.word(), // Generate a random certificate type
        remarks: faker.lorem.word(), // Generate a random remark
        sharedWithEntity: faker.lorem.word(),
        restrictions: {
          expiresIn: faker.number.int({ min: 1, max: 10000 }), // Generate a random expiration time
          viewOnce: faker.datatype.boolean(), // Generate a random boolean for viewOnce restriction
        },
      };

      // Mock the response data that would be returned after updating the sharing of a VC
      const responseData = {
        vcId: faker.string.uuid(), // Generate a random VC ID
        status: ShareRequestAction.PENDING, // Set the status of the VC to pending
        restrictedUrl: faker.internet.url, // Generate a random URL for restricted access
        raisedByWallet: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID for the wallet that raised the VC
        vcOwnerWallet: faker.string.uuid(), // Generate a unique wallet ID for the VC owner
        remarks: faker.lorem.sentence, // Generate a random remark
        vcShareDetails: {
          certificateType: DOCUMENT_TYPE.OTHER, // Set the certificate type
          restrictions: {
            expiresIn: faker.number.int({ min: 1, max: 365 }), // Generate a random expiration time
            viewOnce: faker.datatype.boolean(), // Generate a random boolean for viewOnce restriction
          },
        },
        _id: faker.string.uuid(), // Generate a unique ID for the VC
        createdAt: faker.date.past, // Set the creation date
        updatedAt: faker.date.recent, // Set the update date
        __v: 0, // Set the version key
      };

      // Mock the response data that would be returned after performing an operation
      const mockedData = {
        success: true, // Indicate that the operation was successful
        message: CustomMessage.OK, // Provide a success message
        data: responseData, // Include the actual data returned by the operation
      };
      // Mock the updateShareVc method of WalletService to return the mocked data
      jest.spyOn(service, 'updateShareVc').mockResolvedValueOnce(mockedData);

      // Call the controller method to update the sharing of a VC and expect the result to match the mocked data
      const result = await controller.updateShareVc(queryWalletSingleVcDto, mockBody);
      expect(result).toEqual(mockedData); // Assert that the result matches the expected mocked data
    });
  });
  //   Test suite for updating the status of sharing a verifiable credential (VC)
  describe('Update Share VC status', () => {
    // Test case for updating the status of sharing a VC
    it('should update share vc status', async () => {
      // Create a mock UpdateSharedVcStatusQuery object with random data for testing
      const updateSharedVcStatusQuery: UpdateSharedVcStatusQuery = {
        walletId: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID
        requestId: faker.string.uuid(), // Generate a random request ID
        vcId: faker.string.uuid(), // Generate a random VC ID
        action: ShareRequestAction.PENDING, // Set the action to pending
      };

      // Mock the response data that would be returned after updating the status of sharing a VC
      const responseData = {
        vcId: faker.string.uuid(), // Generate a random VC ID
        status: ShareRequestAction.ACCEPTED, // Set the status of the VC to accepted
        restrictedUrl: faker.internet.url, // Generate a random URL for restricted access
        raisedByWallet: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID for the wallet that raised the VC
        vcOwnerWallet: faker.string.uuid(), // Generate a unique wallet ID for the VC owner
        remarks: faker.lorem.sentence, // Generate a random remark
        vcShareDetails: {
          certificateType: DOCUMENT_TYPE.OTHER, // Set the certificate type
          restrictions: {
            expiresIn: faker.number.int({ min: 1, max: 365 }), // Generate a random expiration time
            viewOnce: faker.datatype.boolean(), // Generate a random boolean for viewOnce restriction
          },
        },
        _id: faker.string.uuid(), // Generate a unique ID for the VC
        createdAt: faker.date.past, // Set the creation date
        updatedAt: faker.date.recent, // Set the update date
        __v: 0, // Set the version key
      };

      // Mock the response data that would be returned after performing an operation
      const mockedData = {
        success: true, // Indicate that the operation was successful
        message: CustomMessage.OK, // Provide a success message
        data: responseData, // Include the actual data returned by the operation
      };

      // Mock the updateShareVcStatus method of WalletService to return the mocked data
      jest.spyOn(service, 'updateShareVcStatus').mockResolvedValueOnce(mockedData);

      // Call the controller method to update the status of sharing a VC and expect the result to match the mocked data
      const result = await controller.updateShareVcStatus(updateSharedVcStatusQuery);
      expect(result).toEqual(mockedData); // Assert that the result matches the expected mocked data
    });
  });

  // Test suite for getting share requests
  describe('Get Share Request', () => {
    // Test case for getting share requests
    it('should get share request', async () => {
      // Create a mock GetSharedVcRequestDto object with random data for testing
      const getSharedVcStatusQuery: GetSharedVcRequestDto = {
        documentType: DOCUMENT_TYPE.PAN, // Set the document type to PAN
        walletId: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID
        page: faker.number.int({ min: 1, max: 10 }), // Generate a random page number
        pageSize: faker.number.int({ min: 10, max: 100 }), // Generate a random page size
      };

      // Mock the response data that would be returned after getting share requests
      const responseData = {
        vcId: faker.string.uuid(), // Generate a random VC ID
        status: ShareRequestAction.ACCEPTED, // Set the status of the VC to accepted
        restrictedUrl: faker.internet.url, // Generate a random URL for restricted access
        raisedByWallet: `wall_${faker.string.uuid()}`, // Generate a unique wallet ID for the wallet that raised the VC
        vcOwnerWallet: faker.string.uuid(), // Generate a unique wallet ID for the VC owner
        remarks: faker.lorem.sentence, // Generate a random remark
        vcShareDetails: {
          certificateType: DOCUMENT_TYPE.OTHER, // Set the certificate type
          restrictions: {
            expiresIn: faker.number.int({ min: 1, max: 365 }), // Generate a random expiration time
            viewOnce: faker.datatype.boolean(), // Generate a random boolean for viewOnce restriction
          },
        },
        _id: faker.string.uuid(), // Generate a unique ID for the VC
        createdAt: faker.date.past, // Set the creation date
        updatedAt: faker.date.recent, // Set the update date
        __v: 0, // Set the version key
      };

      // Mock the response data that would be returned after performing an operation
      const mockedData = {
        success: true, // Indicate that the operation was successful
        message: CustomMessage.OK, // Provide a success message
        data: responseData, // Include the actual data returned by the operation
      };

      // Mock the getVcSharedRequestsList method of WalletService to return the mocked data
      jest.spyOn(service, 'getVcSharedRequestsList').mockResolvedValueOnce(mockedData);

      //  Call the controller method to get share requests and expect the result to match the mocked data
      const result = await controller.getShareRequests(getSharedVcStatusQuery);
      expect(result).toEqual(mockedData); // Assert that the result matches the expected mocked data
    });
  });
});
