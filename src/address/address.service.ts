import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { AddressEntity } from './address.entity';
import CreateAddressDto from './dto/createAddressDto.dto';
import UpdateAddressDto from './dto/updateAddressDto.dto';

@Injectable()
export class AddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<AddressEntity>,
  ) {}

  getAll(): Promise<AddressEntity[]> {
    return this.addressRepository.find();
  }

  getOneById(id: string): Promise<AddressEntity> {
    return this.addressRepository.findOne({ where: { id } });
  }

  async updateAddress(addressId: string, address: UpdateAddressDto) {
    return await this.updateHelper(addressId, address);
  }

  async deleteAddress(id: string): Promise<DeleteResult> {
    return await this.addressRepository.delete({ id });
  }

  createAddress(addressData: CreateAddressDto): Promise<AddressEntity> {
    const newAddress = this.addressRepository.create(addressData);
    return this.addressRepository.save(newAddress);
  }

  /**
   * activates before update database trigger for typeorm so that updatedAt field can be set
   * @param addressId the id of the address to update
   * @param updates the json object with fields of which are to be updated
   * @returns updated entity
   */
  private async updateHelper(addressId: string, updates: {}) {
    const foundEntity = await this.addressRepository.findOne({
      where: { id: addressId },
    });
    return await this.addressRepository.save(
      Object.assign(foundEntity, updates),
    );
  }
}
