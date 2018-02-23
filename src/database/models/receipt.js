const {
  omit,
} = require('ramda')

module.exports = (sequelize, DataTypes) => {
  const Receipt = sequelize.define('Receipt', {
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    receipt_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seller_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    card_holder_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_number_last_digits: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    underscored: true,
  })

  Receipt.responseObjectBuilder = receipt =>
    omit(['created_at', 'updated_at'], receipt.dataValues)

  return Receipt
}

