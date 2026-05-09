// Role utils

export const getInitials = (name: string) =>
    name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

export const getRoleSelectValue = (roles?: string[]) => {
    if (!roles?.length) return 'Creator';
    if (roles.includes('SuperAdmin')) return 'SuperAdmin';
    if (roles.includes('Viewer')) return 'Viewer';
    if (roles.includes('Approver')) return 'Approver';
    return 'Creator';
};

export const parseName = (fullName: string) => {
    if (!fullName) return { surname: '', firstName: '', middleName: '', suffix: '' };
    const commaIdx = fullName.indexOf(',');
    if (commaIdx === -1) return { surname: fullName, firstName: '', middleName: '', suffix: '' };
    const surname = fullName.slice(0, commaIdx).trim();
    const rest = fullName.slice(commaIdx + 1).trim().split(' ').filter(Boolean);
    const SUFFIXES = ['jr.', 'sr.', 'ii', 'iii', 'iv', 'v', 'jr', 'sr'];
    const suffixIdx = rest.findIndex(p => SUFFIXES.includes(p.toLowerCase()));
    let suffix = '';
    const nameParts = [...rest];
    if (suffixIdx !== -1) { suffix = nameParts.splice(suffixIdx, 1)[0]; }
    return {
        surname,
        firstName:  nameParts[0] ?? '',
        middleName: nameParts.slice(1).join(' '),
        suffix,
    };
};
