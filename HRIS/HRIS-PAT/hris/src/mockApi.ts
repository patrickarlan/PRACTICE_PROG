/**
 * mockApi.ts — In-memory CRUD engine for mock resources.
 *
 * Seeds from data.json on app startup. All mutations are lost on page refresh (stateless).
 * No HTTP requests, no ports, no servers — pure in-memory storage.
 *
 * When the real backend endpoints are ready, remove the mock resource checks
 * from dataProvider.ts and this file becomes unused.
 */

import seedData from './data.json';

const MOCK_RESOURCES = [
    'accomplishmentreports',
    'users',
] as const;

type MockResource = (typeof MOCK_RESOURCES)[number];

const MOCK_STORE: Record<string, Record<string, unknown>[]> = {};

function readStore(resource: string): Record<string, unknown>[] {
    return MOCK_STORE[resource] || [];
}

function writeStore(resource: string, data: Record<string, unknown>[]): void {
    MOCK_STORE[resource] = [...data];
}

function getSeedData(resource: string): Record<string, unknown>[] {
    // data.json keys match resource names (with "ar-reviews" using bracket notation)
    return (seedData as Record<string, Record<string, unknown>[]>)[resource] || [];
}

function nextId(records: Record<string, unknown>[]): string | number {
    if (records.length === 0) return '1';

    // Preserve the ID type used by the resource
    const firstId = records[0]?.id;
    const useNumericIds = typeof firstId === 'number';

    const maxId = records.reduce((max, r) => {
        const id = r.id as string | number;
        const n = typeof id === 'number' ? id : parseInt(String(id), 10);
        return isNaN(n) ? max : Math.max(max, n);
    }, 0);

    return useNumericIds ? maxId + 1 : String(maxId + 1);
}

// --- Public API ---

/**
 * Initialize all mock resources. Seeds MOCK_STORE from data.json.
 * Call once at app startup.
 */
export function initMockApi(): void {
    for (const resource of MOCK_RESOURCES) {
        writeStore(resource, getSeedData(resource));
    }
}

/**
 * Check if a resource is handled by the mock API.
 */
export function isMockResource(resource: string): boolean {
    return MOCK_RESOURCES.includes(resource as MockResource);
}

/**
 * Get all records for a resource.
 */
export function getAll(resource: string): Record<string, unknown>[] {
    return readStore(resource);
}

/**
 * Get a single record by ID.
 */
export function getOne(resource: string, id: string | number): Record<string, unknown> | undefined {
    const records = readStore(resource);
    return records.find(r => String(r.id) === id.toString());
}

/**
 * Create a new record. Auto-generates an ID.
 * Returns the created record (with ID).
 */
export function create(resource: string, data: Record<string, unknown>): Record<string, unknown> {
    const records = readStore(resource);
    const record = { ...data, id: nextId(records) };
    records.push(record);
    writeStore(resource, records);
    return record;
}

/**
 * Update an existing record by ID (partial merge).
 * Returns the updated record.
 */
export function update(resource: string, id: string | number, data: Partial<Record<string, unknown>>): Record<string, unknown> {
    const records = readStore(resource);
    const index = records.findIndex(r => String(r.id) === id.toString());
    if (index === -1) {
        throw new Error(`mockApi: record ${id} not found in ${resource}`);
    }
    records[index] = { ...records[index], ...data };
    writeStore(resource, records);
    return records[index];
}

/**
 * Delete a record by ID. Returns the deleted record.
 */
export function remove(resource: string, id: string | number): Record<string, unknown> {
    const records = readStore(resource);
    const index = records.findIndex(r => String(r.id) === id.toString());
    if (index === -1) {
        throw new Error(`mockApi: record ${id} not found in ${resource}`);
    }
    const [deleted] = records.splice(index, 1);
    writeStore(resource, records);
    return deleted;
}

/**
 * Delete multiple records by IDs. Returns the deleted records.
 */
export function removeMany(resource: string, ids: (string | number)[]): Record<string, unknown>[] {
    const idSet = new Set(ids.map(String));
    const records = readStore(resource);
    const deleted = records.filter(r => idSet.has(String(r.id)));
    const remaining = records.filter(r => !idSet.has(String(r.id)));
    writeStore(resource, remaining);
    return deleted;
}

/**
 * Re-seed a single resource from data.json (wipes user mutations).
 * Useful for dev/testing.
 */
export function resetResource(resource: string): void {
    writeStore(resource, getSeedData(resource));
}

/**
 * Re-seed ALL mock resources from data.json.
 * Useful for dev/testing.
 */
export function resetAll(): void {
    for (const resource of MOCK_RESOURCES) {
        resetResource(resource);
    }
}
