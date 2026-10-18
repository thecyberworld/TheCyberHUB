import { describe, it, expect, beforeEach } from 'vitest';
import { stashPending2fa, takePending2fa } from '../pending2fa';

describe('pending2fa', () => {
    beforeEach(() => sessionStorage.clear());

    it('hands the challenge over once', () => {
        stashPending2fa('temp-123');
        expect(takePending2fa()).toBe('temp-123');
        expect(takePending2fa()).toBeNull();
    });

    it('returns null when nothing was stashed', () => {
        expect(takePending2fa()).toBeNull();
    });
});
