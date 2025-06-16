import { CallBackQueryDto } from '../callback-query.dto';

import { validate } from 'class-validator';

describe('CallBackQueryDto', () => {
  it('should allow all properties to be optional', async () => {
    const dto = new CallBackQueryDto();

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should set the default provider if not provided', async () => {
    const dto = new CallBackQueryDto();

    expect(dto.provider).toBe('digilocker');
  });

  it('should accept provided values for optional properties', async () => {
    const dto = new CallBackQueryDto();
    dto.code = 'testCode';
    dto.state = 'testState';
    dto.provider = 'testProvider';

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
    expect(dto.code).toBe('testCode');
    expect(dto.state).toBe('testState');
    expect(dto.provider).toBe('testProvider');
  });
});
