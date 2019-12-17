const tableName = 'Receipts'

module.exports = {
  up: (queryInterface, Sequelize) => (
    [
      queryInterface.addColumn(tableName, 'refund_amount', {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
        },
        allowNull: true,
      }),
      queryInterface.addColumn(tableName, 'refund_date', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn(tableName, 'card_number_first_digits', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn(tableName, 'buyer_name', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn(tableName, 'buyer_bank_code', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn(tableName, 'buyer_account_type', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn(tableName, 'buyer_bank_agency', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn(tableName, 'buyer_bank_agency_vd', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn(tableName, 'buyer_bank_account_number', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn(tableName, 'buyer_bank_account_number_vd', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn(tableName, 'buyer_document_number', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]
  ),
  down: queryInterface => (
    [
      queryInterface.removeColumn(tableName, 'refund_amount'),
      queryInterface.removeColumn(tableName, 'refund_date'),
      queryInterface.removeColumn(tableName, 'card_number_first_digits'),
      queryInterface.removeColumn(tableName, 'buyer_name'),
      queryInterface.removeColumn(tableName, 'buyer_bank_code'),
      queryInterface.removeColumn(tableName, 'buyer_account_type'),
      queryInterface.removeColumn(tableName, 'buyer_bank_agency'),
      queryInterface.removeColumn(tableName, 'buyer_bank_agency_vd'),
      queryInterface.removeColumn(tableName, 'buyer_bank_account_number'),
      queryInterface.removeColumn(tableName, 'buyer_bank_account_number_vd'),
      queryInterface.removeColumn(tableName, 'buyer_document_number'),
    ]
  ),
}
