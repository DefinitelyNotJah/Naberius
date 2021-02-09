/**
 * Parallelize a maximal numbers of async-executions.
 * @param listArguments - List of arguments for each call.
 * @param asyncCallback - The async function to send parallel
 * @param CONCURRENCY_LIMIT - How many max. parallel concurrency.
 * @returns {Promise<>}
 */
async function parallelPromises(listArguments, asyncCallback, CONCURRENCY_LIMIT) {
    //make requests in a async-way avoiding problems of concurrency limit
    let results = [];
    const batchesCount = Math.ceil(listArguments.length / CONCURRENCY_LIMIT);
    for (let i = 0; i < batchesCount; i++) {
        const batchStart = i * CONCURRENCY_LIMIT;
        const batchArgs = listArguments.slice(batchStart, batchStart + CONCURRENCY_LIMIT);
        const batchPromises = batchArgs.map(asyncCallback);

        results = [...results, ...await Promise.all(batchPromises)];
    }
    return results;
}

module.exports = parallelPromises;