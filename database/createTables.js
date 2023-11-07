const db = require('./index');

const createUsersTable = async () => {
  try {

    const statementDropTable = `
    DROP TABLE IF EXISTS users
    `;

    db.prepare(statementDropTable).run();

    const statementCreateUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      user_id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    )
    `;
    const createUsersTable = db.prepare(statementCreateUsersTable);
    createUsersTable.run();
  } catch (error) {
    console.log(error);
    throw new Error('Diablo');
  }
};

const createClothesTable = async () => {
  try {
    const statementDropTable = `
      DROP TABLE IF EXISTS clothes
      `;
    db.prepare(statementDropTable).run();

    const statementCreateClothesTable = `
      CREATE TABLE IF NOT EXISTS clothes (
        clothes_id INTEGER PRIMARY KEY AUTOINCREMENT,
        cloth TEXT NOT NULL,
        user_id TEXT,
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
            ON DELETE CASCADE
          )
      `;
    const createClothesTable = db.prepare(statementCreateClothesTable);
    createClothesTable.run();
  } catch (error) {
    console.log(error);
    throw new Error('Diablos viejo');
  }
};


const createShirtsTable = async () => {
  try {
    const statementDropTable = `
    DROP TABLE IF EXISTS shirts
    `;
    db.prepare(statementDropTable).run();

    const statementCreateShirtsTable = `
    CREATE TABLE IF NOT EXISTS shirts (
      shirts_id INTEGER PRIMARY KEY AUTOINCREMENT,
      shirt TEXT NOT NULL,
      user_id TEXT,
      FOREIGN KEY (user_id)
      REFERENCES users (user_id)
          ON DELETE CASCADE
        )
    `;
    const createShirtsTable = db.prepare(statementCreateShirtsTable);
    createShirtsTable.run();
  } catch (error) {
    console.log(error);
    throw new Error('Demonios viejo');
  }
};

const createPantsTable = async () => {
  try {
    const statementDropTable = `
      DROP TABLE IF EXISTS pants
      `;
    db.prepare(statementDropTable).run();

    const statementCreatePantsTable = `
      CREATE TABLE IF NOT EXISTS pants (
        pants_id INTEGER PRIMARY KEY AUTOINCREMENT,
        pant TEXT NOT NULL,
        user_id TEXT,
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
            ON DELETE CASCADE
          )
      `;
    const createPantsTable = db.prepare(statementCreatePantsTable);
    createPantsTable.run();
  } catch (error) {
    console.log(error);
    throw new Error('Demonios viejo');
  }
};

const createShoesTable = async () => {
  try {
    const statementDropTable = `
        DROP TABLE IF EXISTS shoes
        `;
    db.prepare(statementDropTable).run();

    const statementCreateShoesTable = `
        CREATE TABLE IF NOT EXISTS shoes (
          shoes_id INTEGER PRIMARY KEY AUTOINCREMENT,
          shoe TEXT NOT NULL,
          user_id TEXT,
          FOREIGN KEY (user_id)
          REFERENCES users (user_id)
              ON DELETE CASCADE
            )
        `;
    const createShoesTable = db.prepare(statementCreateShoesTable);
    createShoesTable.run();
  } catch (error) {
    console.log(error);
    throw new Error('Demonios viejo');
  }
};


const createTables = async () => {
  try {
    console.log('Creando tablas...');
    await createUsersTable();
    console.log('Tabla de usuarios creada');
    await createShirtsTable();
    console.log('Tabla de ropas creada');
    await createClothesTable();
    console.log('Tabla de camisas creada');
    await createPantsTable();
    console.log('Tabla de pantalones creada');
    await createShoesTable();
    console.log('Tabla de zapatos creada');
  } catch (error) {
    console.log('Se acabo');
  }
};

createTables();