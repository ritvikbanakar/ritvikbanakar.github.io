"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transactions_1 = require("../transactions");
const waves_crypto_1 = require("@waves/waves-crypto");
const generic_1 = require("../generic");
const marshall_1 = require("@waves/marshall");
function lease(paramsOrTx, seed) {
    const type = transactions_1.TRANSACTION_TYPE.LEASE;
    const version = paramsOrTx.version || 2;
    const seedsAndIndexes = generic_1.convertToPairs(seed);
    const senderPublicKey = generic_1.getSenderPublicKey(seedsAndIndexes, paramsOrTx);
    const tx = {
        type,
        version,
        senderPublicKey,
        amount: paramsOrTx.amount,
        recipient: paramsOrTx.recipient,
        fee: generic_1.fee(paramsOrTx, 100000),
        timestamp: paramsOrTx.timestamp || Date.now(),
        proofs: paramsOrTx.proofs || [],
        id: '',
    };
    const bytes = marshall_1.binary.serializeTx(tx);
    seedsAndIndexes.forEach(([s, i]) => generic_1.addProof(tx, waves_crypto_1.signBytes(bytes, s), i));
    tx.id = waves_crypto_1.hashBytes(bytes);
    return tx;
}
exports.lease = lease;
//# sourceMappingURL=lease.js.map