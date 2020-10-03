import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateCustomers1601689819242 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
        ],
      }),
    );
    await queryRunner.createIndex("customers", new TableIndex({
      name: "IDX_CUSTOMER_EMAIL",
      columnNames: ["email"]
  }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("customers", "IDX_CUSTOMER_EMAIL");
    await queryRunner.dropTable('customers');
  }

}
