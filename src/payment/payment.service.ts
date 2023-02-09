import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import CreatePaymentDto from './dto/createPayment.dto';
import UpdatePaymentDto from './dto/updatePayment.dto';
import { PaymentEntity } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private paymentRepository: Repository<PaymentEntity>,
  ) {}

  getAll(): Promise<PaymentEntity[]> {
    return this.paymentRepository.find();
  }

  getOneById(id: string): Promise<PaymentEntity> {
    return this.paymentRepository.findOne({ where: { id } });
  }

  async updatePayment(paymentId: string, payment: UpdatePaymentDto) {
    return await this.updateHelper(paymentId, payment);
  }

  async deletePayment(id: string): Promise<DeleteResult> {
    return await this.paymentRepository.delete({ id });
  }

  createPayment(paymentData: CreatePaymentDto): Promise<PaymentEntity> {
    const newPayment = this.paymentRepository.create(paymentData);
    return this.paymentRepository.save(newPayment);
  }

  /**
   * activates before update database trigger for typeorm so that updatedAt field can be set
   * @param paymentId the id of the payment to update
   * @param updates the json object with fields of which are to be updated
   * @returns updated entity
   */
  private async updateHelper(paymentId: string, updates: {}) {
    const foundEntity = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });
    return await this.paymentRepository.save(
      Object.assign(foundEntity, updates),
    );
  }
}
