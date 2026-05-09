/**
 * useAppConfig — shared configuration for departments.
 *
 * Persisted in localStorage so admin changes survive page refreshes.
 * Both the "Create Member" combobox (Team.tsx) and the "Admin Configuration"
 * panel read from and write to the same store.
 */
import { useState, useCallback } from 'react';

const DEPARTMENTS_KEY = 'hris_config_departments';

const DEFAULT_DEPARTMENTS = [
    'Functional',
    'Developer',
];

function loadList(key: string, defaults: string[]): string[] {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return defaults;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaults;
    } catch {
        return defaults;
    }
}

function saveList(key: string, list: string[]) {
    localStorage.setItem(key, JSON.stringify(list));
}

export function useAppConfig() {
    const [departments, setDepartmentsState] = useState<string[]>(() =>
        loadList(DEPARTMENTS_KEY, DEFAULT_DEPARTMENTS)
    );

    const setDepartments = useCallback((list: string[]) => {
        setDepartmentsState(list);
        saveList(DEPARTMENTS_KEY, list);
    }, []);

    const addDepartment = useCallback((value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return;
        setDepartments([...loadList(DEPARTMENTS_KEY, DEFAULT_DEPARTMENTS), trimmed]);
    }, [setDepartments]);

    const removeDepartment = useCallback((value: string) => {
        setDepartments(loadList(DEPARTMENTS_KEY, DEFAULT_DEPARTMENTS).filter(d => d !== value));
    }, [setDepartments]);

    const renameDepartment = useCallback((oldValue: string, newValue: string) => {
        const trimmed = newValue.trim();
        if (!trimmed) return;
        setDepartments(
            loadList(DEPARTMENTS_KEY, DEFAULT_DEPARTMENTS).map(d => (d === oldValue ? trimmed : d))
        );
    }, [setDepartments]);

    return {
        departments,
        addDepartment,
        removeDepartment,
        renameDepartment,
    };
}

