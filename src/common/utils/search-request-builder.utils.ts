import { SearchRequestDto } from '../..//modules/stg/dto/search-request.dto';

export function searchRequestMapper(searchRequestDto: SearchRequestDto): any {
  return {
    domain: searchRequestDto.domain,
    context: {
      action: 'search',
      bap_id: 'http://local/',
      version: '1.1.0',
      transaction_id: searchRequestDto.context.transaction_id,
      message_id: searchRequestDto.context.message_id,
      timestamp: new Date().toISOString(),
      ttl: 'PT10M',
    },
    message: {
      intent: {
        item: {
          descriptor: {
            name: searchRequestDto.message.searchQuery,
          },
        },
      },
    },
  };
}
