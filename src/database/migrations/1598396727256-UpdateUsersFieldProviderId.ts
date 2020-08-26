import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class UpdateUsersFieldProviderId1598396727256 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider')

        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable: true,
        }))

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppoinmentProvider',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appoinments', 'AppoinmentProvider')

        await queryRunner.dropColumn('appoinments', 'provider_id')

        await queryRunner.addColumn('appoinments', new TableColumn({
            name: 'provider',
            type: 'varchar',
            isNullable: false,
        }))
    }

}
