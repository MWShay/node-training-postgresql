const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: "CreditPackage",
  tableName: "CREDIT_PACKAGE",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
      nullable: false
    },
    name: {
      type: "varchar",
      length: 50,
      nullable: false,
      unique: true // 不可重複
    },
    credit_amount: {
      type: "integer",
      nullable: false // 不可為空
    },
    price: {
      type: "numeric",
      precision: 10, // 總位數
      scale: 2,  // 小數位數（第二位）
      nullable: false
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
      name: "created_at",
      nullable: false
    }
  }
})