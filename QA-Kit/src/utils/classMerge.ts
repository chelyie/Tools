/** Joins class names, skipping empty or false values. */
export function classMerge(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean)
        .join(' ');
}