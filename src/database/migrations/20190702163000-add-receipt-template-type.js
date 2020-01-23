const tableName = 'Receipts'
const columnName = 'template_type'
const defaultValue = 'stone_mais'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .describeTable(tableName)
    .then((tableDefinition) => {
      if (tableDefinition[columnName]) return Promise.resolve()

      return queryInterface.addColumn(tableName, columnName, {
        type: Sequelize.STRING,
        defaultValue,
      })
    }),

  down: queryInterface => queryInterface.removeColumn(tableName, columnName),
}
