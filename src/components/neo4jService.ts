import neo4j from 'neo4j-driver';

// Replace with your Neo4j connection details
const NEO4J_URL = 'bolt://neo4j:7687';
const NEO4J_USER = 'neo4j';
const NEO4J_PASSWORD = 'neo4jneo4j';

const driver = neo4j.driver(NEO4J_URL, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));

// Function to run read query
export async function runReadQuery(query: string, params?: object): Promise<neo4j.QueryResult> {
    const session = driver.session({ defaultAccessMode: neo4j.session.READ });
    try {
        const result = await session.run(query, params);
        return result;
    } finally {
        await session.close();
    }
}

// Function to run write query
export async function runWriteQuery(query: string, params?: object): Promise<neo4j.QueryResult> {
    const session = driver.session({ defaultAccessMode: neo4j.session.WRITE });
    try {
        const result = await session.run(query, params);
        return result;
    } finally {
        await session.close();
    }
}

// Close the driver when application exits
process.on('exit', () => {
    driver.close();
});
