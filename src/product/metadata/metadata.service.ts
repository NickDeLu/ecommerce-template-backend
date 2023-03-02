import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMetaDataGroupDto } from './dto/CreateMetaDataGroup.dto';
import { CreateMetaDataOptionDto } from './dto/CreateMetaDataOption.dto';
import { UpdateMetaDataGroupDto } from './dto/updateMetaDataGroup.dto';
import { UpdateMetaDataOptionDto } from './dto/updateMetaDataOption.dto';
import { MetadataGroup, MetadataOption } from './metadata.entity';

@Injectable()
export class MetadataService {
  constructor(
    @Inject('METADATA_GROUP_REPOSITORY')
    private metadataGroupRepository: Repository<MetadataGroup>,
    @Inject('METADATA_OPTION_REPOSITORY')
    private metadataOptionRepository: Repository<MetadataOption>,
  ) {}
  //metadata groups
  getMetadataGroups() {
    return this.metadataGroupRepository.find();
  }
  deleteMetadataGroup(id: string) {
    return this.metadataGroupRepository.delete({ id });
  }
  updateMetadataGroup(id: string, metadataGroup: UpdateMetaDataGroupDto) {
    return this.metadataGroupRepository.update(id, metadataGroup);
  }
  createMetadataGroup(metadataGroup: CreateMetaDataGroupDto) {
    const newEntity = this.metadataGroupRepository.create(metadataGroup);
    return this.metadataGroupRepository.save(newEntity);
  }
  //metadata options
  getMetadataOptions() {
    return this.metadataOptionRepository.find();
  }
  deleteMetadataOption(id: string) {
    return this.metadataOptionRepository.delete({ id });
  }
  updateMetadataOption(id: string, metadataOption: UpdateMetaDataOptionDto) {
    return this.metadataOptionRepository.update(id, metadataOption);
  }
  createMetadataOption(metadataOption: CreateMetaDataOptionDto) {
    const newEntity = this.metadataOptionRepository.create(metadataOption);
    return this.metadataOptionRepository.save(newEntity);
  }
}
