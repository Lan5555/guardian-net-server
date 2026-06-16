import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';
import { Repository } from 'typeorm';
import { Future, NetResponse, ResponseHelper } from 'src/helpers/net-response';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  async create(createCommunityDto: CreateCommunityDto): Future<NetResponse> {
    try {
      const community = this.communityRepository.create(createCommunityDto);
      await this.communityRepository.save(community);
      return ResponseHelper.success<Community>(
        'Community created successfully',
        community,
      );
    } catch (error) {
      return ResponseHelper.fromError(error);
    }
  }

  async findAll(): Future<NetResponse> {
    try {
      const communities = await this.communityRepository.find();
      return ResponseHelper.success<Community[]>(
        'Communities fetched successfully',
        communities,
      );
    } catch (error) {
      return ResponseHelper.fromError(error);
    }
  }

  async findOne(id: number): Future<NetResponse> {
    try {
      const community = await this.communityRepository.findOneBy({ id });
      if (!community)
        return ResponseHelper.error<Community>(
          `Community with ID ${id} not found`,
        );
      return ResponseHelper.success<Community>(
        'Community fetched successfully',
        community,
      );
    } catch (e) {
      return ResponseHelper.fromError(e);
    }
  }

  async update(
    id: number,
    updateCommunityDto: UpdateCommunityDto,
  ): Future<NetResponse> {
    try {
      const community = await this.communityRepository.findOneBy({ id });
      if (!community)
        return ResponseHelper.error<Community>(
          `Community with ID ${id} not found`,
        );

      await this.communityRepository.update(id, updateCommunityDto);
      const updatedCommunity = await this.communityRepository.findOneBy({ id });
      return ResponseHelper.success<Community>(
        'Community updated successfully',
        updatedCommunity!,
      );
    } catch (error) {
      return ResponseHelper.fromError(error);
    }
  }

  async remove(id: number): Future<NetResponse> {
    try {
      const community = await this.communityRepository.findOneBy({ id });
      if (!community)
        return ResponseHelper.error<Community>(
          `Community with ID ${id} not found`,
        );

      await this.communityRepository.remove(community);
      return ResponseHelper.success('Community removed successfully');
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Failed to remove community with ID ${id}`,
      );
    }
  }
}
