import { registerEnumType } from '@nestjs/graphql';

export enum RecordType {
  Export = 1,
  Import = 2,
}

registerEnumType(RecordType, {
  name: 'RecordType',
});
