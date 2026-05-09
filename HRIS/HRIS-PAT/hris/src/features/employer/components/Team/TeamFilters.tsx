import { SearchInput, SelectInput, DateInput, ReferenceInput } from '@/components';
import { ROLE_OPTIONS, STATUS_OPTIONS } from './types';

export const TeamFilters = [
    <SearchInput source="q" alwaysOn key="search" />,
    <ReferenceInput source="approvalTeamId" reference="ApprovalTeams" key="team">
        <SelectInput label="Approval Team" className="min-w-48" optionText="name" />
    </ReferenceInput>,
    <SelectInput
        source="role"
        label="Authority"
        choices={ROLE_OPTIONS}
        className="min-w-40"
        key="role"
    />,
    <SelectInput
        source="status"
        label="Status"
        choices={STATUS_OPTIONS}
        className="min-w-36"
        key="status"
    />,
    <SelectInput 
        source="department" 
        label="Department" 
        choices={[
            { id: 'Administration', name: 'Administration' },
            { id: 'Management', name: 'Management' },
            ...(JSON.parse(localStorage.getItem('hris_config_departments') || '["Functional", "Developer"]')).map((d: string) => ({ id: d, name: d }))
        ]}
        className="min-w-40"
        key="dept"
    />,
    <DateInput 
        source="reportDate" 
        label="Report Date" 
        className="min-w-40"
        key="date"
    />
];
