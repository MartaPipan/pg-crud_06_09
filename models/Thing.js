class Thing {
  static client = null;
  static tableName = 'things';
  static attributes = {
    title: 'string',
  };

  static async create(values) {
    const insertAttrs = Object.entries(this.attributes)
      .filter(([nameAttr, valAttr]) => nameAttr in values)
      .map(([nameAttr, valAttr]) => nameAttr);
    const strInsertAttrs = insertAttrs
      .map((nameAttr) => `"${nameAttr}"`)
      .join(',');
    const strInsertValues = insertAttrs
      .map((nameAttr) => {
        const value = values[nameAttr];
        return typeof value === 'string' ? `'${value}'` : value;
      })
      .join(',');
    const {rows} = await this.client.query(`
      INSERT INTO ${this.tableName}(${strInsertAttrs}) 
      VALUES(${strInsertValues})
      RETURNING *;
    `); 
    return rows;
  }

  static async findByPk(pk) {
    const { rows } = await this.client.query(`
      SELECT * 
      FROM ${this.tableName}
      WHERE "id"=${pk};
    `);
    return rows;
  }

  static async findAll() {
    const { rows } = await this.client.query(`
      SELECT * 
      FROM ${this.tableName};
    `);
    return rows;
  }

  static async updateByPk(pk, values) {
    const insertAttrs = Object.entries(this.attributes)
      .filter(([nameAttr, valAttr]) => nameAttr in values)
      .map(([nameAttr, valAttr]) => nameAttr);

    const strSet = insertAttrs
      .map((nameAttr) => {
        const value = values[nameAttr];
        const strValue = typeof value === 'string' ? `'${value}'` : value;
        return `"${nameAttr}"=${strValue}`;
      })
      .join(',');

    const { rows } = await this.client.query(`
      UPDATE ${this.tableName} 
      SET ${strSet}, "updatedAt"='${new Date().toISOString()}' 
      WHERE id=${pk} 
      RETURNING *;      
      `);

    return rows; //array [updatedthing] in ThingController
  }

  static async deleteByPk(pk) {
    const { rows } = await this.client.query(`
      DELETE FROM ${this.tableName}
      WHERE "id"=${pk}
      RETURNING *;
    `);
    return rows;
  }
}

module.exports = Thing;