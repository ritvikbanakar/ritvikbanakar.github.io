"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const marshall_1 = require("@waves/marshall");
const waves_crypto_1 = require("@waves/waves-crypto");
const generic_1 = require("../generic");
/* @echo DOCS */
function exchange(tx, seed) {
    const seedsAndIndexes = generic_1.convertToPairs(seed);
    const bytes = marshall_1.binary.serializeTx(tx);
    seedsAndIndexes.forEach(([s, i]) => generic_1.addProof(tx, waves_crypto_1.signBytes(bytes, s), i));
    return Object.assign({}, tx, { id: waves_crypto_1.hashBytes(bytes) });
}
exports.exchange = exchange;
//# sourceMappingURL=exchange.js.map