const tableName = 'Receipts'
const cardHolderName = 'card_holder_name'
const cardNumberLastDigits = 'card_number_last_digits'
const cardBrand = 'card_brand'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn(tableName, cardHolderName, {
      type: Sequelize.STRING,
      allowNull: true,
    })
      .then(() =>
        queryInterface.changeColumn(tableName, cardNumberLastDigits, {
          type: Sequelize.STRING,
          allowNull: true,
        }))
      .then(() =>
        queryInterface.changeColumn(tableName, cardBrand, {
          type: Sequelize.STRING,
          allowNull: true,
        })),

  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn(tableName, cardHolderName, {
      type: Sequelize.STRING,
      allowNull: false,
    })
      .then(() =>
        queryInterface.changeColumn(tableName, cardNumberLastDigits, {
          type: Sequelize.STRING,
          allowNull: false,
        }))
      .then(() =>
        queryInterface.changeColumn(tableName, cardBrand, {
          type: Sequelize.STRING,
          allowNull: false,
        })),
}
