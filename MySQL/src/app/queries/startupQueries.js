const { DATABASE } = require("../../config");
const { readData } = require("../../helpers/Promise/PromiseModule");

async function cleanDatabaseStartUpQuery() {
    let cleanUpDatabaseQueryString = "";
    try {
        cleanUpDatabaseQueryString += 'SET FOREIGN_KEY_CHECKS = 0;';
        const tableNames = await readData(`SELECT table_name FROM information_schema.tables WHERE table_schema = "${DATABASE}"`);
        for (const table of tableNames) {
            const tableName = table.table_name;
            cleanUpDatabaseQueryString += `DELETE FROM \`${tableName}\`;`;
        }
        cleanUpDatabaseQueryString += 'SET FOREIGN_KEY_CHECKS = 1;';
        return { message: "All rows have been deleted from all tables." }
    } catch (error) {
        return { error: error }
    }
}

module.exports = {
    cleanDatabaseStartUpQuery
}