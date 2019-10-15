const { removeNaN } = require('../../lib/formatters')

module.exports = (sequelize, DataTypes) => {
  const Receipt = sequelize.define('Receipt', {
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    refund_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
      },
    },
    refund_date: {
      allowNull: true,
      type: DataTypes.DATE,
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
    event_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    card_holder_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    card_number_first_digits: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    card_number_last_digits: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    card_brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    installments: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    buyer_name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    buyer_bank_code: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    buyer_account_type: {
      allowNull: true,
      type: DataTypes.ENUM,
      values: [
        'conta_corrente',
        'conta_poupanca',
        'conta_corrente_conjunta',
        'conta_poupanca_conjunta',
      ],
    },
    buyer_bank_agency: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    buyer_bank_agency_vd: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    buyer_bank_account_number: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    buyer_bank_account_number_vd: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    buyer_document_number: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvm_pin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capture_method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authorization_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    application_label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    application_cryptogram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    soft_descriptor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    statement_descriptor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    template_type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'stone_mais',
    },
  }, {
    hooks: {
      beforeCreate: (receipt) => {
        const columnsToRemoveNaN = [
          'buyer_bank_agency',
          'buyer_bank_account_number',
          'buyer_document_number',
        ]

        columnsToRemoveNaN.map((columnName) => {
          // eslint-disable-next-line no-param-reassign
          receipt[columnName] = removeNaN(columnName)

          return null
        })
      },
    },
    underscored: true,
    defaultScope: {
      attributes: {
        exclude: ['created_at', 'updated_at', 'id'],
      },
    },
  })

  return Receipt
}
