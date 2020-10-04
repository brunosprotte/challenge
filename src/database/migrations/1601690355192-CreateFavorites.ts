import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableForeignKey,
} from 'typeorm';

export default class CreateFavorites1601690355192
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'favorites',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'customer_id',
            type: 'uuid',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'review_score',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'favorites',
      new TableIndex({
        name: 'IDX_FAVORITES_CUSTOMER_ID',
        columnNames: ['customer_id'],
      }),
    );

    await queryRunner.createIndex(
      'favorites',
      new TableIndex({
        name: 'IDX_FAVORITES_PRODUCT_ID',
        columnNames: ['product_id'],
      }),
    );

    await queryRunner.createForeignKey(
      'favorites',
      new TableForeignKey({
        name: 'FavoritesCustomers',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('favorites', 'FavoritesCustomers');
    await queryRunner.dropIndex('favorites', 'IDX_FAVORITES_PRODUCT_ID');
    await queryRunner.dropIndex('favorites', 'IDX_FAVORITES_CUSTOMER_ID');
    await queryRunner.dropTable('favorites');
  }
}
