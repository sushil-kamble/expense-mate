/**
 * Represents a group member's transaction details
 */
interface MemberBalance {
    memberId: string;
    name: string;
    amount: number; // Net amount (positive means to receive, negative means to pay)
}

/**
 * Represents a settlement transaction between two members
 */
interface Settlement {
    from: {
        id: string;
        name: string;
    };
    to: {
        id: string;
        name: string;
    };
    amount: number;
}

interface Transaction {
    payerId: string;
    payer: {
        id: string;
        name: string;
    };
    amount: string;
    members: Array<{
        member: {
            id: string;
            name: string;
        };
        amount: string;
    }>;
}

class GroupSettlementCalculator {
    /**
     * Calculates the initial balances for all members
     * @param {Transaction[]} transactions - List of group transactions
     * @returns {Object} Map of member IDs to their balances
     */
    static calculateInitialBalances(transactions: Transaction[]): {
        balances: Map<string, number>;
        memberNames: Map<string, string>;
    } {
        const balances = new Map<string, number>();
        const memberNames = new Map<string, string>();

        transactions.forEach((transaction) => {
            const payerId = transaction.payerId;
            const paidAmount = parseFloat(transaction.amount);

            // Store member name
            memberNames.set(payerId, transaction.payer.name);

            // Add amount paid by payer
            balances.set(payerId, (balances.get(payerId) || 0) + paidAmount);

            // Subtract shares from each member
            transaction.members.forEach((member) => {
                const memberId = member.member.id;
                const shareAmount = parseFloat(member.amount);

                memberNames.set(memberId, member.member.name);
                balances.set(
                    memberId,
                    (balances.get(memberId) || 0) - shareAmount
                );
            });
        });

        return { balances, memberNames };
    }

    /**
     * Simplifies the debt chains to minimize the number of transactions
     * @param {Map<string, number>} balances - Map of member IDs to their balances
     * @param {Map<string, string>} memberNames - Map of member IDs to their names
     * @returns {Settlement[]} Optimized list of settlements
     */
    static optimizeSettlements(
        balances: Map<string, number>,
        memberNames: Map<string, string>
    ): Settlement[] {
        // Convert balances to arrays of creditors and debtors
        const creditors: MemberBalance[] = [];
        const debtors: MemberBalance[] = [];

        balances.forEach((amount, memberId) => {
            const member: MemberBalance = {
                memberId,
                name: memberNames.get(memberId) || '',
                amount: Number(Math.abs(amount).toFixed(2)),
            };

            if (amount > 0.01) {
                creditors.push(member);
            } else if (amount < -0.01) {
                debtors.push(member);
            }
        });

        // Sort by amount to handle larger transactions first
        creditors.sort((a, b) => b.amount - a.amount);
        debtors.sort((a, b) => b.amount - a.amount);

        const settlements: Settlement[] = [];
        const visited = new Set<string>();

        // Function to find the best match for a debtor
        const findBestMatch = (
            debtor: MemberBalance,
            creditors: MemberBalance[],
            visited: Set<string>
        ): MemberBalance | null => {
            let bestMatch: MemberBalance | null = null;
            let minDiff = Infinity;

            for (const creditor of creditors) {
                if (creditor.amount < 0.01 || visited.has(creditor.memberId))
                    continue;

                const diff = Math.abs(debtor.amount - creditor.amount);
                if (diff < minDiff) {
                    minDiff = diff;
                    bestMatch = creditor;
                }
            }

            return bestMatch;
        };

        while (debtors.length > 0 && creditors.length > 0) {
            const debtor = debtors[0];
            const creditor = findBestMatch(debtor, creditors, visited);

            if (!creditor) break;

            const amount = Math.min(debtor.amount, creditor.amount);

            if (amount >= 0.01) {
                settlements.push({
                    from: {
                        id: debtor.memberId,
                        name: debtor.name,
                    },
                    to: {
                        id: creditor.memberId,
                        name: creditor.name,
                    },
                    amount: Number(amount.toFixed(2)),
                });
            }

            debtor.amount -= amount;
            creditor.amount -= amount;

            if (debtor.amount < 0.01) {
                debtors.shift();
            }
            if (creditor.amount < 0.01) {
                creditors.splice(creditors.indexOf(creditor), 1);
                visited.add(creditor.memberId);
            }
        }

        return settlements;
    }

    /**
     * Main function to calculate optimized settlements
     * @param {Transaction[]} transactions - List of group transactions
     * @returns {Object} Optimized settlement summary
     */
    static calculateSettlements(transactions: Transaction[]): {
        totalGroupExpense: number;
        memberBalances: MemberBalance[];
        settlements: Settlement[];
    } {
        const { balances, memberNames } =
            this.calculateInitialBalances(transactions);
        const settlements = this.optimizeSettlements(balances, memberNames);

        // Prepare summary with member balances
        const memberBalances = Array.from(balances.entries()).map(
            ([memberId, balance]) => ({
                memberId,
                name: memberNames.get(memberId) || '',
                amount: Number(balance.toFixed(2)),
            })
        );

        return {
            totalGroupExpense: Number(
                transactions
                    .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                    .toFixed(2)
            ),
            memberBalances,
            settlements,
        };
    }
}

export default GroupSettlementCalculator;
