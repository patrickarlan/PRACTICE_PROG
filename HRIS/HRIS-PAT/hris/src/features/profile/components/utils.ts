export function parseFullName(fullName?: string) {
    const empty = { surname: '', firstName: '', middleName: '', suffix: '' };
    if (!fullName) return empty;
    // If the stored value is an email or has no comma it's not a composed name — return blank
    if (fullName.includes('@') || !fullName.includes(',')) return empty;
    const [surnamePart, restPart = ''] = fullName.split(',').map(s => s.trim());
    const parts = restPart.split(' ').filter(Boolean);
    const suffixes = ['Jr.', 'Sr.', 'II', 'III', 'IV', 'V'];
    const hasSuffix = parts.length > 0 && suffixes.includes(parts[parts.length - 1]);
    const suffix = hasSuffix ? parts.pop()! : '';
    const [firstName = '', ...rest] = parts;
    const middleName = rest.join(' ');
    return { surname: surnamePart, firstName, middleName, suffix };
}
