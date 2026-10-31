import { useContext } from 'react';
import { EvidenceContext, type EvidenceContextValue } from '@context/evidence.context';

/**
 * Reads and changes the current bug: title, ticket ID, slots and highlights. Works in any component inside <EvidenceProvider> (already wrapped around the app in Main.tsx).
 *
 * @example
 * const { state, ticketId, setTitle, addSlot } = useEvidence();
 *
 * Used in: BugVerification page, all its sections, useCollageDownload
 */
export default function useEvidence(): EvidenceContextValue {
    const context = useContext(EvidenceContext);
    if (!context) throw new Error('useEvidence must be used inside EvidenceProvider');
    return context;
}