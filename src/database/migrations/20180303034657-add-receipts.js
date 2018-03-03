const tableName = 'Receipts'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      receipt_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seller_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seller_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transaction_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      payment_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      event_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      card_holder_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      card_number_last_digits: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
      .then(() =>
        queryInterface.addIndex(tableName, ['transaction_id'], {
          fields: ['transaction_id'],
        }))
      .then(() =>
        queryInterface.addIndex(tableName, ['receipt_id', 'event_date'], {
          fields: ['receipt_id', 'event_date'],
        }))
      .then(() =>
        queryInterface.addIndex(tableName, ['receipt_id'], {
          fields: ['receipt_id'],
        })),

  down: queryInterface =>
    queryInterface.dropTable(tableName),
}
