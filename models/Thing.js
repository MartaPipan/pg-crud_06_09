class Thing {
    static client = null;
    static tableName = 'things';
    static attributes = {
        "title": 'string',
        // "isReady":'boolean
    };


    static async create(values) { 
        const insertAttributes = Object.entries(this.attributes)  //----->[[nameAttr, valueAttr],[nameAttr1,valueAttr1],[nameAttr2,valueAttr2]]
            .filter(([nameAttr, valueAttr]) => nameAttr in values)//[nameAttr, nameAttr1, nameAttr2]
            .map(([nameAttr, valueAttr]) => nameAttr);//[nameAttr, nameAttr1, nameAttr2]
        
        const strInsertAttributes = insertAttributes
            .map((nameAttr) => `"${nameAttr}"`)//['"nameAttr"', '"nameAttr1"', '"nameAttr2"']
            .join(','); //'"nameAttr","nameAttr1","nameAttr2"'
        
        
        const strInsertValues = insertAttributes
            .map((nameAttr) => {
                const value = values[nameAttr];
                return typeof value === 'string' ? `'${value}'` : value;
            })
            .join(',');
        
        const value = values[nameAttr];
        
        const strInsertAttrs = insertAttrs
            .map((nameAttr) => `"${nameAttr}"`)//['"nameAttr"', '"nameAttr1"', '"nameAttr2"']
         
        
        
        const { rows } = this.client.query(`INSERT INTO ${this.tableName}(${strInsertAttributes})
             VALUES(${values.title});`);
        return rows;
    }
    
    static async findByPk(pk) {   //-----> pk=PRIMARY KEY==id
        const { rows } = await this.client.query(`SELECT * 
            FROM ${this.tableName}
            WHERE "id"=${pk};`);
        return rows;
     }
    static async findAll() { 
        const {rows} = await this.client.query(`SELECT * FROM ${this.tableName};`);
        return rows;
    }

    static async updateByPk(pk, values) { 
        const insertAttributes = Object.entries(this.attributes)
            .filter(([nameAttr, valueAttr]) => nameAttr in values)
            .map(([nameAttr, valueAttr]) => nameAttr);
        
        const strSet = insertAttributes
            .map((nameAttr) => {
                const value = values[nameAttr];
                const strValue = typeof value === 'string' ? `'${value}'` : value;
                return `"${nameAttr}"=${strValue}`;
            })
            .join(',');
        
        const { rows } = await this.client.query
            (`
            UPDATE ${this.tableName}
            SET ${strSet}, "updatedAt"= '${new Date(). toISOString()}'
            WHERE id = ${pk}
            RETURNING *;
            `);
        return rows;
    }

    static async deleteByPK(pk) { 
        const { rows } = await this.client.query
            (`DELETE FROM ${this.tableName}
                WHERE "id" = ${pk}
                RETURNING *;`);
        return rows;
    }
}

module.exports = Thing;



/*Опис Класу Thing:
Властивості Класу:

static client = null; - статична властивість, що має зберігати клієнт підключення до бази даних (наприклад, клієнт PostgreSQL).
static tableName = 'things'; - статична властивість, яка визначає назву таблиці в базі даних, з якою працює клас.
static attributes - об'єкт, що визначає атрибути (колонки) таблиці та їх типи даних. Наприклад, "title" - рядок (string).
Методи Класу:

create(values): Цей метод приймає об'єкт values, що містить значення для нових записів у таблиці. Метод:

Фільтрує імена атрибутів, які є в таблиці та у переданих значеннях.
Формує рядок з імен атрибутів для SQL-запиту.
Формує рядок зі значень для вставки у таблицю.
Виконує SQL-запит для вставки нового запису в таблицю things.
Повертає рядки з результатами вставки.
findByPk(pk): Знаходить запис у таблиці за первинним ключем (pk). Виконує SQL-запит SELECT * з умовою WHERE "id" = ${pk}.

findAll(): Повертає всі записи з таблиці things. Виконує SQL-запит SELECT * FROM ${this.tableName};.

updateByPk(pk, values): Оновлює запис за первинним ключем (pk) новими значеннями, які передані в об'єкті values. Метод:

Фільтрує імена атрибутів, що є в обох: в таблиці та в переданих значеннях.
Формує рядок SET, що містить атрибути та їх значення для оновлення.
Виконує SQL-запит UPDATE для оновлення запису з умовою WHERE id = ${pk}.
Повертає оновлені рядки.
deleteByPk(pk): Видаляє запис з таблиці things за первинним ключем (pk). Виконує SQL-запит DELETE FROM ${this.tableName} WHERE "id" = ${pk};*/