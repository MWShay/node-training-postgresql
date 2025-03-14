const{ EntitySchema } = require('typeorm')

module.exports = new EntitySchema({ // EntitySchema（資料表） 用來定義 Entity 的結構
    name: "Skill",
    tableName: "SKILL",
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
        unique: true
      },
      createdAt: {
        type: "timestamp",
        createDate: true,
        name: "created_at",
        nullable: false
      }
    }
  })