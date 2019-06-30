"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transactions_1 = require("../transactions");
const waves_crypto_1 = require("@waves/waves-crypto");
const generic_1 = require("../generic");
const marshall_1 = require("@waves/marshall");
function setScript(paramsOrTx, seed) {
    const type = transactions_1.TRANSACTION_TYPE.SET_SCRIPT;
    const version = paramsOrTx.version || 1;
    const seedsAndIndexes = generic_1.convertToPairs(seed);
    const senderPublicKey = generic_1.getSenderPublicKey(seedsAndIndexes, paramsOrTx);
    if (paramsOrTx.script === undefined)
        throw new Error('Script field cannot be undefined. Use null explicitly to remove script');
    const tx = {
        type,
        version,
        senderPublicKey,
        chainId: generic_1.networkByte(paramsOrTx.chainId, 87),
        fee: generic_1.fee(paramsOrTx, 1000000),
        timestamp: paramsOrTx.timestamp || Date.now(),
        proofs: paramsOrTx.proofs || [],
        id: '',
        script: generic_1.base64Prefix(paramsOrTx.script),
    };
    const bytes = marshall_1.binary.serializeTx(tx);
    seedsAndIndexes.forEach(([s, i]) => generic_1.addProof(tx, waves_crypto_1.signBytes(bytes, s), i));
    tx.id = waves_crypto_1.hashBytes(bytes);
    return tx;
}
exports.setScript = setScript;
//# sourceMappingURL=set-script.js.map