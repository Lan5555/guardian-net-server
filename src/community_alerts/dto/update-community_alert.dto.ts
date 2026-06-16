import { PartialType } from '@nestjs/mapped-types';
import { CreateCommunityAlertDto } from './create-community_alert.dto';

export class UpdateCommunityAlertDto extends PartialType(CreateCommunityAlertDto) {}
